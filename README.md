# Env Playground

This repository compares how Vite, Rspack, Webpack, and Next.js Turbopack handle
`process.env` and `import.meta.env` references in development mode.

The generated output is intentionally committed for inspection:

- `dist-vite/`
- `dist-rspack/`
- `dist-webpack/`
- `.next/dev/`

Run the full verification:

```bash
pnpm install
pnpm run verify
```

The env probe source is `src/env-probe.ts`. Vite, Rspack, and Webpack are
configured to split it into a standalone `env-probe` chunk for easier review.
