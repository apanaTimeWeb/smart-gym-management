# Superadmin — Role Feature Map

## Module Purpose
The `superadmin` role is the role container for global SaaS administration. Business behavior remains inside individual feature modules; this file maps the active route surface and preserves the AI isolation boundary.

## Actual Route Inventory

| Route | Directory |
|---|---|
| `/affiliates` | `affiliates` |
| `/analytics` | `analytics` |
| `/broadcasts` | `broadcasts` |
| `/compliance` | `compliance` |
| `/dashboard` | `dashboard` |
| `/features` | `features` |
| `/global-audit` | `global-audit` |
| `/gyms/[id]` | `gyms/[id]` |
| `/gyms/add` | `gyms/add` |
| `/gyms` | `gyms` |
| `/integrations` | `integrations` |
| `/messaging` | `messaging` |
| `/` | `.` |
| `/profile` | `profile` |
| `/reports` | `reports` |
| `/saas-billing/coupons` | `saas-billing/coupons` |
| `/saas-billing/invoices` | `saas-billing/invoices` |
| `/saas-billing/plans` | `saas-billing/plans` |
| `/settings` | `settings` |
| `/system-ops/backups` | `system-ops/backups` |
| `/system-ops/infrastructure` | `system-ops/infrastructure` |
| `/system-ops/jobs` | `system-ops/jobs` |
| `/system-ops/migrations` | `system-ops/migrations` |
| `/system-ops` | `system-ops` |
| `/team` | `team` |
| `/tickets` | `tickets` |
| `/usage-meters` | `usage-meters` |
| `/white-labeling` | `white-labeling` |

## Role / Feature Boundary

- Role container: `superadmin/`
- Feature repair unit: individual business feature directory.
- Business Feature Dependencies: **None unless explicitly documented by the owning feature.**
- Role-Level Business Dependencies: **None.**
- Shared infrastructure must remain zero-business and explicitly approved by the architecture documentation.

## Completion Contract

A route is not complete merely because it renders. Its actionable controls, state transitions, loading/empty/error/retry paths, navigation/return flows, mock/API behavior, permissions, accessibility, responsive behavior, and documented terminal states must be verified.
