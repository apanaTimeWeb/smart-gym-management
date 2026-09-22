// RESPONSIBILITY: Stores request-scoped user, tenant, trace, and request identifiers via AsyncLocalStorage.
// FLOW: Middleware creates context → guards enrich it → repositories resolve tenant from it.


import { AsyncLocalStorage } from 'node:async_hooks';
import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

export interface CoreRequestContextValue { requestId: string; tenantId?: string; userId?: string; role?: import('@/backend_trainer/core/types/core-auth.types').CoreRole; traceId?: string; spanId?: string; ipAddress?: string; }

const storage = new AsyncLocalStorage<CoreRequestContextValue>();

export class CoreRequestContext {
  /** Runs a callback inside a request-scoped context. */
  static run<T>(value: CoreRequestContextValue, callback: () => T): T { return storage.run(value, callback); }
  /** Returns the current request context when one is already active. */
  static getOptional(): CoreRequestContextValue | undefined { return storage.getStore(); }
  /** Returns the current request context or throws outside an HTTP request. */
  static get(): CoreRequestContextValue { const value = storage.getStore(); if (!value) throw new InternalServerErrorException('CORE.REQUEST_CONTEXT.MISSING'); return value; }
  /** Returns the current tenant identifier. */
  static getTenantIdOrThrow(): string { const tenantId = storage.getStore()?.tenantId; if (!tenantId) throw new UnauthorizedException('CORE.TENANT_CONTEXT.MISSING'); return tenantId; }
}
