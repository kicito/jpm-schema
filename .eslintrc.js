// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard', 'oclif', 'oclif-typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'dot-notation': 'off',
  },
}
