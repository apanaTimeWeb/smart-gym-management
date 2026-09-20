# Manager Role — Feature Map

## 1. Scope and Repair Boundary

`manager/` is the Manager role container. Business work is intentionally split into independently understandable feature modules. For a feature-specific repair, the owning feature directory is the default AI context and write boundary; the role container is not the normal repair boundary.

Primary feature modules:

`dashboard/`, `members/`, `attendance/`, `sales/`, `hr/`, `schedule/`, `expenses/`, `store/`, `library/`, `workout/`, `plans/`, `finance/`, `inquiries/`, `referrals/`, `reports/`, `notifications/`, `communications/`, `profile/`, `settings/`, `pt/`, `grievance/`, `maintenance/`.

## 2. Role-Container Responsibilities

| Path | Responsibility |
| --- | --- |
| `manager_components/ManagerShared/` | Zero-business UI primitives used by Manager screens, such as pagination and stat-card presentation. |
| `manager_components/ManagerFeedback/` | Generic Manager feedback/integration UI. Business destinations and external URLs remain owned by the consuming feature URL config. |
| `manager_infrastructure/` | Manager-role infrastructure only: runtime configuration, permission bridge, toast/confirmation infrastructure, unsaved-change guard, idempotency and generic money adapters. |
| `manager_mocks/` | Manager MSW bootstrap/registration only; feature fixtures and handlers remain inside their owning feature. |
| `manager_e2e/` | Manager end-to-end specifications; execution belongs to the host application runtime. |
| `layout.tsx` | Framework-reserved Manager route shell entry. |

Business behavior MUST remain inside the owning feature module.

## 3. Feature Inventory

| Feature | Route | Primary responsibility |
| --- | --- | --- |
| Dashboard | `/manager/dashboard` | Manager KPI overview, recent records, charts, alerts. |
| Members | `/manager/members` | Member list, create/edit, payments, renewal, profile/detail flows. |
| Attendance | `/manager/attendance` | Attendance list, search/filter/date flow, check-in/out, QR scanner entry. |
| Sales | `/manager/sales` | Membership sales, pending payments, revenue reporting. |
| HR | `/manager/hr` | Staff management, attendance, payroll. |
| Schedule | `/manager/schedule` | Trainer shifts, availability, schedule planning. |
| Expenses | `/manager/expenses` | Expense list, create/edit/delete/pay, analytics and export. |
| Store | `/manager/store` | Product inventory and order workflows. |
| Library | `/manager/library` | Diet-plan library and assignment workflows. |
| Workout | `/manager/workout` | Workout plans, exercise library and assignment workflows. |
| Plans | `/manager/plans` | Membership plan visibility and documented plan-change request flow. |
| Finance | `/manager/finance` | Payment ledger, financial summaries and revenue/expense chart. |
| Inquiries | `/manager/inquiries` | Lead/inquiry lifecycle, follow-up, conversion. |
| Referrals | `/manager/referrals` | Referral tracking and rewards. |
| Reports | `/manager/reports` | Revenue, attendance, member, expense reporting and export. |
| Notifications | `/manager/notifications` | Manager alerts, reminders and notification actions. |
| Communications | `/manager/communications` | Campaign composition, recipient selection and manual per-recipient messaging. |
| Profile | `/manager/profile` | Manager profile and account information. |
| Settings | `/manager/settings` | Manager-facing operational/settings controls. |
| PT | `/manager/pt` | Personal-training assignment/workflow surface. |
| Grievance | `/manager/grievance` | Member complaint queue, search, create and resolve workflows. |
| Maintenance | `/manager/maintenance` | Equipment/facility issue queue, create and resolve workflows. |
| QR scanner | `/manager/attendance?qrScanner=open` | Attendance-owned QR scanner modal; scanner business logic is owned by `attendance/`. |

## 4. Data and State Architecture

Server/async data is owned by TanStack Query inside the owning feature query/mutation layer. Context is not used as a server-state store. This repaired package contains no legacy feature `*Context.tsx` business adapters; feature server state is owned by TanStack Query and feature UI state is owned locally or by module-scoped Zustand.

UI-only shared state is module-scoped Zustand. Strictly private state stays in component-local `useState`/form state. URL-backed filters, tabs, pages and search values remain in the URL when the feature contract requires navigation/deep-link persistence.

Authoritative request flow:

`Feature UI → feature hook → feature API client → global transport → real backend`

Development/test flow:

`Feature UI → feature hook → feature API client → feature-owned MSW handler → feature-owned fixture`

## 5. API and URL Ownership

Every feature has one `<feature>_url_config.ts` file containing internal routes and external API/integration URLs used by that feature. API functions live in the feature API layer and call the approved global transport through absolute imports.

External WhatsApp destinations are configured by the consuming feature. Shared messaging UI receives a URL builder and does not own business URLs.

## 6. Mock/MSW Contract

Feature-specific fixtures and handlers live inside the owning feature. Manager-level MSW files only register/compose them.

Mocks must contain enough realistic variation to exercise the UI: multiple records, status/date/value variation, nullable values, searchable/filterable/sortable fields, pagination data, empty responses and deterministic error responses. Mutation mocks must visibly change subsequent reads when the feature supports create/update/delete/archive/restore behavior.

## 7. Permissions and Security

Manager UI consumes the approved global permission/session infrastructure. Feature-specific permission decisions are declared by the owning feature. Frontend permission visibility is UI protection only; backend authorization remains authoritative.

Destructive or irreversible Manager actions use the approved confirmation infrastructure. Financial and other non-duplicable mutations must preserve the idempotency-key contract.

## 8. Loading, Empty and Error Behavior

Route-level `loading.tsx` and `error.tsx` remain framework-reserved files and are owned by their route segments. Interactive sections use feature-local loading/empty/error states where applicable. Error UI must avoid raw backend/internal details and expose a meaningful retry/recovery action when retry is supported.

## 9. Design-System Contract

All Manager feature UI consumes the global Smart Gym 360 semantic theme. Authenticated ERP surfaces do not use aggressive gradients. Raw Tailwind colors and arbitrary theme values are forbidden in feature JSX. Chart series use the documented chart semantic tokens where the chart library requires direct color configuration.

External brand colors are applied through the documented semantic social-brand token mapping; feature code does not hardcode the provider color.

The Manager shell uses the documented layout geometry and z-index hierarchy. Tables, forms, dialogs, loading states, buttons and responsive interaction patterns follow the global design-system document.

## 10. Feature Documentation Contract

Every feature should maintain:

`<feature>_features.md`
`<feature>_forbidden.md`
`<feature>_theme_contract.md`
`<feature>_url_config.ts`

Only files actually required by that feature need corresponding subfolders, but feature-specific business ownership must remain local.

## 11. Current Repair Verification Snapshot

- Route/page inventory: 22 Manager route pages discovered.
- `grievance/` and `maintenance/` now have feature maps, forbidden docs, theme contracts and framework route-state files.
- Feature URL ownership is used by the Manager navigation composition.
- Mutable grievance/maintenance mocks expose reset functions; HR, Members payments and Plans membership mocks now maintain later-readable state.
- Static rule verification is recorded in `manager_fix_v1.md`; host runtime checks remain separate and are not claimed here.

## 12. Host-Application Verification Boundary

The supplied package is a role/module snapshot, not the complete Next.js application root. The snapshot does not contain the consuming application's `package.json`, lockfile, root `tsconfig`, Next.js configuration, Tailwind configuration, installed runtime dependencies, CI environment, or browser runtime.

Therefore full host-level `build`, real `tsc`, ESLint, Vitest execution, Playwright browser execution, dependency/security scans, and production bundle verification must be run in the consuming application repository. These checks must not be represented as verified from this package alone.

## Approved External Dependencies

- Global framework/application infrastructure documented by the architecture standard may be used when required.
- Approved zero-business UI primitives may be imported from Manager application infrastructure.
- Sibling feature business logic, state, API services, fixtures, and tests are not dependencies.

