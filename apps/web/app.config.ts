import { join } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@tanstack/react-start/config";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = {
  appDirectory: "src",
};
const app = await defineConfig({
  server: {
    preset: "node-server",
    compatibilityDate: "2024-12-05",
  },
  routers: {
    api: {
      entry: join(config.appDirectory, "entry-api.ts"),
    },
    ssr: {
      entry: join(config.appDirectory, "entry-server.ts"),
    },
    client: {
      entry: join(config.appDirectory, "entry-client.tsx"),
    },
  },
  tsr: {
    appDirectory: config.appDirectory,
    generatedRouteTree: join(config.appDirectory, "route-tree.gen.ts"),
  },
  vite: {
    plugins: [
      tailwindcss(),
      viteTsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
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

export default app;
