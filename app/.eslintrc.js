module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	parser: "@typescript-eslint/parser",
	extends: [
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"airbnb",
	],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: "module",
	},
	settings: {
		react: {
			version: "999.999.999",
		},
	},
	plugins: [
		"react", "import",
	],
	rules: {
		"linebreak-style": ["off"],
		"max-len": ["error", { code: 250 }],
		semi: ["error"],
		indent: ["error", "tab"],
		"space-before-function-paren": ["error", "never"],
		"no-shadow": ["off"],
		"no-tabs": ["error", { allowIndentationTabs: true }],
		"no-unused-vars": [process.env.NODE_ENV === "production" ? "error" : "off", { varsIgnorePattern: "PropTypes" }],
		"no-trailing-spaces": ["error", { skipBlankLines: true }],
		"no-use-before-define": "off",
		quotes: ["error", "double"],
		"react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
		"react/self-closing-comp": ["error", {
			component: false,
			html: false,
		}],
		"react/jsx-indent": ["error", "tab"],
		"react/jsx-indent-props": ["error", "tab"],
		"react/jsx-closing-bracket-location": [1, "after-props"],
		"react/jsx-max-props-per-line": ["off"],
		"react/jsx-first-prop-new-line": ["error", "never"],
		"react/require-default-props": ["error", { forbidDefaultForRequired: false }],
		"jsx-a11y/control-has-associated-label": ["off"],
		"import/no-unresolved": ["off"],
		"import/prefer-default-export": ["off"],
		"@typescript-eslint/no-use-before-define": ["error"],
		"@typescript-eslint/no-unused-vars": [process.env.NODE_ENV === "production" ? "error" : "off"],
	},
};
