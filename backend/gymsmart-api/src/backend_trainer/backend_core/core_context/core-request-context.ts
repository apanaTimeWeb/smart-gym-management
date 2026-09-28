// RESPONSIBILITY: Stores request-scoped user, tenant, trace, and request identifiers via AsyncLocalStorage.
// FLOW: Middleware creates context → guards enrich scoped context → repositories resolve tenant/user metadata.

import { AsyncLocalStorage } from 'node:async_hooks';
import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import type { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types';

export interface CoreRequestContextValue {
  requestId: string;
  tenantId?: string;
  userId?: string;
  role?: CoreRole;
  traceId?: string;
  spanId?: string;
  ipAddress?: string;
}

const coreRequestStorage = new AsyncLocalStorage<CoreRequestContextValue>();


/**
 * Intent: Defines the CoreRequestContext boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class CoreRequestContext {
  /** Runs the callback inside a request-scoped AsyncLocalStorage context. */
  static run<T>(value: CoreRequestContextValue, callback: () => T): T {
    return coreRequestStorage.run(value, callback);
  }

  /** Returns the live request-scoped context object when one exists. */
  static getOptional(): CoreRequestContextValue | undefined {
    return coreRequestStorage.getStore();
  }

  /** Returns the live request-scoped context or fails closed when middleware was skipped. */
  static get(): CoreRequestContextValue {
    const value = this.getOptional();
    if (!value) throw new InternalServerErrorException('CORE.REQUEST_CONTEXT.MISSING');
    return value;
  }

  /** Returns the authenticated user identifier or fails closed when auth context is missing. */
  static getUserIdOrThrow(): string {
    const userId = this.get().userId;
    if (!userId) throw new UnauthorizedException('CORE.AUTH.USER_CONTEXT.MISSING');
    return userId;
  }

  /** Returns the trusted tenant identifier established by tenant authorization. */
  static getTenantIdOrThrow(): string {
    const tenantId = this.get().tenantId;
    if (!tenantId) throw new UnauthorizedException('CORE.TENANT_CONTEXT.MISSING');
    return tenantId;
  }
}
