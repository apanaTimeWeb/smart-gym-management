# saas-billing Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/backend_superadmin/saas-billing/coupons/coupons-command.controller`
- `@/backend_superadmin/saas-billing/coupons/coupons-query.controller`
- `@/backend_superadmin/saas-billing/coupons/coupons-special.controller`
- `@/backend_superadmin/saas-billing/coupons/coupons.entity`
- `@/backend_superadmin/saas-billing/coupons/coupons.mapper`
- `@/backend_superadmin/saas-billing/coupons/coupons.module`
- `@/backend_superadmin/saas-billing/coupons/coupons.repository`
- `@/backend_superadmin/saas-billing/coupons/dtos/coupons-create.dto`
- `@/backend_superadmin/saas-billing/coupons/dtos/coupons-query.dto`
- `@/backend_superadmin/saas-billing/coupons/dtos/coupons-update.dto`
- `@/backend_superadmin/saas-billing/coupons/services/coupons-create.service`
- `@/backend_superadmin/saas-billing/coupons/services/coupons-delete.service`
- `@/backend_superadmin/saas-billing/coupons/services/coupons-find.service`
- `@/backend_superadmin/saas-billing/coupons/services/coupons-list.service`
- `@/backend_superadmin/saas-billing/coupons/services/coupons-redemptions.service`
- `@/backend_superadmin/saas-billing/coupons/services/coupons-restore.service`
- `@/backend_superadmin/saas-billing/coupons/services/coupons-status.service`
- `@/backend_superadmin/saas-billing/coupons/services/coupons-update.service`
- `@/backend_superadmin/saas-billing/coupons/types/coupons.interfaces`
- `@/backend_superadmin/saas-billing/invoices/dtos/invoices-create.dto`
- `@/backend_superadmin/saas-billing/invoices/dtos/invoices-query.dto`
- `@/backend_superadmin/saas-billing/invoices/dtos/invoices-update.dto`
- `@/backend_superadmin/saas-billing/invoices/invoices-command.controller`
- `@/backend_superadmin/saas-billing/invoices/invoices-contract-snapshot.entity`
- `@/backend_superadmin/saas-billing/invoices/invoices-contract-snapshot.repository`
- `@/backend_superadmin/saas-billing/invoices/invoices-query.controller`
- `@/backend_superadmin/saas-billing/invoices/invoices-recovery-center-response.dto.ts`
- `@/backend_superadmin/saas-billing/invoices/invoices-special.controller`
- `@/backend_superadmin/saas-billing/invoices/invoices.constants`
- `@/backend_superadmin/saas-billing/invoices/invoices.entity`
- `@/backend_superadmin/saas-billing/invoices/invoices.mapper`
- `@/backend_superadmin/saas-billing/invoices/invoices.module`
- `@/backend_superadmin/saas-billing/invoices/invoices.repository`
- `@/backend_superadmin/saas-billing/invoices/services/invoices-create.service`
- `@/backend_superadmin/saas-billing/invoices/services/invoices-delete.service`
- `@/backend_superadmin/saas-billing/invoices/services/invoices-find.service`
- `@/backend_superadmin/saas-billing/invoices/services/invoices-list.service`
- `@/backend_superadmin/saas-billing/invoices/services/invoices-manual-payment.service`
- `@/backend_superadmin/saas-billing/invoices/services/invoices-recovery-center.service`
- `@/backend_superadmin/saas-billing/invoices/services/invoices-resend.service`
- `@/backend_superadmin/saas-billing/invoices/services/invoices-status.service`
- `@/backend_superadmin/saas-billing/invoices/services/invoices-update.service`
- `@/backend_superadmin/saas-billing/invoices/types/invoices.interfaces`
- `@/backend_superadmin/saas-billing/plans/dtos/plans-create.dto`
- `@/backend_superadmin/saas-billing/plans/dtos/plans-query.dto`
- `@/backend_superadmin/saas-billing/plans/dtos/plans-update.dto`
- `@/backend_superadmin/saas-billing/plans/plans-business-controls-response.dto.ts`
- `@/backend_superadmin/saas-billing/plans/plans-command.controller`
- `@/backend_superadmin/saas-billing/plans/plans-contract-snapshot.entity`
- `@/backend_superadmin/saas-billing/plans/plans-contract-snapshot.repository`
- `@/backend_superadmin/saas-billing/plans/plans-query.controller`
- `@/backend_superadmin/saas-billing/plans/plans-query.controller`
- `@/backend_superadmin/saas-billing/plans/plans.constants`
- `@/backend_superadmin/saas-billing/plans/plans.entity`
- `@/backend_superadmin/saas-billing/plans/plans.mapper`
- `@/backend_superadmin/saas-billing/plans/plans.module`
- `@/backend_superadmin/saas-billing/plans/plans.repository`
- `@/backend_superadmin/saas-billing/plans/services/plans-business-controls.service`
- `@/backend_superadmin/saas-billing/plans/services/plans-create.service`
- `@/backend_superadmin/saas-billing/plans/services/plans-delete.service`
- `@/backend_superadmin/saas-billing/plans/services/plans-find.service`
- `@/backend_superadmin/saas-billing/plans/services/plans-list.service`
- `@/backend_superadmin/saas-billing/plans/services/plans-update.service`
- `@/backend_superadmin/saas-billing/plans/types/plans.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.