module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    ecmaFeatures: {
      impliedStrict: true
    }
  },
  extends: ['eslint:recommended', 'plugin:vue/essential', '@vue/prettier'],
  rules: {
    eqeqeq: ['error', 'smart'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
