module.exports = {
  root: true,

  env: {
    node: true,
    browser: true,
  },

  extends: ['plugin:vue/strongly-recommended', '@vue/airbnb'],

  rules: {
    'template-curly-spacing': 'off',
    indent: ['error', 2, {
      ignoredNodes: ['TemplateLiteral'],
    }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'import/prefer-default-export': 'off',
    'space-before-function-paren': 'off',
    'no-console': 'off',
    'no-return-await': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
    'max-len': ['error', { code: 130 }],
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never',
      },
    ],
    quotes: ['error', 'single', {
      avoidEscape: true,
      allowTemplateLiterals: true,
    }],
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
