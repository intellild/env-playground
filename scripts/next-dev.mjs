import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, "..");
const nextBin = path.resolve(projectDir, "node_modules/.bin/next");

const child = spawn(
  nextBin,
  ["dev", "--turbopack", ...process.argv.slice(2)],
  {
    cwd: projectDir,
    env: {
      ...process.env,
      WATCHPACK_POLLING: "true",
    },
    stdio: "inherit",
  },
);

child.on("exit", code => {
  process.exit(code ?? 0);
});
