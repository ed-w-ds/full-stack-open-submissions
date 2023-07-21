module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: 'airbnb',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  settings: {
    react: {
      version: 'none',
    },
  },
  rules: {
    'linebreak-style': [
      'error',
      'windows',
    ],
    indent: [
      'error',
      2,
    ],
    quotes: [
      'error',
      'single',
    ],
    semi: [
      'error',
      'never',
    ],
    eqeqeq: 'error',
    'consistent-return': 'off',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always',
    ],
    'arrow-spacing': [
      'error', { before: true, after: true },
    ],
    'no-console': 0,
  },
}
