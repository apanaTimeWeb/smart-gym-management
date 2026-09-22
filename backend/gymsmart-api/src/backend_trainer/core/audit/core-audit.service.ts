// RESPONSIBILITY: Records critical mutation audit trails from the mutation layer.
// FLOW: Mutation service/orchestrator → audit record → tenant audit_logs.


import { Injectable } from '@nestjs/common';
import { CoreTenantDataSourceResolver } from '@/backend_trainer/core/database/core-tenant-datasource.resolver';
import { CoreAuditLogEntity } from '@/backend_trainer/core/database/core-audit-log.entity';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';

@Injectable()
export class CoreAuditService {
  constructor(private readonly resolver: CoreTenantDataSourceResolver) {}

  /** Records a state transition with actor, entity, and change snapshots. */
  async record(action: string, entityType: string, entityId: string, oldValue: Record<string, unknown> | null, newValue: Record<string, unknown> | null): Promise<void> {
    const context = CoreRequestContext.get();
    const repository = await this.resolver.getRepository(CoreAuditLogEntity);
    await repository.insert({ actorId: context.userId ?? '00000000-0000-0000-0000-000000000000', actorRole: context.role ?? 'UNKNOWN', action, entityType, entityId, oldValue, newValue, ipAddress: context.ipAddress ?? null } as any);
  }
}
