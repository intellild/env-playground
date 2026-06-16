import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";

export default defineConfig((_, argv) => {
  const mode = argv.mode === "production" ? "production" : "development";
  const outputSuffix = mode === "production" ? "prod" : "dev";

  return {
    context: import.meta.dirname,
    mode,
    devtool: false,
    entry: {
      main: "./src/browser-entry.tsx",
    },
    output: {
      chunkFilename: "[name].js",
      clean: false,
      filename: "[name].js",
      path: `${import.meta.dirname}/dist-rspack-${outputSuffix}`,
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
                  development: mode === "development",
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
      new rspack.EnvironmentPlugin({
        FOO: null,
        NEXT_CONFIG_DEFINED: "from-rspack-environment-plugin",
        NEXT_PUBLIC_DEFINED: "from-rspack-environment-plugin",
      }),
      new rspack.DefinePlugin({
        __BUNDLER_NAME__: JSON.stringify("rspack"),
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
    ],
  };
});
