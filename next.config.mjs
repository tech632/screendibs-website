import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This site lives inside the Screendibs app repo, which has its own lockfile.
  // Pin the root here so Turbopack doesn't infer the parent repo as the workspace.
  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url)),
  },
};

export default nextConfig;
