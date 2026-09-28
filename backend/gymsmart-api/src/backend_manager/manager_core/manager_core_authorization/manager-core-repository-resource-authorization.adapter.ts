// RESPONSIBILITY: Adapts a feature repository to the Manager resource authorization boundary without importing feature business logic into core.
// FLOW: Resource ID -> feature repository findByIdOrThrow -> trusted tenant/branch context -> authorization decision.
import { ForbiddenException } from '@nestjs/common';

import { ManagerCoreRequestContextService } from '@/backend_manager/manager_core/manager_core_context/manager-core-request-context.service';

import type { ManagerCoreAuthorizableResource, ManagerCoreResourceAuthorizationPort } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.types';

export interface ManagerCoreResourceRepositoryPort {
  findByIdOrThrow(resourceId: string): Promise<ManagerCoreAuthorizableResource>;
}

export class ManagerCoreRepositoryResourceAuthorizationAdapter implements ManagerCoreResourceAuthorizationPort {
  constructor(private readonly repository: ManagerCoreResourceRepositoryPort, private readonly context: ManagerCoreRequestContextService) {}

  /**
   * @description Verifies that a resource exists in the already trusted tenant context and, when both sides expose a branch, belongs to the actor's branch.
   * @param resourceId - UUID of the requested resource.
   * @returns Resolves when access is permitted.
   * @throws ForbiddenException when tenant or branch scope is violated.
   */
  async assertCanAccess(resourceId: string): Promise<void> {
    const current = this.context.get();
    if (!current.tenantId) throw new ForbiddenException({ errorCode: 'AUTH.TENANT.CONTEXT_REQUIRED' });
    const resource = await this.repository.findByIdOrThrow(resourceId);
    const payload = resource.payload ?? {};
    const resourceTenantId = resource.tenantId ?? this.asString(payload.tenantId ?? payload.tenant_id);
    if (resourceTenantId && resourceTenantId !== current.tenantId) throw new ForbiddenException({ errorCode: 'AUTH.RESOURCE.TENANT_FORBIDDEN' });
    const resourceBranchId = resource.branchId ?? this.asString(payload.branchId ?? payload.branch_id);
    if (current.branchId && resourceBranchId && current.branchId !== resourceBranchId) throw new ForbiddenException({ errorCode: 'AUTH.RESOURCE.BRANCH_FORBIDDEN' });
  }

  /** @description Converts a value into an optional identifier string. @param value - Unknown value. @returns String identifier or undefined. */
  private asString(value: unknown): string | undefined { return typeof value === 'string' && value.length ? value : undefined; }
}
