declare const __BUNDLER_NAME__: string;

declare const process: {
  env: Record<string, string | undefined>;
};

interface ImportMeta {
  env: Record<string, string | boolean | undefined>;
}
