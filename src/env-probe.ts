export type EnvProbeRow = {
  expression: string;
  group: "process" | "import-meta";
  note: string;
  value: unknown;
};

declare global {
  var __ENV_PROBE_ROWS__: EnvProbeRow[] | undefined;
}

export function collectEnvProbeRows(runtimeName: string): EnvProbeRow[] {
  const rows: EnvProbeRow[] = [
    {
      expression: "process.env.NODE_ENV",
      group: "process",
      note: "Expected to be development for these probes.",
      value: readProcessEnvNodeEnv(),
    },
    {
      expression: "process.env.NEXT_PUBLIC_DEFINED",
      group: "process",
      note: "Defined in .env.development for the Next app.",
      value: readProcessEnvNextPublicDefined(),
    },
    {
      expression: "process.env.NEXT_CONFIG_DEFINED",
      group: "process",
      note: "Defined by next.config.mjs env.",
      value: readProcessEnvNextConfigDefined(),
    },
    {
      expression: "process.env.FOO",
      group: "process",
      note: "FOO is intentionally not defined by this project.",
      value: readProcessEnvFoo(),
    },
    {
      expression: "import.meta.env.MODE",
      group: "import-meta",
      note: "Vite defines this from --mode development.",
      value: readImportMetaEnvMode(),
    },
    {
      expression: "import.meta.env.DEV",
      group: "import-meta",
      note: "Vite boolean for non-production modes.",
      value: readImportMetaEnvDev(),
    },
    {
      expression: "import.meta.env.VITE_DEFINED",
      group: "import-meta",
      note: "Defined in .env.development with the VITE_ prefix.",
      value: readImportMetaEnvViteDefined(),
    },
    {
      expression: "import.meta.env.FOO",
      group: "import-meta",
      note: "FOO is intentionally not defined by this project.",
      value: readImportMetaEnvFoo(),
    },
  ];

  globalThis.__ENV_PROBE_ROWS__ = rows;
  console.log(`[env-probe:${runtimeName}]`, rows);

  return rows;
}

export function serializeProbeValue(value: unknown): string {
  if (value === undefined) {
    return "undefined";
  }

  if (typeof value === "string") {
    return JSON.stringify(value);
  }

  return String(value);
}

function capture(read: () => unknown): unknown {
  try {
    return read();
  } catch (error) {
    return error instanceof Error
      ? `${error.name}: ${error.message}`
      : `Thrown: ${String(error)}`;
  }
}

function readProcessEnvNodeEnv() {
  return capture(() => process.env.NODE_ENV);
}

function readProcessEnvNextPublicDefined() {
  return capture(() => process.env.NEXT_PUBLIC_DEFINED);
}

function readProcessEnvNextConfigDefined() {
  return capture(() => process.env.NEXT_CONFIG_DEFINED);
}

function readProcessEnvFoo() {
  return capture(() => process.env.FOO);
}

function readImportMetaEnvMode() {
  return capture(() => import.meta.env.MODE);
}

function readImportMetaEnvDev() {
  return capture(() => import.meta.env.DEV);
}

function readImportMetaEnvViteDefined() {
  return capture(() => import.meta.env.VITE_DEFINED);
}

function readImportMetaEnvFoo() {
  return capture(() => import.meta.env.FOO);
}
