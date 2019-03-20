const path = require('path');

module.exports = {
	env: {
		es6: true,
		browser: true,
		node: true,
	},
	extends: ['airbnb'],
	plugins: [
		'babel',
		'import',
		'jsx-a11y',
		'react',
	],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	rules: {
		'object-curly-spacing': 'off',
		// Indent with 4 spaces
		"indent": ["error", 4],
		// Indent JSX with 4 spaces
		"react/jsx-indent": ["error", 4],
		// Indent props with 4 spaces
		"react/jsx-indent-props": ["error", 4],
		"react/prop-types": 0,
		"react/destructuring-assignment": 0,
	}
};
