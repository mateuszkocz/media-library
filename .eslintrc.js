module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', "jsx-a11y"],
  extends: [
    "eslint:recommended",
    'plugin:@typescript-eslint/eslint-recommended',
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect"
    }
  },
};
