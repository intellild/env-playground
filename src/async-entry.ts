import { collectEnvProbeRows } from "./env-probe";

declare global {
  var __ASYNC_ENV_PROBE_ROWS__: ReturnType<typeof collectEnvProbeRows> | undefined;
}

export function collectAsyncEnvProbeRows(runtimeName: string) {
  const rows = collectEnvProbeRows(`${runtimeName}:async`);

  globalThis.__ASYNC_ENV_PROBE_ROWS__ = rows;

  return rows;
}
