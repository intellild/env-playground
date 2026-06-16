import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, "..");
const nextBin = path.resolve(projectDir, "node_modules/.bin/next");

const child = spawn(nextBin, ["build", "--turbopack", "--no-mangling"], {
  cwd: projectDir,
  env: {
    ...process.env,
    NEXT_DIST_DIR: ".next-prod",
  },
  stdio: "inherit",
});

child.on("exit", code => {
  process.exit(code ?? 0);
});
