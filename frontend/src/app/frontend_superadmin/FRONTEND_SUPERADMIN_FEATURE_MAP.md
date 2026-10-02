# frontend_superadmin — Role Container Overview

## Role Purpose
`frontend_superadmin` is the role container for the Superadmin shell and navigation surface. It owns role-specific navigation groups, labels, shell composition, and role-level infrastructure boundaries. It does **not** own feature business data, business status registries, feature APIs, feature-specific stores, or sibling-module business logic.

## Feature Modules
The role contains independently repairable business modules including gyms, plans, affiliates, analytics, broadcasts, compliance, coupons, dashboard, features, global audit, integrations, invoices, messaging, profile, reports, settings, system operations, team, tickets, usage meters, and white labeling. Each module owns its own UI, hooks, state, API clients, schemas, types, mocks, tests, and documentation.

## Role-Level Responsibilities
- Sidebar/navigation labels and grouping.
- Superadmin header/shell presentation.
- Role-level providers and framework/application plumbing that are explicitly global to this role.
- No feature-specific business configuration or API orchestration.

## AI Repair Boundary
A normal business repair must start from the owning `superadmin_*` feature folder. Do not move business code into this role container merely to reduce duplication. Cross-feature business imports remain forbidden.

## Approved External Dependencies
Role modules may consume approved global UI primitives, application transport, authentication/session infrastructure, logging, configuration, and the Superadmin layout infrastructure when documented by the consuming feature.

## Forbidden Patterns
- No feature business fixtures in the role root.
- No global business status registry.
- No sibling-module API service imports.
- No role-wide business dumping folder.
- No feature-specific Zustand store in the role root.
