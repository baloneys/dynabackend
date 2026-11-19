// dynabackend — Cloudflare Worker port of ../server.js (previously hosted on Render).
// Stores presets as JSON files in a GitHub repo via the GitHub Contents API.
//
// Config (see ../cloudflare.config.ts):
//   REPO_OWNER, REPO_NAME, BRANCH  — plain text bindings
//   GITHUB_TOKEN                   — secret (needs Contents: read & write on the repo)

const BASE_PATH = "presets";
const INDEX_PATH = `${BASE_PATH}/index.json`;
const CODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

// ---------- base64 helpers (UTF-8 safe) ----------

function encodeBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(bin);
}

function decodeBase64(b64) {
  const bin = atob(b64.replace(/\s/g, ""));
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

// ---------- GitHub Contents API ----------

class GitHub {
  constructor(env) {
    this.owner = env.REPO_OWNER;
    this.repo = env.REPO_NAME;
    this.branch = env.BRANCH || "main";
    this.headers = {
      Accept: "application/vnd.github+json",
      "User-Agent": "dynabackend",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (env.GITHUB_TOKEN) this.headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;
  }

  url(path) {
    const encoded = path.split("/").map(encodeURIComponent).join("/");
    return `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${encoded}`;
  }

  // Returns { sha, data } or null if the file does not exist.
  async getJson(path) {
    const res = await fetch(`${this.url(path)}?ref=${encodeURIComponent(this.branch)}`, {
      headers: this.headers,
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`GitHub GET ${path} failed: ${res.status} ${await res.text()}`);
    const raw = await res.json();
    return { sha: raw.sha, data: JSON.parse(decodeBase64(raw.content)) };
  }

  async putJson(path, content, message, sha) {
    const body = {
      message,
      content: encodeBase64(JSON.stringify(content, null, 2)),
      branch: this.branch,
    };
    if (sha) body.sha = sha;

    const res = await fetch(this.url(path), {
      method: "PUT",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = new Error(`GitHub PUT ${path} failed: ${res.status} ${await res.text()}`);
      err.status = res.status;
      throw err;
    }
    return res.json();
  }
}

function generateCode() {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  // 256 % 36 bias is negligible for preset codes.
  return Array.from(bytes, (b) => CODE_CHARS[b % CODE_CHARS.length]).join("");
}

// ---------- handlers ----------

async function handleSubmit(request, env) {
  if (!env.GITHUB_TOKEN) {
    return json({ error: "Server is missing GITHUB_TOKEN", details: "Failed to submit preset" }, 500);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Body must be JSON" }, 400);
  }

  const { creator, targetSystem, description, knownTMPs, knownTriggers } = payload || {};
  if (!targetSystem || !description) {
    return json({ error: "Missing required fields", required: ["targetSystem", "description"] }, 400);
  }

  const gh = new GitHub(env);

  // Pick a code that isn't already in the index.
  let index = (await gh.getJson(INDEX_PATH)) || { sha: null, data: { presets: [] } };
  if (!Array.isArray(index.data.presets)) index.data.presets = [];

  let code;
  for (let attempt = 0; ; attempt++) {
    if (attempt >= 10) throw new Error("Failed to generate unique code after multiple attempts");
    code = generateCode();
    if (!index.data.presets.some((p) => p.code === code)) break;
  }

  const preset = {
    code,
    targetSystem,
    description,
    KnownTMPs: knownTMPs || [],
    KnownTriggers: knownTriggers || [],
  };
  if (creator) preset.creator = creator;
  preset.submittedAt = new Date().toISOString();

  await gh.putJson(
    `${BASE_PATH}/${code}.json`,
    preset,
    `Add preset ${code}${creator ? ` by ${creator}` : ""}`
  );

  const entry = { code, targetSystem, description };
  if (creator) entry.creator = creator;

  // Append to index.json; re-read and retry if another submission changed it meanwhile.
  for (let attempt = 0; ; attempt++) {
    index.data.presets.push(entry);
    try {
      await gh.putJson(INDEX_PATH, index.data, `Update index.json with ${code}`, index.sha);
      break;
    } catch (err) {
      if ((err.status !== 409 && err.status !== 422) || attempt >= 3) throw err;
      index = (await gh.getJson(INDEX_PATH)) || { sha: null, data: { presets: [] } };
      if (!Array.isArray(index.data.presets)) index.data.presets = [];
    }
  }

  return json({ success: true, code, message: "Preset submitted successfully" });
}

async function handlePresets(env) {
  const index = await new GitHub(env).getJson(INDEX_PATH);
  return json(index ? index.data : { presets: [] });
}

async function handlePreset(code, env) {
  if (!/^[A-Za-z0-9]{1,32}$/.test(code)) return json({ error: "Invalid code" }, 400);
  const preset = await new GitHub(env).getJson(`${BASE_PATH}/${code}.json`);
  if (!preset) return json({ error: "Preset not found" }, 404);
  return json(preset.data);
}

async function handleUpdate(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Body must be JSON" }, 400);
  }
  const { version, name, type, url, userAgent, timestamp } = body || {};
  if (!version || !type) return json({ error: "Missing fields" }, 400);
  console.log("UPDATE EVENT", { version, name, type, url, userAgent, timestamp });
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const method = request.method;

    if (method === "OPTIONS") return new Response(null, { status: 204, headers: CORS_HEADERS });

    try {
      if (method === "POST" && pathname === "/submit") return await handleSubmit(request, env);
      if (method === "POST" && pathname === "/update") return await handleUpdate(request);
      if (method === "GET" && pathname === "/presets") return await handlePresets(env);
      if (method === "GET" && pathname.startsWith("/preset/")) {
        return await handlePreset(decodeURIComponent(pathname.slice("/preset/".length)), env);
      }
      if (method === "GET" && (pathname === "/health" || pathname === "/")) {
        return json({ status: "ok", timestamp: new Date().toISOString() });
      }
      return json({ error: "Not found" }, 404);
    } catch (err) {
      console.error(`${method} ${pathname} error:`, err);
      const details = pathname === "/submit" ? "Failed to submit preset" : undefined;
      return json({ error: err.message, details }, 500);
    }
  },
};
