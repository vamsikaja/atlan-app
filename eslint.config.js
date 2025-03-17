import globals from 'globals';
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import typescript from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

export default [
	js.configs.recommended,
	{ languageOptions: { globals: globals.browser } },
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser: tsParser,
			sourceType: "module",
		},
		plugins: {
			"@typescript-eslint": typescript,
			react,
			"react-hooks": reactHooks,
			"jsx-a11y": jsxA11y,
			import: importPlugin,
		},
		settings: {
			react: {
				version: "detect",
			},
		},
		rules: {
			"react/react-in-jsx-scope": "off",
			"@typescript-eslint/explicit-function-return-type": "off"
		},
	},
	prettier,
];
