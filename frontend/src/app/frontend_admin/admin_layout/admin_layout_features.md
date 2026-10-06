# Admin Layout — Feature Map

## Module Purpose
The Admin Layout is application infrastructure for the authenticated Admin role container. It owns shell chrome, global feedback, shell-level keyboard/focus behavior, the route header/sidebar frame, and the role-wide WebSocket provider. It must not own business feature state or duplicate business feature implementation. Feature modules consume the shell only through approved infrastructure contracts.

## Routes

This role-shell infrastructure module has no standalone business route.

## Dependency Manifest
- React / Next.js App Router
- next-intl
- TanStack Query provider remains host-owned when the consuming application supplies it.
- socket.io-client for WebSocket-only realtime transport.

## Feature Lifecycle Contract
- CRUD is not applicable to the shell itself.
- The shell owns navigation, feedback, density, dialog accessibility, and transport infrastructure only.

## Directory Structure
| Path | Responsibility |
|---|---|
| `admin_layout_config/` | Shell-owned infrastructure boundary. |
| `admin_layout_feedback/` | Shell-owned infrastructure boundary. |
| `admin_layout_i18n/` | Shell-owned infrastructure boundary. |
| `admin_layout_locales/` | Shell-owned infrastructure boundary. |
| `admin_layout_mocks/` | Shell-owned infrastructure boundary. |
| `admin_layout_shared/` | Shell-owned infrastructure boundary. |
| `admin_layout_shell/` | Shell-owned infrastructure boundary. |
| `admin_layout_store/` | Shell-owned infrastructure boundary. |
| `admin_layout_types/` | Shell-owned infrastructure boundary. |
| `admin_layout_utils/` | Shell-owned infrastructure boundary. |

## Approved Infrastructure Classification
`admin_layout/` is explicitly classified as role-shell/application infrastructure for the authenticated Admin container, not as a business feature module. Feature → `admin_layout` imports are permitted only for the shell infrastructure surfaces documented below (shell chrome, zero-business UI primitives, accessibility/feedback providers, route framing, and centralized realtime transport). Business state, APIs, fixtures, and domain behavior must never be imported across that boundary.

## Host Composition Contract — Header Context Slot
The shell remains free of business-feature imports. The `AdminLayout` infrastructure exposes an optional `headerContextSlot` (`ReactNode`) so the host application may compose a role-owned context control, such as the isolated `AdminBranchesHeaderSelector`, into the header without violating the feature dependency firewall. The role package intentionally does not import `admin_branches` into `admin_layout`.

## External Dependencies
- `@/lib/api` for approved application identity/session infrastructure.
- `@/components/ThemeToggle` for the global design-system theme control.
- Next.js routing and server runtime primitives.

## Feature Inventory
| Surface | Evidence |
|---|---|
| `AdminLayoutHeader` | Fixed 64px shell header with route title, controls, and profile navigation. |
| `AdminLayoutSidebar` | Collapsible sidebar and mobile navigation. |
| `AdminLayoutConfirmProvider` | Application-wide confirmation dialog infrastructure. |
| `AdminLayoutToastProvider` | Global deduplicated toast infrastructure. |
| `AdminLayoutDialogAccessibilityProvider` | Dialog focus/keyboard accessibility infrastructure. |
| `AdminLayoutWebSocketProvider` | Single socket.io-client transport boundary using WebSocket only. |
| `AdminLayoutI18nProvider` | Loads merged `en` / `hi` locale bundles. |

## User Flows
### Flow 1: Navigate the Admin shell
1. User selects a shell navigation target.
2. Next.js renders the route owned by the corresponding feature module.
3. Shell chrome remains mounted without importing feature business logic.

### Flow 2: Use shell feedback/keyboard infrastructure
1. User invokes a shell-owned shortcut or action.
2. The shell provider/store performs the infrastructure action.
3. Focus, toast, dialog, and transport cleanup remain deterministic.

## State Map
- Shell UI state is local React state or shell-scoped Zustand.
- Realtime lifecycle is owned by `AdminLayoutWebSocketProvider` and exposed through `useAdminLayoutWebSocketEvent`.
- Business server state must remain in owning feature modules and TanStack Query.

## API Contract Summary
- No business API endpoints are owned by the shell.
- `/api` identity/session calls through approved host infrastructure are allowed only for shell identity/session concerns.

## UI Data Requirements
- Header route title/subtitle keys.
- Sidebar navigation groups.
- Toast, confirmation, density, command palette, and keyboard-shortcut controls.

## Permissions and Security
- The consuming application remains authoritative for authentication and authorization.
- The shell must not infer business permissions by importing sibling feature logic.

## Loading, Empty, and Error States
- Shell feedback providers own infrastructure failures.
- Individual feature routes own feature loading/empty/error states.

## Edge Cases and AI Warnings
- Never import a sibling business feature into shell UI components to DRY code.
- Never move feature business state into the role shell.
- WebSocket transport must remain socket.io-client with `transports: ["websocket"]`; do not replace it with native WebSocket, SSE, or polling fallback.

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `AdminLayoutConfirmModal.tsx` | Shell infrastructure component/provider. |
| `AdminLayoutConfirmProvider.tsx` | Shell infrastructure component/provider. |
| `AdminLayoutDialogAccessibilityProvider.tsx` | Shell infrastructure component/provider. |
| `AdminLayoutToast.tsx` | Shell infrastructure component/provider. |
| `AdminLayoutToastBridge.tsx` | Shell infrastructure component/provider. |
| `AdminLayoutToastProvider.tsx` | Shell infrastructure component/provider. |
| `AdminLayoutI18nProvider.tsx` | Shell infrastructure component/provider. |
| `AdminLayoutDensityToggle.tsx` | Shell infrastructure component/provider. |
| `AdminLayoutErrorFallback.tsx` | Shell infrastructure component/provider. |
| `AdminLayoutKeyboardShortcuts.tsx` | Shell infrastructure component/provider. |
| `AdminLayoutPagination.tsx` | Shell infrastructure component/provider. |
| `AdminLayoutStatCard.tsx` | Shell infrastructure component/provider. |
| `AdminLayoutTableSkeleton.tsx` | Shell infrastructure component/provider. |
| `AdminLayoutWebSocketProvider.tsx` | Shell infrastructure component/provider. |
| `AdminLayoutCommandPalette.tsx` | Shell infrastructure component/provider. |
| `AdminLayoutProgressBar.tsx` | Shell infrastructure component/provider. |
| `AdminLayoutSearchableDropdown.tsx` | Shell infrastructure component/provider. |
| `AdminLayout.tsx` | Shell infrastructure component/provider. |
| `AdminLayoutDensityProvider.tsx` | Shell infrastructure component/provider. |
| `AdminLayoutHeader.tsx` | Shell infrastructure component/provider. |
| `AdminLayoutHeaderProfile.tsx` | Shell infrastructure component/provider. |
| `AdminLayoutNotFound.tsx` | Shell infrastructure component/provider. |
| `AdminLayoutResponsiveTableProvider.tsx` | Shell infrastructure component/provider. |
| `AdminLayoutSidebar.tsx` | Shell infrastructure component/provider. |


### Design-System Persistence Boundary

The shell exposes the documented comfortable/compact density toggle. Persistence of that user preference is **BLOCKED BY SUPPLIED SCOPE** because this role-only archive does not contain the host application's approved persistence utility required by the global design system. No direct browser storage access is introduced. The consuming application must wire the approved persistence utility at host integration time.

## Rule Compliance Checklist
- [x] Role shell contains infrastructure only.
- [x] No sibling business imports in shell UI components.
- [x] WebSocket transport is centralized and WebSocket-only through socket.io-client.
- [x] Locale sources are module-prefixed.
- [x] No direct business server state is stored by the shell.
- [ ] Host runtime/build/security gates remain NOT VERIFIED without the consuming application configuration.

## Component Tree

`admin_layout_components/`
- No module-owned component directory exists.

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_layout_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.
