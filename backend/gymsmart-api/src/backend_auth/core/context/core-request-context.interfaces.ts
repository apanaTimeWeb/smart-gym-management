// RESPONSIBILITY: Defines the request-scoped context state propagated through AsyncLocalStorage.
// FLOW: CoreRequestContextMiddleware -> CoreRequestContextService -> CoreRequestContextState -> guards/services/repositories.

import type { EntityManager } from 'typeorm';

export interface CoreRequestContextState {
  requestId: string;
  traceId: string;
  spanId: string;
  ipAddress: string | null;
  userId?: string;
  tenantId?: string;
  entityManager?: EntityManager;
}
