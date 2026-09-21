import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/**', 'coverage/**', 'node_modules/**'],
  },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    rules: {
      'no-console': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*', '../../*', '../../../*', '../../../../*'],
              message: 'Use the configured @/ absolute import alias. Relative imports are prohibited.'
            },
            {
              group: ['@/modules/*/*/index'],
              message: 'Barrel-file imports are prohibited.'
            }
          ]
        }
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { 'allowExpressions': true, 'allowTypedFunctionExpressions': true }
      ]
    }
  }
);
