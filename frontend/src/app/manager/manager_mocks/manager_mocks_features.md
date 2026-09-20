# Manager Mocks — Feature Map

## Module Purpose
`manager_mocks/` owns the Manager MSW bootstrap and handler aggregation required to demonstrate frontend behavior without a live backend. It registers feature-owned handlers but does not own feature business data or business rules itself.

## Directory Structure
```text
manager_mocks/
├── ManagerMockHandlers.ts
├── ManagerMswBrowser.ts
├── ManagerMswBrowserBootstrap.tsx
├── ManagerMswTestServer.ts
├── ManagerTestProviders.tsx
├── manager_mocks_url_config.ts
└── manager_mocks_types/
    └── ManagerMswBrowserBootstrapTypes.ts
```

## Data / State Flow
Feature modules own their fixtures and mutable MSW state. This folder composes those handlers and provides browser/test bootstrap wiring. Reset behavior is delegated to each feature's reset function through the test server.

## Business Boundary
Do not place business fixtures, business schemas, or feature-specific response logic here. Only application-wide MSW composition/bootstrap belongs in this role-level folder.

## Verification Checklist
- [x] Feature handlers are composed through `ManagerMockHandlers.ts`.
- [x] Browser and test MSW entry points are separated.
- [x] Feature mutation state can be reset through the test-support reset contract.
- [ ] Real MSW execution in the host application: NOT VERIFIED from this snapshot.

## Approved External Dependencies

- Global framework/application infrastructure documented by the architecture standard may be used when required.
- Approved zero-business UI primitives may be imported from Manager application infrastructure.
- Sibling feature business logic, state, API services, fixtures, and tests are not dependencies.

