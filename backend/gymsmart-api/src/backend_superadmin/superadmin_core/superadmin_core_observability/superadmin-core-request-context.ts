// RESPONSIBILITY: Provides AsyncLocalStorage request context for tenant, actor, trace, and request identifiers.
// FLOW: Request middleware -> AsyncLocalStorage -> auth guard identity -> deep service/repository reads.
import { AsyncLocalStorage } from 'node:async_hooks';
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';

/**
 * Primary Intent: Defines SuperadminRequestContextValue as the interface-level contract for superadmin-core-request-context.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminRequestContextValue {
  requestId: string;
  traceId: string;
  spanId: string;
  userId: string | null;
  userRole: SuperadminRole | null;
  tenantId: string | null;
  ipAddress: string;
}

export const requestContextStorage = new AsyncLocalStorage<SuperadminRequestContextValue>();

export function getRequestContext(): SuperadminRequestContextValue | undefined {
  return requestContextStorage.getStore();
}

export function setAuthenticatedRequestContext(userId: string, userRole: SuperadminRole, tenantId: string | null): void {
  const current = requestContextStorage.getStore();
  if (!current) return;
  requestContextStorage.enterWith({ ...current, userId, userRole, tenantId });
}
