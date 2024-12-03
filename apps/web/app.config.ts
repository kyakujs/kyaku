import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@tanstack/start/config";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    preset: "node-server",
    compatibilityDate: "2024-12-02",
  },
  vite: {
    plugins: [
      tailwindcss(),
      viteTsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
  tsr: {
    generatedRouteTree: "app/route-tree.gen.ts",
  },
  react: {
    babel: {
      plugins: [
        [
          "babel-plugin-react-compiler",
          {
            target: "19",
          },
        ],
      ],
    },
  },
});
