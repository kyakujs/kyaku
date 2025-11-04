import routerPlugin from "@tanstack/eslint-plugin-router";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig(
  {
    files: ["**/*.ts", "**/*.tsx"],
    ...reactPlugin.configs.flat.recommended,
    ...reactPlugin.configs.flat["jsx-runtime"],
    ...jsxA11yPlugin.flatConfigs.recommended,
    languageOptions: {
      ...reactPlugin.configs.flat.recommended?.languageOptions,
      ...reactPlugin.configs.flat["jsx-runtime"]?.languageOptions,
      ...jsxA11yPlugin.flatConfigs.recommended.languageOptions,
      globals: {
        React: "writable",
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  reactHooks.configs.flat["recommended-latest"]!,
  routerPlugin.configs["flat/recommended"],
);
