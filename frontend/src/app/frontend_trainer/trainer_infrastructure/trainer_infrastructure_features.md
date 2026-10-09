# trainer_infrastructure — Feature Map

## Module Purpose
`trainer_infrastructure` owns zero-business application plumbing used by the Trainer role: shell layout/presentation, navigation presentation, feedback/toasts, confirmation dialogs, route error fallback, realtime socket lifecycle, dirty-form navigation protection, idempotency-key helpers, and dumb UI primitives. Role-specific navigation metadata is owned by the parent `trainer_navigation/` configuration boundary. It must not own business records, business status registries, feature API clients, business fixtures, or business workflows.

## Dependency Manifest
- Global application infrastructure: `@/lib/api`, Next.js routing/runtime, global theme tokens, `next-intl`, TanStack Query provider, and approved package infrastructure supplied by the host application.
- **Host approval required:** `socket.io-client` is used by the centralized realtime transport, but the supplied bundle does not contain the host package registry or explicit human approval required by the frontend package-registry rule. This dependency is therefore **BLOCKED_BY_SUPPLIED_SCOPE** for final production verification; do not silently treat it as approved.
- Module-owned consumers: Trainer feature modules may consume zero-business infrastructure primitives and hooks.
- No sibling feature business imports are permitted.

## Feature Lifecycle Contract
1. Host `frontend_trainer/layout.tsx` mounts the role infrastructure providers/layout.
2. Shell presentation renders header/sidebar/command palette and exposes navigation.
3. Feature forms register dirty state through the navigation guard when needed.
4. Feature mutations use the module-owned feedback hook with stable action IDs.
5. Realtime feature consumers retain/release the centralized socket client through the infrastructure event hook.
6. Confirmation requests resolve a boolean promise and restore focus to the invoking control.
7. Route-level errors render the infrastructure-safe fallback without owning business recovery logic.

## Directory Structure
- `trainer_infrastructure_constants/` — zero-business infrastructure defaults only.
- `trainer_infrastructure_errors/` — user-safe error translation/reporting.
- `trainer_infrastructure_feedback/` — toast/confirmation primitives.
- `trainer_infrastructure_hooks/` — debounce, idempotency, navigation guard.
- `trainer_infrastructure_layout/` — Trainer shell UI.
- `trainer_infrastructure_locales/` — module-local en/hi messages.
- `trainer_infrastructure_realtime/` — centralized socket lifecycle.
- `trainer_infrastructure_role_guard/` — role/permission gate.
- `trainer_infrastructure_schemas/` — infrastructure API response validation.
- `trainer_infrastructure_shared/` — zero-business reusable UI primitives.
- `trainer_infrastructure_store/` — module-local UI-only dirty-source registry.
- `trainer_infrastructure_types/` — infrastructure-owned type contracts.

## Approved External Dependencies
Only application infrastructure or approved packages documented by the host application are permitted. The feedback layer uses `sonner`. Feature business packages are not owned here.

## Feature Inventory
### Shell
Header, sidebar, command palette, shell CSS, and role guard. Trainer-specific navigation metadata is supplied by the parent `trainer_navigation/` role configuration boundary.
### Feedback
Toast host, confirmation provider/modal, user-safe error presentation.
### Navigation Protection
Unsaved-change registry, browser `beforeunload`, same-origin anchor interception, confirmation flow.
### Realtime
Single ref-counted socket client plus event subscription hook.
### Shared UI
Pagination, tooltip, stat card, skeleton blocks, and other zero-business presentation primitives.

## User Flows & Interactions
### Confirm action
1. A feature calls `confirm(options)`.
2. Provider opens the dialog and stores the invoking element.
3. User confirms/cancels or presses Escape.
4. Promise resolves `true`/`false`.
5. Provider closes and restores focus.

### Dirty-form navigation
1. Form registers its source ID with dirty state.
2. Same-origin navigation or browser exit is intercepted while dirty.
3. Confirmation is shown once at a time.
4. Approved route navigation continues; declined navigation is cancelled.
5. Cleanup removes listeners and unregisters the source.

### Realtime subscription
1. Feature requests an event subscription.
2. Shared socket client is retained while at least one consumer exists.
3. Listener is attached for the requested event.
4. Cleanup removes the listener and releases the socket reference.

## Data & State Architecture
- Server/API data: **N/A** for business infrastructure.
- Module UI state: Zustand is limited to dirty-source navigation state.
- Local transient state: React state inside the owning dialog/provider where strictly local.
- No API response data or loading state belongs in Context or the infrastructure Zustand store.

## API Contract
**N/A.** This module does not own feature business endpoints. It consumes the host application's approved API transport only where an infrastructure contract explicitly requires it.

## UI Data Requirements
**N/A for business datasets.** Static infrastructure labels are localized and infrastructure configuration is co-located under module constants.

## Permissions and Security
- The role guard enforces the Trainer shell permission boundary before rendering role content.
- Error reporting must use safe user-facing messages; raw backend/internal errors must not leak through UI.
- Socket lifecycle must remain centralized; feature components must not create independent WebSocket/Socket.IO clients.

## Loading / Empty / Error Behavior
- Skeleton primitives are provided for feature consumers; the infrastructure module itself does not invent business loading data.
- Route errors render the infrastructure-safe fallback and expose recovery controls.
- Empty states are owned by the business feature, not by infrastructure unless the component is a zero-business collection primitive.

## Edge Cases
- Confirmation is single-flight while a prompt is already open.
- Dirty-source cleanup must always remove stale registry entries.
- Navigation guard must ignore modified-click, external-origin, new-tab, and same-URL interactions.
- Dialog focus must wrap with Tab/Shift+Tab and restore the triggering element on close.
- Realtime reference counting must release the socket when the final listener unmounts.
- Toast action IDs must remain stable so retries do not create duplicate feedback surfaces.

## Component Responsibility Map
- `TrainerInfrastructureLayoutClient`: shell composition and layout state.
- `TrainerInfrastructureHeader`: top-header presentation.
- `TrainerInfrastructureSidebar`: role navigation presentation.
- `TrainerInfrastructureCommandPalette`: command/search surface presentation.
- `TrainerInfrastructureConfirmProvider`: promise-based confirmation orchestration.
- `TrainerInfrastructureConfirmModal`: confirmation presentation and focus/keyboard behavior.
- `TrainerInfrastructureToastHost`: single Sonner renderer.
- `TrainerInfrastructureRoleGuard`: role permission gate.
- `TrainerInfrastructureSocketClient` / `useTrainerInfrastructureSocketEvent`: centralized realtime lifecycle.
- `TrainerInfrastructurePagination`, `TrainerInfrastructureTooltip`, skeletons/stat card: dumb zero-business primitives.

## Rule Compliance Checklist
- [x] Zero-business infrastructure only.
- [x] Prefixed snake_case child folders.
- [x] Role+Module filename identity for authored module files.
- [x] Absolute imports only.
- [x] No barrel files.
- [x] Semantic design tokens and motion/focus contracts.
- [x] en + hi co-located locales.
- [x] No business API, fixture, or status registry ownership.
- [x] Behavioral tests cover confirmation, navigation registry, debounce, and focus trap.
- [x] Approved toast dependency is `sonner`.

## Host Scope
The parent application must supply the canonical package manifest, TypeScript/path configuration, global theme stylesheet and Tailwind token mapping, provider composition, middleware, CI/build configuration, and runtime environment. Those host artifacts were not included in this Trainer bundle and remain outside this repair scope.

## Business-Flow Boundary
Feature CRUD/search/filter/detail flows belong to their owning Trainer feature modules and are intentionally not defined here. This module supplies only zero-business infrastructure: navigation presentation, confirmation, safe feedback, navigation protection, socket lifecycle, and presentational primitives.

## Component Tree
```text
frontend_trainer/
  layout.tsx
  trainer_infrastructure/
    trainer_infrastructure_layout/
    trainer_infrastructure_feedback/
    trainer_infrastructure_realtime/
    trainer_infrastructure_shared/
    trainer_infrastructure_role_guard/
```

## API Contract Summary
- No business API endpoints are owned by this infrastructure boundary; URL config intentionally exposes empty ROUTES/API objects.

## State Map
- Server/API state: TanStack Query.
- Shared UI state: module-scoped Zustand where required.
- Private interaction state: local React state.
- URL-backed filters/pagination: URL/search parameters where documented by the feature.

## Permissions
- Trainer role only within `frontend_trainer`; feature must not introduce manager/superadmin business capabilities.
- Business permissions and status mappings remain feature-owned; do not move them into global UI infrastructure.

## External Dependencies
- Approved global/application infrastructure only: API transport, auth/session, logging/error monitoring, routing/runtime plumbing, and zero-business UI primitives.
- Trainer role infrastructure may be consumed through `trainer_infrastructure_*` contracts. No sibling business-module imports are permitted.

## Known Forbidden Patterns
- Do not import sibling feature business code into `trainer_infrastructure`.
- Do not hardcode URLs outside the module URL config.
- Do not duplicate server state in Zustand or hardcode business statuses in components/schemas.
- Do not introduce raw theme colors, semantic background opacity modifiers, or non-canonical z-index values.
- Preserve the module theme contract and locale ownership when repairing this feature.
