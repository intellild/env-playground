"use strict";
(self["rspackChunkenv_playground"] = self["rspackChunkenv_playground"] || []).push([["async-entry"], {
"./src/async-entry.ts"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  collectAsyncEnvProbeRows: () => (collectAsyncEnvProbeRows)
});
/* import */ var _env_probe__rspack_import_0 = __webpack_require__("./src/env-probe.ts");

function collectAsyncEnvProbeRows(runtimeName) {
    var rows = (0,_env_probe__rspack_import_0.collectEnvProbeRows)("".concat(runtimeName, ":async"));
    globalThis.__ASYNC_ENV_PROBE_ROWS__ = rows;
    return rows;
}


},

}]);