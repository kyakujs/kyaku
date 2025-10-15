import { defineConfig } from "eslint/config";

import baseConfig from "@kyakujs/eslint-config/base";
import reactConfig from "@kyakujs/eslint-config/react";

export default defineConfig(
  {
    ignores: ["dist/**"],
  },
  baseConfig,
  reactConfig,
);
