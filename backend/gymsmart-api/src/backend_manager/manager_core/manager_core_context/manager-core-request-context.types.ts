// RESPONSIBILITY: Defines the request-scoped actor, tenant, and tracing context contract.
// FLOW: Request boundary -> AsyncLocalStorage -> guard/service/repository context access.
import type { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';

export interface ManagerCoreRequestContext {
  requestId: string;
  traceId: string;
  spanId: string;
  actorId?: string;
  actorRole?: ManagerCoreRole;
  branchId?: string;
  tenantId?: string;
  tenantDatabaseName?: string;
  ipAddress?: string;
}
