import React from "react";
import { createRoot } from "react-dom/client";
import { EnvProbeApp } from "./EnvProbeApp";
import { collectEnvProbeRows } from "./env-probe";

collectEnvProbeRows(__BUNDLER_NAME__);

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <EnvProbeApp runtimeName={__BUNDLER_NAME__} />
  </React.StrictMode>,
);
