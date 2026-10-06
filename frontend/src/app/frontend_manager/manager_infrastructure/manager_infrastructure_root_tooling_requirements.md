# Manager Root Tooling Requirements

The Manager folder depends on host-project root tooling that cannot be owned safely inside this role folder: TypeScript strict mode, ESLint enforcement, Tailwind linting, Prettier, Husky/lint-staged, Vitest, Playwright, SCA, secret scanning, Gitleaks, CODEOWNERS and CI branch protection.

Required gates include `tsc --noEmit`, ESLint, Tailwind validation, Prettier check, unit/component tests, coverage thresholds, applicable Playwright E2E tests, production build, dependency vulnerability scanning and secret detection. Security-sensitive Manager changes require human CODEOWNERS review and a Security Impact Analysis.
