# Manager Role — Feature Map (v12-fix)

## Scope and Repair Boundary
`frontend_manager/` is the Manager role container. It owns role-specific navigation and role-level application infrastructure while every business capability remains in exactly one feature module. The default AI repair boundary is the individual feature module, not the entire role container.

## Canonical Business Modules
22 canonical Manager business feature modules are present, each with its own `page.tsx`, loading/error/not-found surfaces where applicable, prefixed component/hooks/API/types/schemas/constants/store/utils/tests/mocks/locales folders, feature map, forbidden patterns, theme contract, and URL config.

| Module | Route | Ownership summary |
|---|---|---|
| manager_attendance | `/manager/attendance` | Member/staff attendance, check-in, history and attendance KPIs |
| manager_communications | `/manager/communications` | Manual member communications, campaigns, automations and churn recovery |
| manager_dashboard | `/manager/dashboard` | Manager operational dashboard, KPIs and expiring/pending summaries |
| manager_expenses | `/manager/expenses` | Expense CRUD, filters and payment/status workflows |
| manager_finance | `/manager/finance` | Finance ledger, payment records, summaries and filters |
| manager_grievance | `/manager/grievance` | Complaint/grievance logging and resolution workflow |
| manager_hr | `/manager/hr` | Staff, payroll, advances, dues and HR payments |
| manager_inquiries | `/manager/inquiries` | Lead/inquiry management, follow-ups, messaging and conversion |
| manager_library | `/manager/library` | Diet/exercise library management |
| manager_maintenance | `/manager/maintenance` | Maintenance issue logging and operational tracking |
| manager_members | `/manager/members` | Member lifecycle, profile, membership, payment and renewal workflows |
| manager_notifications | `/manager/notifications` | Manager notification list/read state |
| manager_plans | `/manager/plans` | Plan visibility and manager plan-change requests |
| manager_profile | `/manager/profile` | Manager profile and password workflows |
| manager_pt | `/manager/pt` | PT assignment/session workflows |
| manager_referrals | `/manager/referrals` | Referral capture and reward workflows |
| manager_reports | `/manager/reports` | KPI/chart/table reports; no Manager-role tenant export/download |
| manager_sales | `/manager/sales` | Sales overview, memberships and pending payments |
| manager_schedule | `/manager/schedule` | Trainer shifts and schedule management |
| manager_settings | `/manager/settings` | Manager settings and role-local configuration |
| manager_store | `/manager/store` | Products, orders, store summaries and messaging links |
| manager_workout | `/manager/workout` | Workout plans, exercises and assignments |

## Role-Level Infrastructure
`manager_navigation/` owns Manager sidebar/header/command-palette navigation metadata and shell presentation. `manager_infrastructure/` owns role-level infrastructure that is not business-module behavior (runtime configuration, permission gate adapter, Query provider, dialog focus trap, unsaved-changes guard, debounce utilities, HTTP status/idempotency/money helpers, and toast service). These folders are not business buckets and must not accumulate feature-specific logic.

## Global Zero-Business UI
`components/ui/` contains only zero-business primitives used by the supplied Manager role snapshot (confirmation UI, empty state, pagination, searchable dropdown, stat card, table skeleton, toast, tooltip, and theme toggle). Business-aware components remain inside their owning feature.

## Isolation Rules
- No `frontend_manager/manager_components/` role-wide business bucket exists.
- A Manager feature must not import another Manager feature's business components, hooks, stores, API services, types, schemas, constants, fixtures, handlers or tests.
- Feature duplication is acceptable when it improves AI context isolation and bounded change blast radius.
- Feature API calls go through `@/lib/api`; global application infrastructure is outside this role snapshot.
- Each module has exactly one canonical `_url_config.ts`; components and API services do not embed duplicate URL literals.

## Current Verification Boundary
Static source verification in this ZIP can validate filesystem structure, naming, import closure, syntax parsing, theme-pattern safety, interactive test IDs, and many architectural invariants. Host-level typecheck/lint/build/browser E2E, dependency installation, `globals.css`/Tailwind mapping, middleware/authorization, CI security gates, CODEOWNERS and root `@/lib/*` implementations require the consuming application and therefore remain explicitly not verified in this role-only artifact.

## v12-fix Repair Synchronization — 2026-10-06
- Input artifact: `frontend-manager-v11-fix.zip`; output artifact: `frontend-manager-v12-fix.zip`.
- Re-audited the complete supplied Manager role snapshot after the v11 baseline rather than relying on the prior audit verdict alone.
- Repaired verified architecture/design issues found in the source, including arbitrary Tailwind values, direct query-key literals, date serialization outside API boundaries, URL constant naming duplication, inconsistent business constant prefixes, formatter readability, and semantic text/background mismatches.
- Normalized the E2E directory to `playwright_e2e/` and synchronized current integration/version documentation.
- Preserved feature isolation, module ownership, API/mock contracts, and previously passing behavior wherever no documented defect required change.
