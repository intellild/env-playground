import { t as collectEnvProbeRows } from "./env-probe.js";
//#region src/async-entry.ts
function collectAsyncEnvProbeRows(runtimeName) {
	const rows = collectEnvProbeRows(`${runtimeName}:async`);
	globalThis.__ASYNC_ENV_PROBE_ROWS__ = rows;
	return rows;
}
//#endregion
export { collectAsyncEnvProbeRows };
