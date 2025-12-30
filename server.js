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

// Generate 6-character alphanumeric code (A-Z, 0-9)
function generateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = crypto.randomInt(0, chars.length);
    code += chars[randomIndex];
  }
  return code;
}

// Check if code already exists in index.json
async function isCodeUnique(code) {
  try {
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

    if (indexRes.status === 404) return true;

    const indexRaw = await indexRes.json();
    const indexData = JSON.parse(
      Buffer.from(indexRaw.content, "base64").toString("utf-8")
    );

    return !indexData.presets.some(preset => preset.code === code);
  } catch (err) {
    console.error("Error checking code uniqueness:", err);
    return true;
  }
}

// Generate unique code
async function generateUniqueCode() {
  let code;
  let attempts = 0;
  const maxAttempts = 10;

  do {
    code = generateCode();
    attempts++;
    if (attempts >= maxAttempts) {
      throw new Error("Failed to generate unique code after multiple attempts");
    }
  } while (!(await isCodeUnique(code)));

  return code;
}

// Fetch file SHA
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

// Create or update file
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

// Ensure index.json exists
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

// Submit endpoint - WORKS WITH YOUR GITHUB REPO STRUCTURE
app.post("/submit", async (req, res) => {
  try {
    const { creator, targetSystem, description, knownTMPs, knownTriggers } = req.body;

    // Validate required fields (creator is optional for backwards compatibility)
    if (!targetSystem || !description) {
      return res.status(400).json({ 
        error: "Missing required fields",
        required: ["targetSystem", "description"]
      });
    }

    // Ensure index.json exists
    await ensureIndexJson();

    // Generate unique code
    const code = await generateUniqueCode();

    // Create preset object for the individual file
    const preset = {
      code,
      targetSystem,
      description,
      KnownTMPs: knownTMPs || [],
      KnownTriggers: knownTriggers || [],
    };

    // Add creator if provided
    if (creator) {
      preset.creator = creator;
    }

    // Add timestamp
    preset.submittedAt = new Date().toISOString();

    // Write preset file
    await createOrUpdateFile(
      `${BASE_PATH}/${code}.json`,
      preset,
      `Add preset ${code}${creator ? ` by ${creator}` : ''}`
    );

    // Fetch current index.json
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

    // Add entry to index
    const indexEntry = {
      code,
      targetSystem,
      description,
    };

    // Add creator to index if provided
    if (creator) {
      indexEntry.creator = creator;
    }

    indexData.presets.push(indexEntry);

    // Update index.json
    await createOrUpdateFile(
      indexPath,
      indexData,
      `Update index.json with ${code}`
    );

    res.json({ 
      success: true, 
      code,
      message: "Preset submitted successfully"
    });
  } catch (err) {
    console.error("Submission error:", err);
    res.status(500).json({ 
      error: err.message,
      details: "Failed to submit preset"
    });
  }
});

// Get all presets endpoint (optional - for debugging)
app.get("/presets", async (req, res) => {
  try {
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

    if (indexRes.status === 404) {
      return res.json({ presets: [] });
    }

    const indexRaw = await indexRes.json();
    const indexData = JSON.parse(
      Buffer.from(indexRaw.content, "base64").toString("utf-8")
    );

    res.json(indexData);
  } catch (err) {
    console.error("Fetch presets error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get single preset by code endpoint (optional - for Unity integration)
app.get("/preset/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const presetPath = `${BASE_PATH}/${code}.json`;
    
    const presetRes = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${presetPath}?ref=${BRANCH}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          "User-Agent": "dynabackend",
        },
      }
    );

    if (presetRes.status === 404) {
      return res.status(404).json({ error: "Preset not found" });
    }

    const presetRaw = await presetRes.json();
    const presetData = JSON.parse(
      Buffer.from(presetRaw.content, "base64").toString("utf-8")
    );

    res.json(presetData);
  } catch (err) {
    console.error("Fetch preset error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Update tracking endpoint
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

  // Log update event
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

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Submit endpoint: POST /submit`);
  console.log(`📚 Presets endpoint: GET /presets`);
  console.log(`🔍 Single preset: GET /preset/:code`);
});
