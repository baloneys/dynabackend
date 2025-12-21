import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import crypto from "crypto";
import cors from "cors"; // <-- import cors

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (or restrict to your GitHub Pages domain)
app.use(cors({
  origin: ["https://kanaris-beans.com"], // allow only your frontend
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(bodyParser.json());

// GitHub config
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = "YOUR_GITHUB_USERNAME";
const REPO_NAME = "YOUR_REPO_NAME";
const BRANCH = "main";
const BASE_PATH = "presets";

// Generate unique 6-digit code
function generateCode() {
  return crypto.randomInt(100000, 999999).toString();
}

// Get SHA of a file from GitHub (needed to update)
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

// Submission endpoint
app.post("/submit", async (req, res) => {
  try {
    const { targetSystem, description, knownTMPs, knownTriggers } = req.body;

    if (!targetSystem || !description) {
      return res.status(400).json({ error: "targetSystem and description required" });
    }

    const code = generateCode();

    const preset = {
      code,
      targetSystem,
      description,
      KnownTMPs: knownTMPs || [],
      KnownTriggers: knownTriggers || [],
    };

    // Save preset JSON
    await createOrUpdateFile(`${BASE_PATH}/${code}.json`, preset, `Add preset ${code}`);

    // Update index.json
    const indexPath = `${BASE_PATH}/index.json`;
    let indexData = { presets: [] };

    try {
      const resSha = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${indexPath}?ref=${BRANCH}`, {
        headers: { Authorization: `token ${GITHUB_TOKEN}` },
      });
      if (resSha.status === 200) {
        const data = await resSha.json();
        indexData = JSON.parse(Buffer.from(data.content, "base64").toString("utf-8"));
      }
    } catch (e) {
      console.log("index.json does not exist, creating new one");
    }

    indexData.presets.push(code);
    await createOrUpdateFile(indexPath, indexData, `Update index.json with ${code}`);

    res.json({ success: true, code });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
