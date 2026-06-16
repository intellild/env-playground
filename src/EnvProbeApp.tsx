import { useEffect, useMemo, useState } from "react";
import { collectEnvProbeRows, serializeProbeValue } from "./env-probe";

type RouteId = "summary" | "process" | "import-meta";

type Route = {
  id: RouteId;
  label: string;
};

const routes: Route[] = [
  { id: "summary", label: "Summary" },
  { id: "process", label: "process.env" },
  { id: "import-meta", label: "import.meta.env" },
];

const routeIds = new Set<RouteId>(routes.map(route => route.id));

function readRouteFromHash(): RouteId {
  const route = globalThis.location?.hash.replace(/^#\/?/, "") as RouteId;

  return routeIds.has(route) ? route : "summary";
}

export function EnvProbeApp({ runtimeName }: { runtimeName: string }) {
  const [route, setRoute] = useState<RouteId>(() => readRouteFromHash());
  const rows = useMemo(
    () => globalThis.__ENV_PROBE_ROWS__ ?? collectEnvProbeRows(runtimeName),
    [runtimeName],
  );
  const visibleRows =
    route === "summary"
      ? rows
      : rows.filter(row => row.group === route);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(readRouteFromHash());
    };

    globalThis.addEventListener("hashchange", onHashChange);
    console.table(rows);

    return () => {
      globalThis.removeEventListener("hashchange", onHashChange);
    };
  }, [rows]);

  return (
    <main
      style={{
        color: "#111",
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        margin: "32px auto",
        maxWidth: 1080,
        padding: "0 24px",
      }}
    >
      <h1>Env bundler probe</h1>
      <p>
        Runtime: <strong>{runtimeName}</strong>
      </p>
      <nav aria-label="Env probe routes" style={{ display: "flex", gap: 8 }}>
        {routes.map(item => (
          <button
            key={item.id}
            onClick={() => {
              globalThis.location.hash = `#/${item.id}`;
              setRoute(item.id);
            }}
            style={{
              background: route === item.id ? "#111" : "#fff",
              border: "1px solid #111",
              color: route === item.id ? "#fff" : "#111",
              cursor: "pointer",
              padding: "6px 10px",
            }}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>
      <table
        style={{
          borderCollapse: "collapse",
          marginTop: 24,
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th style={cellStyle}>Expression</th>
            <th style={cellStyle}>Result</th>
            <th style={cellStyle}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {visibleRows.map(row => (
            <tr key={row.expression}>
              <td style={cellStyle}>{row.expression}</td>
              <td style={cellStyle}>{serializeProbeValue(row.value)}</td>
              <td style={cellStyle}>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <script
        suppressHydrationWarning
        type="application/json"
        id="env-probe-data"
      >
        {JSON.stringify(rows, null, 2)}
      </script>
    </main>
  );
}

const cellStyle = {
  border: "1px solid #aaa",
  padding: "8px",
  textAlign: "left",
  verticalAlign: "top",
} satisfies React.CSSProperties;
