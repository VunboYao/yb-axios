module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: '@antfu',
  rules: {
    '@typescript-eslint/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'curly': ['error', 'all'],
  },
}
