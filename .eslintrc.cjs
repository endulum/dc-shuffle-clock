module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/strict-type-checked',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'trash'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh'],
  rules: {
    "import/no-unresolved": "off",
    "react/jsx-filename-extension": "off",
    "react/require-default-props": "off",
    "react/jsx-no-bind": [
      'warn',
      { 
        allowFunctions: true,
        allowArrowFunctions: true
      }
    ],
    "@typescript-eslint/no-unused-vars": "warn",
    "react-hooks/exhaustive-deps": "off",
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
