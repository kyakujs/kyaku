import baseConfig from "@kyakujs/eslint-config/base";
import reactConfig from "@kyakujs/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [...baseConfig, ...reactConfig];
