const { TYPESCRIPT_FILES } = require('prefer-code-style/constants');

module.exports = {
  root: true,
  extends: [
    require.resolve('prefer-code-style/eslint/node'),
    require.resolve('prefer-code-style/eslint/browser'),
    // require.resolve('prefer-code-style/eslint/typescript'),
    require.resolve('prefer-code-style/eslint/react')
  ],
  overrides: [
    {
      files: TYPESCRIPT_FILES,
      parserOptions: {
        project: true, // <- 添加此配置指明你项目中 tsconfig.json 的位置
        tsconfigRootDir: __dirname
      }
    }
  ]
};
