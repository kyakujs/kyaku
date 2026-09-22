import baseConfig from "@kyakujs/eslint-config/base";
import reactConfig from "@kyakujs/eslint-config/react";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    ignores: [".tanstack/**"],
  },
  baseConfig,
  reactConfig,
);
