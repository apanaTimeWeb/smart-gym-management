// RESPONSIBILITY: Defines the provider-neutral Manager resource authorization contract.
// FLOW: Route resource identifier -> feature authorization provider -> trusted tenant/branch decision.
export interface ManagerCoreAuthorizableResource {
  payload?: Record<string, unknown> | null;
  tenantId?: string | null;
  branchId?: string | null;
  branch_id?: string | null;
}

export interface ManagerCoreResourceAuthorizationPort {
  assertCanAccess(resourceId: string): Promise<void>;
}

export const MANAGER_CORE_RESOURCE_AUTHORIZER_PREFIX = 'CORE_RESOURCE_AUTHORIZER:';
