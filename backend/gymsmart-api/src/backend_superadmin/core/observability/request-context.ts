// RESPONSIBILITY: Provides AsyncLocalStorage request context for tenant, actor, trace, and request identifiers.
// FLOW: Request middleware -> AsyncLocalStorage -> deep service/repository reads.
import { AsyncLocalStorage } from 'node:async_hooks';
export interface RequestContextValue { requestId: string; traceId: string; spanId: string; userId: string | null; tenantId: string | null; }
export const requestContextStorage = new AsyncLocalStorage<RequestContextValue>();
export function getRequestContext(): RequestContextValue | undefined { return requestContextStorage.getStore(); }
