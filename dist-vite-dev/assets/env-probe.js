//#region src/env-probe.ts
function collectEnvProbeRows(runtimeName) {
	const rows = [
		{
			expression: "process.env.NODE_ENV",
			group: "process",
			note: "Expected to be development for these probes.",
			value: readProcessEnvNodeEnv()
		},
		{
			expression: "process.env.NEXT_PUBLIC_DEFINED",
			group: "process",
			note: "Defined in .env.development for the Next app.",
			value: readProcessEnvNextPublicDefined()
		},
		{
			expression: "process.env.NEXT_CONFIG_DEFINED",
			group: "process",
			note: "Defined by next.config.mjs env.",
			value: readProcessEnvNextConfigDefined()
		},
		{
			expression: "process.env.FOO",
			group: "process",
			note: "FOO is intentionally not defined by this project.",
			value: readProcessEnvFoo()
		},
		{
			expression: "import.meta.env.MODE",
			group: "import-meta",
			note: "Vite defines this from --mode development.",
			value: readImportMetaEnvMode()
		},
		{
			expression: "import.meta.env.DEV",
			group: "import-meta",
			note: "Vite boolean for non-production modes.",
			value: readImportMetaEnvDev()
		},
		{
			expression: "import.meta.env.VITE_DEFINED",
			group: "import-meta",
			note: "Defined in .env.development with the VITE_ prefix.",
			value: readImportMetaEnvViteDefined()
		},
		{
			expression: "import.meta.env.FOO",
			group: "import-meta",
			note: "FOO is intentionally not defined by this project.",
			value: readImportMetaEnvFoo()
		},
		{
			expression: "const env = import.meta.env; env.FOO",
			group: "import-meta",
			note: "Alias access for an undefined import.meta.env field.",
			value: readAliasedImportMetaEnvFoo()
		},
		{
			expression: "import.meta.env.XXX",
			group: "import-meta",
			note: "Defined via bundler define config.",
			value: readImportMetaEnvXXX()
		}
	];
	globalThis.__ENV_PROBE_ROWS__ = rows;
	console.log(`[env-probe:${runtimeName}]`, rows);
	return rows;
}
function serializeProbeValue(value) {
	if (value === void 0) return "undefined";
	if (typeof value === "string") return JSON.stringify(value);
	return String(value);
}
function capture(read) {
	try {
		return read();
	} catch (error) {
		return error instanceof Error ? `${error.name}: ${error.message}` : `Thrown: ${String(error)}`;
	}
}
function readProcessEnvNodeEnv() {
	return capture(() => "production");
}
function readProcessEnvNextPublicDefined() {
	return capture(() => ({}).NEXT_PUBLIC_DEFINED);
}
function readProcessEnvNextConfigDefined() {
	return capture(() => ({}).NEXT_CONFIG_DEFINED);
}
function readProcessEnvFoo() {
	return capture(() => ({}).FOO);
}
function readImportMetaEnvMode() {
	return capture(() => "development");
}
function readImportMetaEnvDev() {
	return capture(() => false);
}
function readImportMetaEnvViteDefined() {
	return capture(() => "from-vite-dotenv");
}
function readImportMetaEnvFoo() {
	return capture(() => void 0);
}
function readAliasedImportMetaEnvFoo() {
	return capture(() => {
		return {
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "development",
			"PROD": true,
			"SSR": false,
			"VITE_DEFINED": "from-vite-dotenv",
			"XXX": "123"
		}.FOO;
	});
}
function readImportMetaEnvXXX() {
	return capture(() => "123");
}
//#endregion
export { serializeProbeValue as n, collectEnvProbeRows as t };
