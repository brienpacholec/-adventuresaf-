module.exports = {
  root: true,
  env: {
    browser: true,
    'jest/globals': true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: ['jest'],
  // add your custom rules here
  rules: {
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'indent': ['error', 2],
    'vue/html-indent' : ['error', 2],
    'vue/multi-word-component-names': 'off',
    'no-trailing-spaces': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1 }],
  },
}
