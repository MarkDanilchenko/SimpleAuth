import globals from "globals";
import pluginJs from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier";

export default [
  pluginJs.configs.recommended,
  {
    plugins: {
      prettier: pluginPrettier,
    },
  },
  {
    files: ["**/*.{js,ts,mjs,cjs}"],
  },
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/build/**", "**/coverage/**", ".output/**"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        ...globals.jquery,
      },
    },
  },
  {
    rules: {
      "prettier/prettier": [
        "error",
        {
          doubleQuote: true,
          printWidth: 120,
        },
      ],
      "prefer-const": "warn",
      "no-console": "warn",
      "no-unused-vars": "error",
      "no-use-before-define": "error",
      "no-useless-constructor": "error",
      semi: "error",
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "*",
          next: "return",
        },
      ],
    },
  },
];
