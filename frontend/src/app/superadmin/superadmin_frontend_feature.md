# Superadmin Module

## Overview
This module acts as the "Master Control Panel" for the Multi-Tenant SaaS platform. It is strictly isolated from the ERP module and is intended exclusively for the platform owners (Superadmins).

## Responsibilities
- **Tenant Provisioning**: Onboarding new gyms (creates isolated databases).
- **Tenant Management**: Suspending tenants, ghost logging in, viewing SaaS metrics.
- **System Health**: Monitoring database migration status across all 50+ isolated tenant databases.
- **Global Audit**: Viewing a cross-tenant audit log of critical administrative actions.

## File Structure
- `superadmin_components/`: Reusable UI components specific to SaaS (Header, Sidebar, Layout).
- `superadmin_types/`: Types strictly related to SaaS billing, tenants, and global logs.
- `superadmin_utils/`: Constants, validation schemas, and formatters for the SaaS dashboard.
- `superadmin_hooks/`: (To be created) Custom hooks for fetching cross-tenant data.

## State Management
- Currently relies on `SuperadminSharedConstants.ts` for dummy data.
- When backend is connected, use React Query inside `superadmin_hooks` to fetch data, rather than calling `fetch()` directly in the UI components.

## Routing
Managed centrally in `superadmin_url_config.ts`. All routes are prefixed with `/superadmin`.
