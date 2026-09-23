// RESPONSIBILITY: Defines the request-scoped actor, tenant, and tracing context contract.
// FLOW: Request boundary -> AsyncLocalStorage -> guard/service/repository context access.
import type { CoreRole } from '@/backend_manager/core/auth/core-role.constants';

export interface CoreRequestContext {
  requestId: string;
  traceId: string;
  spanId: string;
  actorId?: string;
  actorRole?: CoreRole;
  tenantId?: string;
  tenantDatabaseName?: string;
  ipAddress?: string;
}
