# Env Playground

This repository compares how Vite, Rspack, Webpack, and Next.js Turbopack handle
`process.env` and `import.meta.env` references in development and production
modes.

The generated output is intentionally committed for inspection:

- `dist-vite-dev/`
- `dist-vite-prod/`
- `dist-rspack-dev/`
- `dist-rspack-prod/`
- `dist-webpack-dev/`
- `dist-webpack-prod/`
- `.next/dev/`
- `.next-prod/`

Run the full verification:

```bash
pnpm install
pnpm run verify
```

The env probe source is `src/env-probe.ts`. `src/async-entry.ts` is dynamically
imported and also depends on the env probe, so `env-probe` is shared by the
initial and async chunks. Vite, Rspack, and Webpack are still configured to split
it into a standalone `env-probe` chunk for easier review; the async dependency
alone does not guarantee a separate shared chunk for this small module.
