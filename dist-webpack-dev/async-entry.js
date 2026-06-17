export const __webpack_esm_id__ = "async-entry";
export const __webpack_esm_ids__ = ["async-entry"];
export const __webpack_esm_modules__ = {

/***/ "./src/async-entry.ts"
/*!****************************!*\
  !*** ./src/async-entry.ts ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   collectAsyncEnvProbeRows: () => (/* binding */ collectAsyncEnvProbeRows)
/* harmony export */ });
/* harmony import */ var _env_probe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./env-probe */ "./src/env-probe.ts");

function collectAsyncEnvProbeRows(runtimeName) {
    var rows = (0,_env_probe__WEBPACK_IMPORTED_MODULE_0__.collectEnvProbeRows)("".concat(runtimeName, ":async"));
    globalThis.__ASYNC_ENV_PROBE_ROWS__ = rows;
    return rows;
}


/***/ }

};
