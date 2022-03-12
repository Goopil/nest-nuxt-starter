module.exports = {
  parser: "vue-eslint-parser",
  parserOptions: {
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:vue/strongly-recommended',
    'prettier'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
    browser: true
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
