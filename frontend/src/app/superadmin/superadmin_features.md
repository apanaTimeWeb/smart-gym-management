# Superadmin — Role Feature Map

## Module Purpose
The Superadmin role owns global SaaS tenant operations, financial controls, system health, messaging, support, configuration, and operational audit surfaces. The role operates across the feature modules listed below while business behavior remains module-owned for repair isolation. This document is the role-level index; feature-specific details live in each module's `[module]_features.md` file. The role does not own backend implementation or sibling-feature business logic.

## Active Feature Routes

| Feature | Route | Primary Surface |
|---|---|---|
| Analytics | `/superadmin/analytics` | Analytics client |
| Backups | `/superadmin/backups` | Backup schedule, restore, health |
| Branches | `/superadmin/branches` | Branch management |
| Broadcasts | `/superadmin/broadcasts` | Broadcast composition and delivery |
| Cancellations | `/superadmin/cancellations` | Cancellation alerts and retention |
| Compliance | `/superadmin/compliance` | Compliance monitoring |
| Coupons | `/superadmin/coupons` | Coupon management and redemptions |
| Dashboard | `/superadmin/dashboard` | SaaS operating dashboard |
| Features | `/superadmin/features` | Feature flag/rollout management |
| Franchises | `/superadmin/franchises` | Franchise operations |
| Global Audit | `/superadmin/global-audit` | Audit ledger |
| Gyms | `/superadmin/gyms` | Tenant management and gym detail |
| Infrastructure | `/superadmin/infrastructure` | Tenant/system infrastructure |
| Integrations | `/superadmin/integrations` | Integration status |
| Invoices | `/superadmin/invoices` | Billing/invoice operations |
| Jobs | `/superadmin/jobs` | Background job operations |
| Messaging | `/superadmin/messaging` | Messaging operations |
| Migrations | `/superadmin/migrations` | Migration operations |
| Offboarding | `/superadmin/offboarding` | Offboarding queue |
| Onboarding | `/superadmin/onboarding` | Tenant onboarding |
| Plans | `/superadmin/plans` | Plan management |
| Profile | `/superadmin/profile` | Superadmin profile |
| Reports | `/superadmin/reports` | Reporting |
| Segments | `/superadmin/segments` | Tenant segments |
| Settings | `/superadmin/settings` | Platform settings |
| System | `/superadmin/system` | System controls |
| Team | `/superadmin/team` | Superadmin team |
| Tickets | `/superadmin/tickets` | Support tickets |
| Usage Meters | `/superadmin/usage-meters` | Usage tracking |

## Active Route Tree Rule
Each route page mounts one canonical client tree and one query/data-source family. Legacy page-level `V1Client` components are removed from the release tree, so active routes do not carry parallel base + V1 presentations.

## Approved External Dependencies

### Application Infrastructure
- `@/lib/*` transport/formatting infrastructure as explicitly imported by feature modules.
- `@/components/*` zero-business UI primitives where explicitly imported.
- `superadmin_components/SuperadminLayout` and other role-shell infrastructure only for navigation, providers, and generic interaction primitives.

### Business Feature Dependencies
- None as a role-wide business rule. Cross-feature reuse should occur through approved infrastructure only.

### Role-Level Business Dependencies
- None.
