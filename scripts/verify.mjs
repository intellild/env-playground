import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const nextPort = 3117;
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, "..");
const nextBin = path.resolve(projectDir, "node_modules/.bin/next");

const commands = [
  ["pnpm", ["run", "build:vite:dev"]],
  ["pnpm", ["run", "build:vite:prod"]],
  ["pnpm", ["run", "build:rspack:dev"]],
  ["pnpm", ["run", "build:rspack:prod"]],
  ["pnpm", ["run", "build:webpack:dev"]],
  ["pnpm", ["run", "build:webpack:prod"]],
  ["pnpm", ["run", "build:next:prod"]],
];

for (const [command, args] of commands) {
  await run(command, args);
}

await verifyStaticBundle("vite dev", "dist-vite-dev");
await verifyStaticBundle("vite prod", "dist-vite-prod");
await verifyStaticBundle("rspack dev", "dist-rspack-dev");
await verifyStaticBundle("rspack prod", "dist-rspack-prod");
await verifyStaticBundle("webpack dev", "dist-webpack-dev");
await verifyStaticBundle("webpack prod", "dist-webpack-prod");
await verifyNextProductionOutput();

const next = spawn(
  nextBin,
  [
    "dev",
    "--turbopack",
    "-p",
    String(nextPort),
  ],
  {
    cwd: projectDir,
    env: {
      ...process.env,
      WATCHPACK_POLLING: "true",
    },
    stdio: ["ignore", "pipe", "pipe"],
  },
);

try {
  await waitForNext(next);
  const response = await fetch(`http://127.0.0.1:${nextPort}`);
  if (!response.ok) {
    throw new Error(`Next dev returned HTTP ${response.status}`);
  }
  const html = await response.text();
  if (!html.includes("Env bundler probe")) {
    throw new Error("Next dev response did not include the probe page.");
  }
  console.log(`next dev --turbopack responded on http://127.0.0.1:${nextPort}`);
} finally {
  next.kill("SIGTERM");
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("exit", code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(" ")} exited with ${code}`));
      }
    });
    child.on("error", reject);
  });
}

async function verifyStaticBundle(name, distName) {
  const distDir = path.resolve(projectDir, distName);
  const html = await fs.readFile(path.join(distDir, "index.html"), "utf8");
  const envProbePath = await findEnvProbeChunk(distDir);
  const relativeEnvProbePath = path.relative(distDir, envProbePath);
  const asyncEntryPath = await findAsyncEntryChunk(distDir);
  const relativeAsyncEntryPath = path.relative(distDir, asyncEntryPath);

  if (!html.includes(relativeEnvProbePath)) {
    throw new Error(`${name} index.html does not reference ${relativeEnvProbePath}`);
  }

  const envProbeCode = await fs.readFile(envProbePath, "utf8");
  for (const expected of [
    "process.env.FOO",
    "import.meta.env.FOO",
    "const env = import.meta.env; env.FOO",
  ]) {
    if (!envProbeCode.includes(expected)) {
      throw new Error(`${name} ${relativeEnvProbePath} is missing ${expected}`);
    }
  }

  console.log(
    `${name} chunks: env=${relativeEnvProbePath}, async=${relativeAsyncEntryPath}`,
  );
}

async function findEnvProbeChunk(distDir) {
  const files = await walk(distDir);
  const matches = files.filter(file => path.basename(file).startsWith("env-probe"));

  if (matches.length !== 1) {
    throw new Error(
      `Expected exactly one env-probe chunk in ${distDir}, found ${matches.length}`,
    );
  }

  return matches[0];
}

async function findAsyncEntryChunk(distDir) {
  const files = await walk(distDir);
  const matches = files.filter(file => {
    const basename = path.basename(file);

    return basename.startsWith("async-entry") || basename === "async-entry.js";
  });

  if (matches.length !== 1) {
    throw new Error(
      `Expected exactly one async-entry chunk in ${distDir}, found ${matches.length}`,
    );
  }

  return matches[0];
}

async function verifyNextProductionOutput() {
  const routesManifestPath = path.resolve(projectDir, ".next-prod/routes-manifest.json");
  const routesManifest = await fs.readFile(routesManifestPath, "utf8");

  if (!routesManifest.includes('"version"')) {
    throw new Error(".next-prod/routes-manifest.json did not look valid.");
  }

  console.log("next prod output: .next-prod");
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(entry => {
      const fullPath = path.join(dir, entry.name);

      return entry.isDirectory() ? walk(fullPath) : fullPath;
    }),
  );

  return files.flat();
}

function waitForNext(child) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const timeout = setTimeout(() => {
      finish(reject, new Error("Timed out waiting for Next dev server."));
    }, 60000);

    child.stdout.on("data", data => {
      const text = data.toString();
      process.stdout.write(text);
      if (text.includes("Ready") || text.includes("Local:")) {
        finish(resolve);
      }
    });

    child.stderr.on("data", data => {
      process.stderr.write(data);
    });

    child.on("exit", code => {
      if (!settled) {
        finish(reject, new Error(`Next dev exited early with ${code}`));
      }
    });

    function finish(callback, value) {
      if (settled) {
        return;
      }

      settled = true;
      clearTimeout(timeout);
      callback(value);
    }
  });
}
