import { bindings, defineConfig } from "cf/config";

export default defineConfig({
  worker: {
    name: "dynabackend",
    entrypoint: "./src/index.js",
    compatibilityDate: "2026-11-01",
    env: {
      // Repo that holds presets/ (transferred from baloneys/dynabackend).
      REPO_OWNER: bindings.text("Scuffed-VRChat"),
      REPO_NAME: bindings.text("dynabackend"),
      BRANCH: bindings.text("main"),
      // GitHub fine-grained token with Contents: read & write on the repo.
      GITHUB_TOKEN: bindings.secret(),
    },
  },
});
