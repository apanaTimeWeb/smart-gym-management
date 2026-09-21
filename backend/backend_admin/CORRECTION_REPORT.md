# Corrected Admin Backend — Correction Report

## Source baseline
This package was corrected against the supplied Admin frontend contract and the supplied backend architecture documentation. The frontend was used only for backend requirement discovery; the backend architecture document remains the normative architecture source.

## High-impact corrections

1. **Admin subscriptions now use the master billing database**
   - Current subscription, plans, invoices, and payment methods are read from `subscriptions_master`, `plans_master`, `invoices_master`, and `payment_methods_master` for the authenticated tenant.
   - Plan upgrades and auto-renew mutations execute inside master-database transactions.
   - Payment-method defaulting is atomic and tenant-scoped.
   - Payment-method removal is a soft deactivation (`is_active=false`) rather than a hard delete.

2. **Subscription seed data was moved to the master database**
   - Deterministic starter/growth/pro/enterprise plans are seeded.
   - Demo subscription, invoice, and payment-method state are seeded for the configured tenant.

3. **Usage plan upgrade requests now use `upgrade_requests_master`**
   - Requests resolve an active master plan by name and persist a tenant-scoped upgrade request.
   - Response matches the frontend's `requestId`, `planName`, `status`, and `requestedAt` contract.

4. **Sensitive HR fields are encrypted at rest**
   - `aadhaar`, `bankAccountNumber`, and `medicalNotes` are encrypted with AES-256-GCM before persistence.
   - Admin HR mapper decrypts these values only when constructing an authorized response.
   - The encryption secret is resolved from validated `ConfigService`, not raw `process.env` inside the service.

5. **Audit Logs now read the actual immutable audit trail**
   - The Admin audit-log feature no longer treats a feature JSON snapshot as audit truth.
   - List filtering/pagination and KPI counts query `audit_logs` directly.
   - Responses are normalized to the actual frontend `AuditLog` schema.
   - Existing mutation writers were assigned frontend-compatible broad audit-module categories.

6. **Centralized Redis configuration**
   - Core Redis now resolves `REDIS_URL` through the validated Nest `ConfigService`.

7. **Subscription command HTTP validation**
   - Primitive UUID request bodies are validated with `ParseUUIDPipe`, preserving the current frontend request serialization while enforcing UUID shape at the controller boundary.

8. **Master payment-method schema hardening**
   - Added `payment_methods_master.is_active` and a `(tenant_id, is_active)` index via a forward-only migration.

## Verification status

A live NestJS/database test run could not be performed in this environment because the supplied archive has no `node_modules` and dependency installation could not complete offline. The corrected archive therefore does **not** claim live DB startup, Jest, or pytest E2E execution.

The source was still checked with targeted static/syntax scans after modification. Any remaining environment-dependent verification must be run in a normal networked development/CI environment with dependencies installed.
