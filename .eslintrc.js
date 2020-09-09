module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier' ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'linebreak-style': [ 'error', 'unix' ],
    'eol-last': [ 'error', 'always' ],
    'max-len': [ 'error', 120 ],
  },
  overrides: [
    {
      files: ['bin/www', '!(node_modules|storage)/*.js'],
    }
  ]
};
