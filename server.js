import express from "express";
import fetch from "node-fetch"; // Node 18+ can use global fetch instead
import bodyParser from "body-parser";
import crypto from "crypto";

const app = express();
const PORT = process.env.PORT || 3000;

// GitHub config
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // set in Render dashboard
const REPO_OWNER = process.env.REPO_OWNER;
const REPO_NAME = process.env.REPO_NAME;
const BRANCH = "main";
const BASE_PATH = "presets";

if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME) {
  console.error("Missing GitHub config environment variables!");
  process.exit(1);
}

app.use(bodyParser.json());

// Generate unique 6-digit code
function generateCode() {
  return crypto.randomInt(100000, 999999).toString();
}

// Get SHA of a file from GitHub
async function getFileSha(path) {
  const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` },
  });
  if (res.status === 404) return null;
  const data = await res.json();
  return data.sha;
}

// Create or update a file on GitHub
async function createOrUpdateFile(path, content, message) {
  const sha = await getFileSha(path);
  const body = {
    message,
    content: Buffer.from(JSON.stringify(content, null, 2)).toString("base64"),
    branch: BRANCH,
  };
  if (sha) body.sha = sha;

  const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  return res.json();
}

// Fetch index.json content
async function fetchIndex() {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${BASE_PATH}/index.json?ref=${BRANCH}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` },
    });
    if (res.status === 200) {
      const data = await res.json();
      return {
        content: JSON.parse(Buffer.from(data.content, "base64").toString("utf-8")),
        sha: data.sha,
      };
    }
  } catch (e) {
    console.log("index.json not found, will create new one.");
  }
  return { content: { presets: [] }, sha: null };
}

// Submission endpoint
app.post("/submit", async (req, res) => {
  try {
    const { targetSystem, description, knownTMPs = [], knownTriggers = [] } = req.body;
    if (!targetSystem || !description) {
      return res.status(400).json({ error: "targetSystem and description required" });
    }

    // Get current index.json
    const indexDataObj = await fetchIndex();
    const existingCodes = indexDataObj.content.presets;

    // Generate unique code
    let code;
    do {
      code = generateCode();
    } while (existingCodes.includes(code));

    // Create preset JSON
    const preset = { code, targetSystem, description, KnownTMPs: knownTMPs, KnownTriggers: knownTriggers };

    // Save preset file
    await createOrUpdateFile(`${BASE_PATH}/${code}.json`, preset, `Add preset ${code}`);

    // Update index.json
    existingCodes.push(code);
    await createOrUpdateFile(`${BASE_PATH}/index.json`, { presets: existingCodes }, `Update index.json with ${code}`);

    res.json({ success: true, code });
  } catch (err) {
    console.error("Submission error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
