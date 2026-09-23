import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart({
      router: {
        generatedRouteTree: "./route-tree.gen.ts",
      },
    }),
    react({
      compiler: true
    }),
    tailwindcss(),
  ],
  server: {
    host: "0.0.0.0",
    allowedHosts: ["host.docker.internal"],
  },
  resolve: {
    tsconfigPaths: true,
  },
});
