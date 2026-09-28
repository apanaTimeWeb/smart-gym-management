// RESPONSIBILITY: Represents exhaustion of the global tenant database connection-pool budget.
// FLOW: Tenant DataSource allocation → budget guard → CoreTenantPoolBudgetException → controlled infrastructure failure.

import { HttpStatus } from '@nestjs/common';
import { CoreDomainException } from '@/backend_trainer/backend_core/core_errors/core-domain.exception';


/**
 * Intent: Defines the CoreTenantPoolBudgetException boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class CoreTenantPoolBudgetException extends CoreDomainException {
  constructor() { super('CORE.TENANT.POOL_BUDGET_EXCEEDED', 'CORE.TENANT.POOL_BUDGET_EXCEEDED', HttpStatus.SERVICE_UNAVAILABLE); }
}
