// RESPONSIBILITY: Mechanically enforces Landing module import isolation without adding a new dependency.
// FLOW: ESLint -> no-restricted-imports -> relative/cross-role import rejection -> CI gate.

/**
 * Intent: Prevent accidental architectural coupling and relative-import drift in the supplied Landing role container.
 * Edge Cases: ESLint itself must be present in the host project's approved toolchain; no dependency is added by this archive.
 * Side Effects: A lint violation blocks the owning CI job when this config is wired into the host repository.
 * AI Notes: Keep feature-to-feature coupling behind an explicit event/API boundary; never weaken these restrictions to make an import compile.
 */
export default [
  {
    files: ['backend_landing/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['../*', '../**/*', './*', './**/*'], message: 'Use the @/ absolute alias; relative imports are forbidden by Rule 88 and the isolation contract.' },
            { group: ['@/backend_admin/**', '@/backend_*/**/backend_admin/**'], message: 'Cross-role backend imports are forbidden by Rule 0B/74.' },
          ],
        },
      ],
    },
  },
];
