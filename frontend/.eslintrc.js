module.exports = {
  extends: ['@mate-academy/eslint-config-react-typescript'],
  rules: {
    'react/display-name': 'off',
    'max-len': [
      'error',
      {
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
      },
    ],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
