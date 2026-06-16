"use strict";
(self["webpackChunkenv_playground"] = self["webpackChunkenv_playground"] || []).push([[357],{

/***/ 683
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ serializeProbeValue),
/* harmony export */   t: () => (/* binding */ collectEnvProbeRows)
/* harmony export */ });
function _instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function collectEnvProbeRows(runtimeName) {
    var rows = [
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
        }
    ];
    globalThis.__ENV_PROBE_ROWS__ = rows;
    console.log("[env-probe:".concat(runtimeName, "]"), rows);
    return rows;
}
function serializeProbeValue(value) {
    if (value === undefined) {
        return "undefined";
    }
    if (typeof value === "string") {
        return JSON.stringify(value);
    }
    return String(value);
}
function capture(read) {
    try {
        return read();
    } catch (error) {
        return _instanceof(error, Error) ? "".concat(error.name, ": ").concat(error.message) : "Thrown: ".concat(String(error));
    }
}
function readProcessEnvNodeEnv() {
    return capture(function() {
        return "production";
    });
}
function readProcessEnvNextPublicDefined() {
    return capture(function() {
        return "from-webpack-environment-plugin";
    });
}
function readProcessEnvNextConfigDefined() {
    return capture(function() {
        return "from-webpack-environment-plugin";
    });
}
function readProcessEnvFoo() {
    return capture(function() {
        return null;
    });
}
function readImportMetaEnvMode() {
    return capture(function() {
        return undefined;
    });
}
function readImportMetaEnvDev() {
    return capture(function() {
        return undefined;
    });
}
function readImportMetaEnvViteDefined() {
    return capture(function() {
        return undefined;
    });
}
function readImportMetaEnvFoo() {
    return capture(function() {
        return null;
    });
}
function readAliasedImportMetaEnvFoo() {
    return capture(function() {
        var env = {"FOO":null,"NEXT_CONFIG_DEFINED":"from-webpack-environment-plugin","NEXT_PUBLIC_DEFINED":"from-webpack-environment-plugin","NODE_ENV":"production"};
        return env.FOO;
    });
}


/***/ }

}]);