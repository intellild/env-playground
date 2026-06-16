import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";

export default defineConfig({
  context: import.meta.dirname,
  mode: "development",
  devtool: false,
  entry: {
    main: "./src/browser-entry.tsx",
  },
  output: {
    chunkFilename: "[name].js",
    clean: false,
    filename: "[name].js",
    path: `${import.meta.dirname}/dist-rspack`,
  },
  resolve: {
    extensions: ["...", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|ts)x?$/,
        exclude: [/node_modules/],
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
              tsx: true,
            },
            transform: {
              react: {
                development: true,
                runtime: "automatic",
              },
            },
          },
        },
        type: "javascript/auto",
      },
    ],
  },
  optimization: {
    minimize: false,
    splitChunks: {
      cacheGroups: {
        envProbe: {
          chunks: "all",
          enforce: true,
          name: "env-probe",
          priority: 40,
          test: /[\\/]src[\\/]env-probe\.ts$/,
        },
      },
    },
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./template.html",
    }),
    new rspack.DefinePlugin({
      __BUNDLER_NAME__: JSON.stringify("rspack"),
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
});
