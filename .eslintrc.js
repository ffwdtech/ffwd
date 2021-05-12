module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  env: {
    browser: true,
    commonjs: true,
    node: true,
    jest: true,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['prettier'],
  rules: {
    quotes: ['warn', 'single'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'array-callback-return': [
      'error',
      {
        allowImplicit: true,
      },
    ],
    'no-extra-semi': 2,
    eqeqeq: 2,
    'no-undef': 2,
    'no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'none',
      },
    ],
    'no-loop-func': 2,
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    semi: 2,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-mixed-spaces-and-tabs': 2,
    'sort-imports': [
      'warn',
      {
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['all', 'single', 'multiple', 'none'],
        allowSeparatedGroups: true,
      },
    ],
  },
};
