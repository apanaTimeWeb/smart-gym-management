// RESPONSIBILITY: Provides AsyncLocalStorage request context for tenant, actor, trace, and request identifiers.
// FLOW: Request middleware -> AsyncLocalStorage -> auth guard identity -> deep service/repository reads.
import { AsyncLocalStorage } from 'node:async_hooks';
import type { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

export interface RequestContextValue {
  requestId: string;
  traceId: string;
  spanId: string;
  userId: string | null;
  userRole: SuperadminRole | null;
  tenantId: string | null;
  ipAddress: string;
}

export const requestContextStorage = new AsyncLocalStorage<RequestContextValue>();

export function getRequestContext(): RequestContextValue | undefined {
  return requestContextStorage.getStore();
}

export function setAuthenticatedRequestContext(userId: string, userRole: SuperadminRole, tenantId: string | null): void {
  const current = requestContextStorage.getStore();
  if (!current) return;
  requestContextStorage.enterWith({ ...current, userId, userRole, tenantId });
}