const path = require('path');
module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:react/jsx-runtime', // 启用新jsx规则
  ],
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react-hooks', 'jest'],
  globals: {
    // 这里填入你的项目需要的全局变量
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
    React: false,
    ReactDOM: false,
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  rules: {
    // 这里填入你的项目需要的个性化配置，比如：
    'no-console': 'off', // 关闭console校验
    'react/prop-types': 'off', // 关闭prop-types校验
    'react/no-children-prop': 'off', // 关闭children校验
    'react/display-name': 'off', // 关闭displayName校验
    'typescript/member-ordering': 'off', // 关闭成员排序校验
    'typescript/member-delimiter-style': 'off', // 关闭分号校验
    'react/jsx-indent-props': 'off', // 关闭jsx缩进校验
    'react/no-did-update-set-state': 'off', // 关闭setState校验
    'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': 'off', // 关闭依赖校验
    '@typescript-eslint/interface-name-prefix': 'off', // 关闭interface前缀校验
    '@typescript-eslint/no-var-requires': 'off', // 关闭require校验
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }], // 关闭public校验
    '@typescript-eslint/no-empty-function': ['off'], // 关闭空函数校验
    '@typescript-eslint/ban-ts-comment': 'off', // 关闭ts注释校验
    '@typescript-eslint/explicit-function-return-type': [
      // 关闭函数返回值校验
      'off',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off', // 关闭any类型校验
    '@typescript-eslint/no-non-null-assertion': 'off', // 关闭非空断言校验
    '@typescript-eslint/no-use-before-define': 'off', // 关闭变量使用前校验
    '@typescript-eslint/no-unused-vars': 'warn', // 关闭变量未使用校验
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 关闭函数返回值校验
    '@typescript-eslint/camelcase': ['off', { properties: 'always' }], // 关闭驼峰校验
    '@typescript-eslint/no-unused-vars': [
      // 关闭变量未使用校验
      'warn',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    indent: [
      'warn',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true,
      },
    ],
    'prettier/prettier': ['error', { singleQuote: true, parser: 'typescript' }], // 关闭prettier校验
    'react/jsx-uses-react': 'off', // 关闭旧模式校验
    'react/react-in-jsx-scope': 'off', // 关闭旧模式校验
  },
};
