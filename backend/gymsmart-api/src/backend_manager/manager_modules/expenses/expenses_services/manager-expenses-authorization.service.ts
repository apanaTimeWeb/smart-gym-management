// RESPONSIBILITY: Owns expenses resource-level authorization for Manager routes.
// FLOW: Resource UUID → feature repository → trusted tenant/branch context → allow/deny.
import { ForbiddenException, Injectable } from '@nestjs/common';

import { ManagerCoreRequestContextService } from '@/backend_manager/manager_core/manager_core_context/manager-core-request-context.service';
import type { ManagerCoreResourceAuthorizationPort } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.types';
import { ManagerExpensesRepository } from '@/backend_manager/manager_modules/expenses/manager-expenses.repository';

@Injectable()
export class ManagerExpensesAuthorizationService implements ManagerCoreResourceAuthorizationPort {
  constructor(private readonly repository: ManagerExpensesRepository, private readonly context: ManagerCoreRequestContextService) {}

  /**
   * @description Verifies that the requested expenses resource is visible inside the trusted tenant and branch context.
   * @param resourceId - UUID from the controller route.
   * @returns Resolves when the resource is in scope.
   * @throws ForbiddenException when tenant or branch scope is violated.
   */
  async assertCanAccess(resourceId: string): Promise<void> {
    const current = this.context.get();
    if (!current.tenantId) throw new ForbiddenException({ errorCode: 'AUTH.TENANT.CONTEXT_REQUIRED' });
    const resource = await this.repository.findByIdOrThrow(resourceId);
    const payload = resource.payload ?? {};
    const resourceTenantId = this.asString((resource as { tenantId?: unknown }).tenantId ?? payload.tenantId ?? payload.tenant_id);
    if (resourceTenantId && resourceTenantId !== current.tenantId) throw new ForbiddenException({ errorCode: 'AUTH.RESOURCE.TENANT_FORBIDDEN' });
    const resourceBranchId = this.asString((resource as { branchId?: unknown }).branchId ?? payload.branchId ?? payload.branch_id);
    if (current.branchId && resourceBranchId && current.branchId !== resourceBranchId) throw new ForbiddenException({ errorCode: 'AUTH.RESOURCE.BRANCH_FORBIDDEN' });
  }

  /** @description Converts a possible resource identifier into a non-empty string. @param value - Candidate identifier. @returns Identifier or undefined. */
  private asString(value: unknown): string | undefined { return typeof value === 'string' && value.length > 0 ? value : undefined; }
}
