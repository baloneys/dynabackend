import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import crypto from "crypto";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// GitHub config from environment variables
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = process.env.REPO_OWNER;
const REPO_NAME = process.env.REPO_NAME;
const BRANCH = process.env.BRANCH || "main";
const BASE_PATH = "presets";

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
    const errText = await res.text();
    throw new Error(`GitHub API error: ${errText}`);
  }

  return res.json();
}

// Ensure index.json exists
async function ensureIndexJson() {
  const indexPath = `${BASE_PATH}/index.json`;
  try {
    const sha = await getFileSha(indexPath);
    if (!sha) {
      console.log("index.json not found, creating new one...");
      await createOrUpdateFile(indexPath, { presets: [] }, "Create index.json");
    }
  } catch (err) {
    console.error("Error ensuring index.json:", err);
  }
}

// Submission endpoint
app.post("/submit", async (req, res) => {
  try {
    const { targetSystem, description, knownTMPs, knownTriggers } = req.body;
    if (!targetSystem || !description) {
      return res.status(400).json({ error: "targetSystem and description required" });
    }

    await ensureIndexJson();

    const code = generateCode();
    const preset = {
      code,
      targetSystem,
      description,
      KnownTMPs: knownTMPs || [],
      KnownTriggers: knownTriggers || [],
    };

    console.log(`Creating preset ${code}...`);
    await createOrUpdateFile(`${BASE_PATH}/${code}.json`, preset, `Add preset ${code}`);

    // Update index.json
    const indexPath = `${BASE_PATH}/index.json`;
    const indexRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${indexPath}?ref=${BRANCH}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` },
    });
    const indexDataRaw = await indexRes.json();
    const indexData = JSON.parse(Buffer.from(indexDataRaw.content, "base64").toString("utf-8"));
    indexData.presets.push(code);
    await createOrUpdateFile(indexPath, indexData, `Update index.json with ${code}`);

    console.log(`Preset ${code} successfully created.`);
    res.json({ success: true, code });
  } catch (err) {
    console.error("Submission error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
