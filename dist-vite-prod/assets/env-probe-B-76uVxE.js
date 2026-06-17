function e(e) {
  let t = [
    {
      expression: `process.env.NODE_ENV`,
      group: `process`,
      note: `Expected to be development for these probes.`,
      value: r(),
    },
    {
      expression: `process.env.NEXT_PUBLIC_DEFINED`,
      group: `process`,
      note: `Defined in .env.development for the Next app.`,
      value: i(),
    },
    {
      expression: `process.env.NEXT_CONFIG_DEFINED`,
      group: `process`,
      note: `Defined by next.config.mjs env.`,
      value: a(),
    },
    {
      expression: `process.env.FOO`,
      group: `process`,
      note: `FOO is intentionally not defined by this project.`,
      value: o(),
    },
    {
      expression: `import.meta.env.MODE`,
      group: `import-meta`,
      note: `Vite defines this from --mode development.`,
      value: s(),
    },
    {
      expression: `import.meta.env.DEV`,
      group: `import-meta`,
      note: `Vite boolean for non-production modes.`,
      value: c(),
    },
    {
      expression: `import.meta.env.VITE_DEFINED`,
      group: `import-meta`,
      note: `Defined in .env.development with the VITE_ prefix.`,
      value: l(),
    },
    {
      expression: `import.meta.env.FOO`,
      group: `import-meta`,
      note: `FOO is intentionally not defined by this project.`,
      value: u(),
    },
    {
      expression: `const env = import.meta.env; env.FOO`,
      group: `import-meta`,
      note: `Alias access for an undefined import.meta.env field.`,
      value: d(),
    },
    {
      expression: `import.meta.env.XXX`,
      group: `import-meta`,
      note: `Defined via bundler define config.`,
      value: f(),
    },
  ];
  return (
    (globalThis.__ENV_PROBE_ROWS__ = t),
    console.log(`[env-probe:${e}]`, t),
    t
  );
}
function t(e) {
  return e === void 0
    ? `undefined`
    : typeof e == `string`
      ? JSON.stringify(e)
      : String(e);
}
function n(e) {
  try {
    return e();
  } catch (e) {
    return e instanceof Error
      ? `${e.name}: ${e.message}`
      : `Thrown: ${String(e)}`;
  }
}
function r() {
  return n(() => `production`);
}
function i() {
  return n(() => ({}).NEXT_PUBLIC_DEFINED);
}
function a() {
  return n(() => ({}).NEXT_CONFIG_DEFINED);
}
function o() {
  return n(() => ({}).FOO);
}
function s() {
  return n(() => `production`);
}
function c() {
  return n(() => !1);
}
function l() {
  return n(() => void 0);
}
function u() {
  return n(() => void 0);
}
function d() {
  return n(
    () =>
      ({
        BASE_URL: `/`,
        DEV: !1,
        MODE: `production`,
        PROD: !0,
        SSR: !1,
        XXX: `123`,
      }).FOO,
  );
}
function f() {
  return n(() => `123`);
}
export { t as n, e as t };
