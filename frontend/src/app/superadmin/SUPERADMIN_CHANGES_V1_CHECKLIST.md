# Smart Gym 360 — Superadmin Changes V1 Checklist — Final Repair Pass

## Scope
This package contains the complete `/superadmin` module from the previous V1 baseline plus the V1 repair pass. No Admin, Manager, Trainer, or other business-role module is changed by this package. The design and architecture rules are governed by the attached frontend development instruction and global design system.

## Business Feature Checklist

| # | Superadmin page | Addition | User-facing simple naming | Status |
|---|---|---|---|---|
| 1 | Dashboard | Monthly income movement breakdown | `Why monthly income changed` | ✅ Verified |
| 2 | Dashboard | Existing-gym income retention | `Income kept from existing gyms` | ✅ Verified |
| 3 | Dashboard | Gross base-income retention | `Income kept without upgrades` | ✅ Verified |
| 4 | Dashboard | Gym retention | `Gym retention` | ✅ Verified |
| 5 | Dashboard | Revenue/customer loss indicators | `Revenue lost`, `Customer churn` | ✅ Verified |
| 6 | Dashboard | Top and at-risk tenant comparison | `Top & at-risk gyms` | ✅ Verified |
| 7 | Dashboard | Unified critical alerts | `Critical platform alerts` | ✅ Verified |
| 8 | Gyms | Advanced tenant segmentation filters | `Advanced tenant filters` | ✅ Verified |
| 9 | Gyms | Saved filter views | `Saved views` | ✅ Verified |
| 10 | Gyms | Bulk tenant operations | `Bulk actions` | ✅ Verified |
| 11 | Gyms | Tenant comparison sample | `Tenant comparison sample` | ✅ Verified |
| 12 | Gym detail | 360-degree tenant workspace | `Overview`, `Subscription`, `Billing`, `Usage`, `Health`, `Activity`, `Support` | ✅ Verified |
| 13 | Plans | Plan comparison | `Plan comparison` | ✅ Verified |
| 14 | Plans | Price/version history | `Price history` | ✅ Verified |
| 15 | Plans | Paid add-ons | `Add-ons` | ✅ Verified |
| 16 | Plans | Safe plan-change preview | `Plan move preview` | ✅ Verified |
| 17 | Invoices | Failed-payment recovery queue | `Payment recovery queue` | ✅ Verified |
| 18 | Invoices | Recovery timing policy | `Recovery schedule` | ✅ Verified |
| 19 | Invoices | Financial adjustment review | `Refunds, credits & write-offs` | ✅ Verified |
| 20 | Analytics | Income movement | `Income movement` | ✅ Verified |
| 21 | Analytics | Revenue concentration | `Revenue share concentration` | ✅ Verified |
| 22 | Analytics | Retention cohorts | `Cohort retention` | ✅ Verified |
| 23 | Analytics | Product usage/adoption | `Feature adoption` | ✅ Verified |
| 24 | Analytics | Acquisition comparison | `Acquisition source comparison` | ✅ Verified |
| 25 | Reports | Period comparison | `This month vs last month` | ✅ Verified |
| 26 | Reports | Plan/region comparison | `Plan comparison`, `Region comparison` | ✅ Verified |
| 27 | Onboarding | Activation journey | `Activation journey` | ✅ Verified |
| 28 | Onboarding | Activation drop-off view | `Where gyms stall` | ✅ Verified |
| 29 | Onboarding | Activation/conversion trend | `Weekly activation and conversion` | ✅ Verified |
| 30 | Cancellations | Cancellation reasons | `Why gyms leave` | ✅ Verified |
| 31 | Cancellations | Churn by plan | `Churn by plan` | ✅ Verified |
| 32 | Franchises | Franchise 360 comparison | `Franchise comparison` | ✅ Verified |
| 33 | Franchises | Branch comparison | `Branch comparison` | ✅ Verified |
| 34 | Franchises | Franchise financial control | `Franchise financial control` | ✅ Verified |
| 35 | Branches | Network performance scorecard | `Branch scorecard` | ✅ Verified |
| 36 | Messaging | Reusable message templates | `Template library` | ✅ Verified |
| 37 | Messaging | Campaign engagement | `Campaign engagement` | ✅ Verified |
| 38 | Broadcasts | Audience segmentation | `Audience builder` | ✅ Verified |
| 39 | Broadcasts | Channel performance | `Channel results` | ✅ Verified |
| 40 | Broadcasts | Reusable templates | `Reusable templates` | ✅ Verified |
| 41 | Tickets | Operator workload | `Operator workload` | ✅ Verified |
| 42 | Tickets | Backlog aging | `Backlog age` | ✅ Verified |
| 43 | Tickets | Support category view | `Support categories` | ✅ Verified |
| 44 | Features | Percentage/targeted rollout controls | `Rollout control` | ✅ Verified |
| 45 | Features | Platform release history | `Platform release log` | ✅ Verified |
| 46 | Features | Rollback readiness | `Rollback readiness` | ✅ Verified |
| 47 | Infrastructure | API/service endpoint health | `Service endpoint health` | ✅ Verified |
| 48 | Infrastructure | Incident overview | `Recent incidents` | ✅ Verified |
| 49 | Jobs | Queue health | `Queue health` | ✅ Verified |
| 50 | Jobs | Failed/stuck job view | `Stuck jobs`, `Recent job failures` | ✅ Verified |
| 51 | Backups | Backup health by gym | `Backup health by gym` | ✅ Verified |
| 52 | Backups | Restore verification history | `Restore test history` | ✅ Verified |
| 53 | Global audit | Before/after audit view | `Before & after changes` | ✅ Verified |
| 54 | Global audit | Suspicious activity | `Suspicious activity` | ✅ Verified |
| 55 | Settings | Billing controls | `Billing controls` | ✅ Verified |
| 56 | Settings | Security controls | `Security controls` | ✅ Verified |
| 57 | Settings | Data controls | `Data controls` | ✅ Verified |
| 58 | Settings | Communication defaults | `Communication defaults` | ✅ Verified |
| 59 | Team & Access | Internal operator management | `Team Members`, `Role Groups` | ✅ Verified |
| 60 | Team & Access | Superadmin alert preferences | `My Alert Preferences` | ✅ Verified |
| 61 | Integrations | Platform connection health | `Connection Health` | ✅ Verified |
| 62 | Integrations | Webhook delivery review | `Webhook Delivery` | ✅ Verified |
| 63 | Integrations | Tenant developer access | `Tenant developer access`, `Active developer keys` | ✅ Verified |
| 64 | Offboarding | Tenant offboarding queue | `Offboarding Queue` | ✅ Verified |
| 65 | Offboarding | Export/grace/purge policy | `Offboarding Policy` | ✅ Verified |
| 66 | Offboarding | Safety checks for final purge | `Safety Checks` | ✅ Verified |
| 67 | Tax & Compliance | Tax registration coverage | `Tax Details Ready`, `Missing Tax Details` | ✅ Verified |
| 68 | Tax & Compliance | Regional compliance comparison | `Regional Coverage` | ✅ Verified |
| 69 | Tax & Compliance | Compliance document readiness | `Compliance Documents` | ✅ Verified |
| 70 | Saved Segments | Reusable tenant groups | `Saved Groups` | ✅ Verified |
| 71 | Saved Segments | Quick presets | `Quick Presets` | ✅ Verified |
| 72 | Offboarding | Export request visibility | `Export requests` | ✅ Verified |
| 73 | Messaging | Free guided WhatsApp bulk campaign queue | `Smart Bulk WhatsApp`, `Start Bulk WhatsApp Queue`, `Open WhatsApp`, `Mark Sent & Next` | ✅ Verified |
| 74 | Messaging | Reusable WhatsApp outreach templates | `Monthly Fee Reminder`, `Payment Overdue`, `Renewal Reminder`, `Maintenance Notice`, `Service Issue Update`, `New Feature Announcement`, `Holiday & Timing Update`, `Custom Message` | ✅ Verified |
| 75 | Messaging | Audience targeting and gym scope | `All Members`, `Pending Fees`, `Memberships Expiring Soon`, `Inactive Members`, `New Members`, `Tenant Teams`, `All gyms` | ✅ Verified |
| 76 | Messaging | Personalized WhatsApp messages | `{name}`, `{gym_name}`, `{amount}`, `{due_date}`, `{expiry_date}`, `{payment_link}` | ✅ Verified |
| 77 | Messaging | Operator queue tracking | `Waiting`, `Marked sent`, `Skipped`, progress, campaign history | ✅ Verified |

## Repair Issue Checklist

- [x] Gym Detail 360 receives the route gym ID.
- [x] Gym Detail 360 query key contains the actual gym ID.
- [x] Gym Detail 360 API call receives/propagates the gym ID.
- [x] Gym Detail 360 MSW handler requires the requested gym ID and returns tenant-specific fixture data.
- [x] No giant one-line V1 component shortcut remains.
- [x] Every V1 component remains under the hard 300-line ceiling.
- [x] New Team/Integrations/Segments/Offboarding/Compliance tests assert loading, real fixture-backed success, nullable fallback, empty state, and retryable error behavior.
- [x] Nullable V1 fields use the canonical `displayValue()` fallback.
- [x] Status/health presentation in V1 panels uses the Superadmin-owned status mapping instead of inline status color branches.
- [x] The remaining V1 arbitrary Tailwind size value was removed; Lucide keeps the required 18px size through its `size={18}` API.
- [x] Offboarding export requests are rendered from the documented API contract.
- [x] Offboarding summary counters are defined and derived from fixture/API data.
- [x] No V1 component contains hardcoded business fallback data.


## Smart Bulk WhatsApp Repair / Enhancement Checklist

- [x] Free click-to-chat workflow is owned entirely by Superadmin Messaging.
- [x] Template selection auto-fills campaign title and message body.
- [x] Operational templates cover maintenance, service issues, feature announcements, and holiday/timing updates.
- [x] Template selection recommends a matching audience group.
- [x] Audience builder supports all members, payment follow-up, expiry, inactivity, new members, tenant teams, and gym scope.
- [x] WhatsApp-ready and opted-in filtering happens before queue creation.
- [x] Personalized variables are rendered per recipient before a chat is opened.
- [x] WhatsApp click-to-chat URLs are centralized and built by a feature utility.
- [x] Queue actions are explicit: Open WhatsApp, Mark Sent & Next, Skip.
- [x] The UI does not claim that opening a chat proves delivery; operator confirmation is tracked separately.
- [x] Campaign creation has a feature API wrapper, Zod payload validation, fixture, and MSW handler.
- [x] UI, utility, schema, and TanStack Query tests were added for the new workflow.
- [x] New WhatsApp feature files stay below the documented component/type/utility/API ceilings.

## Simple naming rule
Technical SaaS abbreviations remain only where they are required for internal API/type/domain contracts. New V1 UI uses plain language: `Monthly income`, `Income kept from existing gyms`, `Income kept without upgrades`, `Gym retention`, `Revenue lost`, `Acquisition cost recovery`, `Developer keys`, `Extra sign-in`, and `Stuck jobs`.

## Architecture Checklist

- [x] Changes are physically inside `src/app/superadmin/**` only.
- [x] Feature-specific UI/data is Superadmin-owned.
- [x] Module-prefixed folders/files are used for newly added artifacts.
- [x] New server/API data is represented by types, Zod schemas, fixtures, handlers, and API clients.
- [x] TanStack Query is used for new server state.
- [x] Business mock data is not embedded in V1 client components.
- [x] New API routes are centralized in URL config files.
- [x] New V1 mock handlers use the canonical flat `ApiResponse<T>` response envelope.
- [x] No new relative imports.
- [x] No barrel `index.ts` files.
- [x] No production `console.*` calls.
- [x] No `key={index}` / `key={i}` patterns.
- [x] All Superadmin TSX files are below the 300-line ceiling.
- [x] All Superadmin hooks, API files, schema/type files, and utility files are below their documented ceilings.
- [x] Heavy charts use the existing ApexCharts architecture.
- [x] New async sections use structural skeletons and retryable user-safe states.
- [x] New navigation is Superadmin-only.
- [x] Destructive/financial behavior continues to follow the existing confirmation contract.
- [x] New motion uses `motion-safe:` guards.
- [x] New V1 labels avoid difficult SaaS abbreviations in user-facing UI.

## Runtime gate status

Static/source verification is complete for the current 983-file Superadmin tree, including the 19-file Smart Bulk WhatsApp enhancement. A full `npm run build`, ESLint, Vitest, Playwright, dependency scan, and secrets scan could not be executed in this repair container because the supplied working tree does not contain a usable installed dependency tree and npm registry resolution returned `EAI_AGAIN`. This is an environment limitation, not being represented as a passing build.
