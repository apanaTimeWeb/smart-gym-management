# Manager Components — Feature Map

## Module Purpose
`manager_components/` is the Manager role container's zero-business UI and integration surface. It provides the authenticated Manager shell, generic feedback primitives, query provider wiring, pagination, searchable dropdown, stat-card and table-skeleton primitives. These files may coordinate framework/application infrastructure, but they MUST NOT own Manager business rules, feature data, business status registries, or feature APIs.

## Directory Structure
```text
manager_components/
├── ManagerFeedback/
│   ├── ManagerConfirmModal.tsx
│   ├── ManagerConfirmProvider.tsx
│   ├── ManagerEmptyState.tsx
│   ├── ManagerToast.tsx
│   └── ManagerTooltip.tsx
├── ManagerLayout/
│   ├── ManagerHeader.tsx
│   ├── ManagerLayout.tsx
│   ├── ManagerLayoutTypes.ts
│   └── ManagerSidebar.tsx
├── ManagerQueryProvider.tsx
└── ManagerShared/
    ├── ManagerPagination.tsx
    ├── ManagerSearchableDropdown.tsx
    ├── ManagerStatCard.tsx
    └── ManagerTableSkeleton.tsx
```

## Ownership Contract
- Owns: zero-business UI primitives and Manager shell presentation/integration.
- Must not own: member, plan, billing, HR, attendance, store, communications, or other business behavior.
- Feature-specific business components stay inside their owning feature even when visually similar.

## State / Data Flow
UI primitives receive data/callbacks from feature modules. The shell may consume global session/layout state. API/server data remains owned by feature query/API layers.

## API / Permissions
No feature API contract is owned here. Permission-aware business decisions remain in feature modules or approved application infrastructure.

## Verification Checklist
- [x] No generic business bucket is used for feature behavior.
- [x] Component files use descriptive Manager-prefixed names.
- [x] Shared primitives contain zero business logic.
- [ ] Browser-level responsive/focus verification: NOT VERIFIED without host runtime.

## Approved External Dependencies

- Global framework/application infrastructure documented by the architecture standard may be used when required.
- Approved zero-business UI primitives may be imported from Manager application infrastructure.
- Sibling feature business logic, state, API services, fixtures, and tests are not dependencies.

