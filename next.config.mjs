/** @type {import("next").NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  env: {
    NEXT_CONFIG_DEFINED: "from-next-config",
  },
  webpack(config) {
    config.plugins.push(
      new (require("webpack").DefinePlugin)({
        "import.meta.env.XXX": JSON.stringify("123"),
      }),
    );
    return config;
  },
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
