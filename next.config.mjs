/** @type {import("next").NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  env: {
    NEXT_CONFIG_DEFINED: "from-next-config",
  },
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
