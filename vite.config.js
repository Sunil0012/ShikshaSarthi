import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  appType: "custom",
  plugins: [
    ...tanstackStart({
      srcDirectory: "src",
      router: { entry: "router.tsx" },
      start: { entry: "start.ts" },
      server: { entry: "server.ts" },
    }),
    nitro({
      preset: process.env.VERCEL ? "vercel" : "node-server",
      noExternals: process.platform === "win32",
    }),
    tailwindcss(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    react(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  css: {
    transformer: "lightningcss",
  },
});
