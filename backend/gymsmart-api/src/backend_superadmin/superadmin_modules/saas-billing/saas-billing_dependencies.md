# saas-billing Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/backend_superadmin/saas-billing/coupons/coupons-command.controller`
- `@/modules/backend_superadmin/saas-billing/coupons/coupons-query.controller`
- `@/modules/backend_superadmin/saas-billing/coupons/coupons-special.controller`
- `@/modules/backend_superadmin/saas-billing/coupons/coupons.entity`
- `@/modules/backend_superadmin/saas-billing/coupons/coupons.mapper`
- `@/modules/backend_superadmin/saas-billing/coupons/coupons.module`
- `@/modules/backend_superadmin/saas-billing/coupons/coupons.repository`
- `@/modules/backend_superadmin/saas-billing/coupons/dtos/coupons-create.dto`
- `@/modules/backend_superadmin/saas-billing/coupons/dtos/coupons-query.dto`
- `@/modules/backend_superadmin/saas-billing/coupons/dtos/coupons-update.dto`
- `@/modules/backend_superadmin/saas-billing/coupons/services/coupons-create.service`
- `@/modules/backend_superadmin/saas-billing/coupons/services/coupons-delete.service`
- `@/modules/backend_superadmin/saas-billing/coupons/services/coupons-find.service`
- `@/modules/backend_superadmin/saas-billing/coupons/services/coupons-list.service`
- `@/modules/backend_superadmin/saas-billing/coupons/services/coupons-redemptions.service`
- `@/modules/backend_superadmin/saas-billing/coupons/services/coupons-restore.service`
- `@/modules/backend_superadmin/saas-billing/coupons/services/coupons-status.service`
- `@/modules/backend_superadmin/saas-billing/coupons/services/coupons-update.service`
- `@/modules/backend_superadmin/saas-billing/coupons/types/coupons.interfaces`
- `@/modules/backend_superadmin/saas-billing/invoices/dtos/invoices-create.dto`
- `@/modules/backend_superadmin/saas-billing/invoices/dtos/invoices-query.dto`
- `@/modules/backend_superadmin/saas-billing/invoices/dtos/invoices-update.dto`
- `@/modules/backend_superadmin/saas-billing/invoices/invoices-command.controller`
- `@/modules/backend_superadmin/saas-billing/invoices/invoices-contract-snapshot.entity`
- `@/modules/backend_superadmin/saas-billing/invoices/invoices-contract-snapshot.repository`
- `@/modules/backend_superadmin/saas-billing/invoices/invoices-query.controller`
- `@/modules/backend_superadmin/saas-billing/invoices/invoices-recovery-center-response.dto.ts`
- `@/modules/backend_superadmin/saas-billing/invoices/invoices-special.controller`
- `@/modules/backend_superadmin/saas-billing/invoices/invoices.constants`
- `@/modules/backend_superadmin/saas-billing/invoices/invoices.entity`
- `@/modules/backend_superadmin/saas-billing/invoices/invoices.mapper`
- `@/modules/backend_superadmin/saas-billing/invoices/invoices.module`
- `@/modules/backend_superadmin/saas-billing/invoices/invoices.repository`
- `@/modules/backend_superadmin/saas-billing/invoices/services/invoices-create.service`
- `@/modules/backend_superadmin/saas-billing/invoices/services/invoices-delete.service`
- `@/modules/backend_superadmin/saas-billing/invoices/services/invoices-find.service`
- `@/modules/backend_superadmin/saas-billing/invoices/services/invoices-list.service`
- `@/modules/backend_superadmin/saas-billing/invoices/services/invoices-manual-payment.service`
- `@/modules/backend_superadmin/saas-billing/invoices/services/invoices-recovery-center.service`
- `@/modules/backend_superadmin/saas-billing/invoices/services/invoices-resend.service`
- `@/modules/backend_superadmin/saas-billing/invoices/services/invoices-status.service`
- `@/modules/backend_superadmin/saas-billing/invoices/services/invoices-update.service`
- `@/modules/backend_superadmin/saas-billing/invoices/types/invoices.interfaces`
- `@/modules/backend_superadmin/saas-billing/plans/dtos/plans-create.dto`
- `@/modules/backend_superadmin/saas-billing/plans/dtos/plans-query.dto`
- `@/modules/backend_superadmin/saas-billing/plans/dtos/plans-update.dto`
- `@/modules/backend_superadmin/saas-billing/plans/plans-business-controls-response.dto.ts`
- `@/modules/backend_superadmin/saas-billing/plans/plans-command.controller`
- `@/modules/backend_superadmin/saas-billing/plans/plans-contract-snapshot.entity`
- `@/modules/backend_superadmin/saas-billing/plans/plans-contract-snapshot.repository`
- `@/modules/backend_superadmin/saas-billing/plans/plans-query.controller`
- `@/modules/backend_superadmin/saas-billing/plans/plans-query.controller`
- `@/modules/backend_superadmin/saas-billing/plans/plans.constants`
- `@/modules/backend_superadmin/saas-billing/plans/plans.entity`
- `@/modules/backend_superadmin/saas-billing/plans/plans.mapper`
- `@/modules/backend_superadmin/saas-billing/plans/plans.module`
- `@/modules/backend_superadmin/saas-billing/plans/plans.repository`
- `@/modules/backend_superadmin/saas-billing/plans/services/plans-business-controls.service`
- `@/modules/backend_superadmin/saas-billing/plans/services/plans-create.service`
- `@/modules/backend_superadmin/saas-billing/plans/services/plans-delete.service`
- `@/modules/backend_superadmin/saas-billing/plans/services/plans-find.service`
- `@/modules/backend_superadmin/saas-billing/plans/services/plans-list.service`
- `@/modules/backend_superadmin/saas-billing/plans/services/plans-update.service`
- `@/modules/backend_superadmin/saas-billing/plans/types/plans.interfaces`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.