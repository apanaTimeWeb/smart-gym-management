import { Injectable } from '@nestjs/common';
import { AdminCoreRequestContextService as GlobalContextService } from '@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service';
import type { CoreRequestContext } from '@/backend_manager/core/context/core-request-context.types';
import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';

@Injectable()
export class CoreRequestContextService {
  constructor(private readonly globalContext: GlobalContextService) {}

  run<T>(context: CoreRequestContext, callback: () => T): T {
    return callback();
  }

  get(): CoreRequestContext {
    try {
      const globalState = this.globalContext.get();
      return {
        requestId: globalState.requestId ?? 'unknown',
        traceId: globalState.traceId ?? 'unknown',
        spanId: globalState.spanId ?? 'unknown',
        actorId: globalState.userId,
        actorRole: globalState.userRole as CoreRole,
        tenantId: globalState.tenantId,
        tenantDatabaseName: globalState.tenantId,
      };
    } catch {
      return { requestId: 'unknown', traceId: 'unknown', spanId: 'unknown' };
    }
  }

  setActor(id: string, role: CoreRole): void {}
  setTenant(id: string, databaseName: string): void {}
}
