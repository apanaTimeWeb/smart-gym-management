# Manager Navigation — Feature Map

## Module Purpose
`manager_navigation/` defines Manager role navigation structure and header navigation behavior. It owns which Manager routes are surfaced, their labels, ordering, icon selection, and navigation-only configuration. It must reference feature-owned page URL constants rather than embedding duplicate business route strings.

## Directory Structure
```text
manager_navigation/
├── ManagerNavigationConfig.ts
├── ManagerHeaderNavigationConfig.ts
├── manager_navigation_url_config.ts
├── manager_navigation_features.md
├── manager_navigation_forbidden.md
└── manager_navigation_theme_contract.md
```

## Data / State Flow
Navigation configuration is static role configuration. Active-route state is derived from the application router and shell. Navigation does not own feature server state.

## Business Boundary
Navigation may reference feature URL configuration for route destinations but must not import feature business components, hooks, stores, API services, schemas, fixtures, or tests.

## Verification Checklist
- [x] Feature URL config is the route source for business navigation targets.
- [x] No sibling business module is imported for navigation behavior.
- [x] Navigation remains a role-container concern, not a feature-business container.
- [ ] Browser deep-link/back/forward verification: NOT VERIFIED without host runtime.

## Approved External Dependencies

- Global framework/application infrastructure documented by the architecture standard may be used when required.
- Approved zero-business UI primitives may be imported from Manager application infrastructure.
- Sibling feature business logic, state, API services, fixtures, and tests are not dependencies.

