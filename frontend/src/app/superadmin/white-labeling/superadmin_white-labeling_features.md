# Superadmin White-labeling — Feature Map

## Module Purpose
The White-labeling module allows Superadmins to monitor and manage custom domain configurations and white-label branding (logos, theme colors) for Gyms (tenants). It enables the SaaS to offer premium branded experiences to enterprise gyms, handling domain status (pending, active, failed) and SSL provisioning statuses.

## State Pattern
- **Server State**: Managed exclusively by TanStack Query using the `['superadmin', 'white-labeling']` cache key root.
- **Client State**: Managed by Zustand (`useSuperadminWhiteLabelingStore`) for modal toggles, search, and local filters.
- **URL State**: N/A for initial implementation; list filtering relies on Zustand.

## API Contract
- `superadmin_white_labeling_url_config.ts` owns the route definitions.
- All backend responses are validated using Zod schemas (`SuperadminWhiteLabelingSchemas.ts`).
- MSW Mocks guarantee the completeness of the data contract.

## Edge Cases / AI Warnings
1. Never bypass the `AdminConfirmProvider` for destructive or critical actions (e.g., rejecting a domain setup).
2. Never import business logic from other Superadmin modules or other roles.
3. MSW fixtures must accurately represent DNS validation statuses (e.g., CNAME mismatch).
