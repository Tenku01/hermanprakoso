import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // eslint-config-next already registers eslint-plugin-jsx-a11y but enables only
    // six rules. Re-declaring the plugin is a hard error in flat config, so this
    // object raises coverage by rule name only.
    name: "portfolio/a11y",
    rules: {
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/heading-has-content": "error",
      // Owned here and only here. `<ul role="list">` is NOT redundant in this
      // codebase: Tailwind's preflight sets `list-style: none`, and Safari with
      // VoiceOver then drops list semantics from the element entirely. The role
      // restores "list, N items". Configured once, in this phase, so that no
      // section phase has to edit eslint.config.mjs conditionally.
      "jsx-a11y/no-redundant-roles": [
        "error",
        { ul: ["list"], ol: ["list"], nav: ["navigation"] },
      ],
      "jsx-a11y/label-has-associated-control": "error",
      "jsx-a11y/no-noninteractive-element-interactions": "error",
      "jsx-a11y/interactive-supports-focus": "error",
      "jsx-a11y/click-events-have-key-events": "error",
    },
  },
  {
    // Backdrop light-dismiss puts an onClick on <dialog>, whose ARIA role
    // descends from `window`, so jsx-a11y classifies it non-interactive. Neither
    // rule takes a per-element allowlist, so a scoped files block is the tightest
    // exemption available. showModal() already supplies Escape and the focus
    // trap, so no keyboard equivalent is actually missing.
    name: "portfolio/islands-dialog",
    files: ["src/components/islands/**/*.tsx"],
    rules: {
      "jsx-a11y/no-noninteractive-element-interactions": "off",
      "jsx-a11y/click-events-have-key-events": "off",
    },
  },
  {
    // The build scripts are plain Node ESM, not browser or React code.
    name: "portfolio/scripts",
    files: ["scripts/**/*.mjs"],
    languageOptions: {
      globals: { process: "readonly", console: "readonly", URL: "readonly" },
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "**/.next/**",
    "portofolio/**",
    "images/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
