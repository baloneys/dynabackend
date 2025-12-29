import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import crypto from "crypto";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = process.env.REPO_OWNER;
const REPO_NAME = process.env.REPO_NAME;
const BRANCH = process.env.BRANCH || "main";
const BASE_PATH = "presets";

// generate 6-digit code
function generateCode() {
  return crypto.randomInt(100000, 999999).toString();
}

// fetch file SHA
async function getFileSha(path) {
  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`,
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "User-Agent": "dynabackend",
      },
    }
  );

  if (res.status === 404) return null;
  const data = await res.json();
  return data.sha;
}

// create or update file
async function createOrUpdateFile(path, content, message) {
  const sha = await getFileSha(path);

  const body = {
    message,
    content: Buffer.from(JSON.stringify(content, null, 2)).toString("base64"),
    branch: BRANCH,
  };

  if (sha) body.sha = sha;

  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "dynabackend",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
}

// ensure index.json exists
async function ensureIndexJson() {
  const indexPath = `${BASE_PATH}/index.json`;
  const sha = await getFileSha(indexPath);

  if (!sha) {
    await createOrUpdateFile(
      indexPath,
      { presets: [] },
      "Create index.json"
    );
  }
}

// submit endpoint
app.post("/submit", async (req, res) => {
  try {
    const { targetSystem, description, knownTMPs, knownTriggers } = req.body;

    if (!targetSystem || !description) {
      return res.status(400).json({ error: "Missing fields" });
    }

    await ensureIndexJson();

    const code = generateCode();

    // write preset file
    const preset = {
      code,
      targetSystem,
      description,
      KnownTMPs: knownTMPs || [],
      KnownTriggers: knownTriggers || [],
    };

    await createOrUpdateFile(
      `${BASE_PATH}/${code}.json`,
      preset,
      `Add preset ${code}`
    );

    // fetch index.json
    const indexPath = `${BASE_PATH}/index.json`;
    const indexRes = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${indexPath}?ref=${BRANCH}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          "User-Agent": "dynabackend",
        },
      }
    );

    const indexRaw = await indexRes.json();
    const indexData = JSON.parse(
      Buffer.from(indexRaw.content, "base64").toString("utf-8")
    );

    // 🔥 THIS IS THE FIX 🔥
    indexData.presets.push({
      code,
      targetSystem,
      description,
    });

    await createOrUpdateFile(
      indexPath,
      indexData,
      `Update index.json with ${code}`
    );

    res.json({ success: true, code });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// -------- UPDATE TRACKING --------
app.post("/update", (req, res) => {
  const {
    version,
    name,
    type,
    url,
    userAgent,
    timestamp
  } = req.body;

  if (!version || !type) {
    return res.status(400).json({ error: "Missing fields" });
  }

  // For now: log it (Render logs are persistent)
  console.log("UPDATE EVENT", {
    version,
    name,
    type,
    url,
    userAgent,
    timestamp
  });

  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
