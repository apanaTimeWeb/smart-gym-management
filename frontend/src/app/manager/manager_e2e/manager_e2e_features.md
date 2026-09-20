# Manager E2E — Feature Map

## Module Purpose
`manager_e2e/` contains Manager role end-to-end specifications that verify complete user-visible flows rather than only rendering. The suite is intended to prove route reachability, interaction chains, success/error recovery, and regression-sensitive workflows using the assembled Manager frontend.

## Directory Structure
```text
manager_e2e/
├── ManagerCriticalFlows.spec.ts
├── manager_e2e_features.md
├── manager_e2e_forbidden.md
├── manager_e2e_theme_contract.md
└── manager_e2e_url_config.ts
```

## Test Scope
Tests may navigate across Manager features as an end-to-end consumer, but they must not import sibling business implementation solely to make assertions easier. Assertions should be based on observable UI, navigation, and documented outcomes.

## Current Reachability Contract
The Manager role currently has 22 reachable route surfaces: the 20 established role features plus `grievance` and `maintenance`. The E2E suite must keep this inventory synchronized with `manager_features.md`.

## Verification Checklist
- [x] Critical-flow E2E spec exists.
- [x] E2E is kept separate from feature unit/component tests.
- [x] New reachable features are included in the route inventory.
- [ ] Actual Playwright execution: NOT VERIFIED without the host project configuration/runtime.

## Approved External Dependencies

- Global framework/application infrastructure documented by the architecture standard may be used when required.
- Approved zero-business UI primitives may be imported from Manager application infrastructure.
- Sibling feature business logic, state, API services, fixtures, and tests are not dependencies.

