/** @type {import("next").NextConfig} */
const nextConfig = {
  distDir: ".next",
  env: {
    NEXT_CONFIG_DEFINED: "from-next-config",
  },
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
