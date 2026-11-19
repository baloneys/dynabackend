# dynabackend Worker

Cloudflare Worker that replaces the old Render service (`../server.js`).
It commits submitted presets to `presets/` in the GitHub repo via the Contents API.

Live URL: `https://dynabackend.seanboyle20126.workers.dev`

| Method | Path            | Purpose                                   |
|--------|-----------------|-------------------------------------------|
| POST   | `/submit`       | Create a preset, returns `{ code }`       |
| GET    | `/presets`      | `presets/index.json`                      |
| GET    | `/preset/:code` | One preset                                |
| POST   | `/update`       | Update-tracking ping (logged only)        |
| GET    | `/health`       | Health check                              |

## Config

`cloudflare.config.ts` sets `REPO_OWNER`, `REPO_NAME`, `BRANCH`, and requires the
secret `GITHUB_TOKEN`: a fine-grained GitHub token whose resource owner is the
repo's owner, with access to this repo and **Contents: Read and write**.

## Develop

```sh
npm install
echo GITHUB_TOKEN=github_pat_... > .dev.vars   # optional; only /submit needs it
npx cf dev
```

## Deploy

First deploy (the Worker doesn't exist yet, so the secret goes in with it):

```sh
echo GITHUB_TOKEN=github_pat_... > .env
npx cf deploy --secrets-file .env
del .env
```

Later deploys: `npx cf deploy`. To rotate the token:
`npx wrangler secret put GITHUB_TOKEN --name dynabackend`.
