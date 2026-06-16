import Head from "next/head";
import { EnvProbeApp } from "../src/EnvProbeApp";

export default function Home() {
  return (
    <>
      <Head>
        <title>Env Bundler Probe</title>
      </Head>
      <EnvProbeApp runtimeName="next-turbopack" />
    </>
  );
}
