import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (_, argv) => {
  const mode = argv.mode === "production" ? "production" : "development";
  const outputSuffix = mode === "production" ? "prod" : "dev";

  return {
    context: __dirname,
    mode,
    devtool: false,
    entry: {
      main: "./src/browser-entry.tsx",
    },
    output: {
      chunkFilename: "[name].js",
      clean: false,
      filename: "[name].js",
      path: path.resolve(__dirname, `dist-webpack-${outputSuffix}`),
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "swc-loader",
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
          },
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
      new HtmlWebpackPlugin({
        template: "./template.html",
      }),
      new webpack.EnvironmentPlugin({
        FOO: null,
        NEXT_CONFIG_DEFINED: "from-webpack-environment-plugin",
        NEXT_PUBLIC_DEFINED: "from-webpack-environment-plugin",
      }),
      new webpack.DefinePlugin({
        __BUNDLER_NAME__: JSON.stringify("webpack"),
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
    ],
  };
};
