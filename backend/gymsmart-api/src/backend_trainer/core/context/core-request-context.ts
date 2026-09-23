// RESPONSIBILITY: Stores request-scoped user, tenant, trace, and request identifiers via AsyncLocalStorage.
// FLOW: Middleware creates context → guards enrich it → repositories resolve tenant from it.


import { AsyncLocalStorage } from 'node:async_hooks';
import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { globalCoreRequestStorage } from '@/backend_admin/core/context/core-request-context.service';

export interface CoreRequestContextValue { requestId: string; tenantId?: string; userId?: string; role?: import('@/backend_trainer/core/types/core-auth.types').CoreRole; traceId?: string; spanId?: string; ipAddress?: string; }

export class CoreRequestContext {
  static run<T>(value: CoreRequestContextValue, callback: () => T): T { return callback(); }
  static getOptional(): CoreRequestContextValue | undefined { 
    const globalState = globalCoreRequestStorage.getStore();
    if (!globalState) return undefined;
    return { ...globalState, role: globalState.userRole as any } as CoreRequestContextValue;
  }
  static get(): CoreRequestContextValue { 
    const value = this.getOptional(); 
    if (!value) throw new InternalServerErrorException('CORE.REQUEST_CONTEXT.MISSING'); 
    return value; 
  }
  static getTenantIdOrThrow(): string { const tenantId = globalCoreRequestStorage.getStore()?.tenantId; if (!tenantId) throw new UnauthorizedException('CORE.TENANT_CONTEXT.MISSING'); return tenantId; }
}
