# Superadmin Repair Manifest

Scope: Superadmin module only.

This release specifically addresses missing-data paths in addition to the architecture contract: dashboard geography data, branch schema/data alignment, tenant dropdown endpoints for broadcasts/features/infrastructure/invoices, current-dated mock records for date-filtered demo views, and Infrastructure status filter correctness.

No unrelated role business modules were modified.


## Role and communication boundary
Superadmin communication is platform-to-tenant only. WhatsApp recipients are limited to tenant owners, tenant admins, and tenant managers. Gym-member communication belongs to Admin / Manager modules and must not be added to Superadmin audiences, templates, recipient records, or personalization variables.

## Demo-data resilience
Every Superadmin page must remain demonstrable without a live backend by using module-owned MSW handlers and fixtures. Production/API failures must remain failures; do not add client-level fake business-data fallbacks. The host application's MSW bootstrap may register these handlers, but feature mock data remains physically inside the owning Superadmin feature.
