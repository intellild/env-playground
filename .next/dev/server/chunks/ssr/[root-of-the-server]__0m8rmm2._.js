module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[project]/src/env-probe.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "collectEnvProbeRows",
    ()=>collectEnvProbeRows,
    "serializeProbeValue",
    ()=>serializeProbeValue
]);
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("src/env-probe.ts")}`;
    },
    get turbopackHot () {
        return __turbopack_context__.m.hot;
    }
};
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
        return error instanceof Error ? `${error.name}: ${error.message}` : `Thrown: ${String(error)}`;
    }
}
function readProcessEnvNodeEnv() {
    return capture(()=>("TURBOPACK compile-time value", "development"));
}
function readProcessEnvNextPublicDefined() {
    return capture(()=>("TURBOPACK compile-time value", "from-next-dotenv"));
}
function readProcessEnvNextConfigDefined() {
    return capture(()=>("TURBOPACK compile-time value", "from-next-config"));
}
function readProcessEnvFoo() {
    return capture(()=>process.env.FOO);
}
function readImportMetaEnvMode() {
    return capture(()=>__TURBOPACK__import$2e$meta__.env.MODE);
}
function readImportMetaEnvDev() {
    return capture(()=>__TURBOPACK__import$2e$meta__.env.DEV);
}
function readImportMetaEnvViteDefined() {
    return capture(()=>__TURBOPACK__import$2e$meta__.env.VITE_DEFINED);
}
function readImportMetaEnvFoo() {
    return capture(()=>__TURBOPACK__import$2e$meta__.env.FOO);
}
function readAliasedImportMetaEnvFoo() {
    return capture(()=>{
        const env = __TURBOPACK__import$2e$meta__.env;
        return env.FOO;
    });
}
function readImportMetaEnvXXX() {
    return capture(()=>__TURBOPACK__import$2e$meta__.env.XXX);
}
}),
"[project]/src/EnvProbeApp.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EnvProbeApp",
    ()=>EnvProbeApp
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2d$probe$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/env-probe.ts [ssr] (ecmascript)");
;
;
;
const routes = [
    {
        id: "summary",
        label: "Summary"
    },
    {
        id: "process",
        label: "process.env"
    },
    {
        id: "import-meta",
        label: "import.meta.env"
    }
];
const routeIds = new Set(routes.map((route)=>route.id));
function readRouteFromHash() {
    const route = globalThis.location?.hash.replace(/^#\/?/, "");
    return routeIds.has(route) ? route : "summary";
}
function EnvProbeApp({ runtimeName }) {
    const [route, setRoute] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(()=>readRouteFromHash());
    const rows = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>globalThis.__ENV_PROBE_ROWS__ ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2d$probe$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["collectEnvProbeRows"])(runtimeName), [
        runtimeName
    ]);
    const visibleRows = route === "summary" ? rows : rows.filter((row)=>row.group === route);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const onHashChange = ()=>{
            setRoute(readRouteFromHash());
        };
        globalThis.addEventListener("hashchange", onHashChange);
        console.table(rows);
        return ()=>{
            globalThis.removeEventListener("hashchange", onHashChange);
        };
    }, [
        rows
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
        style: {
            color: "#111",
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            margin: "32px auto",
            maxWidth: 1080,
            padding: "0 24px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                children: "Env bundler probe"
            }, void 0, false, {
                fileName: "[project]/src/EnvProbeApp.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: [
                    "Runtime: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                        children: runtimeName
                    }, void 0, false, {
                        fileName: "[project]/src/EnvProbeApp.tsx",
                        lineNumber: 62,
                        columnNumber: 18
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/EnvProbeApp.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                "aria-label": "Env probe routes",
                style: {
                    display: "flex",
                    gap: 8
                },
                children: routes.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            globalThis.location.hash = `#/${item.id}`;
                            setRoute(item.id);
                        },
                        style: {
                            background: route === item.id ? "#111" : "#fff",
                            border: "1px solid #111",
                            color: route === item.id ? "#fff" : "#111",
                            cursor: "pointer",
                            padding: "6px 10px"
                        },
                        type: "button",
                        children: item.label
                    }, item.id, false, {
                        fileName: "[project]/src/EnvProbeApp.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/EnvProbeApp.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("table", {
                style: {
                    borderCollapse: "collapse",
                    marginTop: 24,
                    width: "100%"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("thead", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                    style: cellStyle,
                                    children: "Expression"
                                }, void 0, false, {
                                    fileName: "[project]/src/EnvProbeApp.tsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                    style: cellStyle,
                                    children: "Result"
                                }, void 0, false, {
                                    fileName: "[project]/src/EnvProbeApp.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                    style: cellStyle,
                                    children: "Notes"
                                }, void 0, false, {
                                    fileName: "[project]/src/EnvProbeApp.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/EnvProbeApp.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/EnvProbeApp.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tbody", {
                        children: visibleRows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                        style: cellStyle,
                                        children: row.expression
                                    }, void 0, false, {
                                        fileName: "[project]/src/EnvProbeApp.tsx",
                                        lineNumber: 102,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                        style: cellStyle,
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2d$probe$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["serializeProbeValue"])(row.value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/EnvProbeApp.tsx",
                                        lineNumber: 103,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                        style: cellStyle,
                                        children: row.note
                                    }, void 0, false, {
                                        fileName: "[project]/src/EnvProbeApp.tsx",
                                        lineNumber: 104,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, row.expression, true, {
                                fileName: "[project]/src/EnvProbeApp.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/EnvProbeApp.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/EnvProbeApp.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("script", {
                suppressHydrationWarning: true,
                type: "application/json",
                id: "env-probe-data",
                children: JSON.stringify(rows, null, 2)
            }, void 0, false, {
                fileName: "[project]/src/EnvProbeApp.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/EnvProbeApp.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
const cellStyle = {
    border: "1px solid #aaa",
    padding: "8px",
    textAlign: "left",
    verticalAlign: "top"
};
}),
"[project]/pages/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$9_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.9_react-dom@19.2.7_react@19.2.7__react@19.2.7/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$EnvProbeApp$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/EnvProbeApp.tsx [ssr] (ecmascript)");
;
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$9_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                    children: "Env Bundler Probe"
                }, void 0, false, {
                    fileName: "[project]/pages/index.tsx",
                    lineNumber: 8,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$EnvProbeApp$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["EnvProbeApp"], {
                runtimeName: "next-turbopack"
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0m8rmm2._.js.map