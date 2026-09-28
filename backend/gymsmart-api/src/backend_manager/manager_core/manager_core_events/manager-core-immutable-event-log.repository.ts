// RESPONSIBILITY: Appends immutable domain-event records for Manager analytics and audit replay.
// FLOW: Typed event -> tenant DataSource -> INSERT only -> historical event store.
import { Injectable } from '@nestjs/common';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import { ManagerCoreTenantDatasourceService } from '@/backend_manager/manager_core/manager_core_database/manager-core-tenant-datasource.service';
import { ManagerCoreImmutableEventLogEntity } from '@/backend_manager/manager_core/manager_core_events/manager-core-immutable-event-log.entity';

@Injectable()
export class ManagerCoreImmutableEventLogRepository {
  constructor(private readonly tenants: ManagerCoreTenantDatasourceService) {}

  /** @description Appends a domain event to the tenant event store. @param eventName - Registry event name. @param payload - Immutable event payload. @param sourceEntity - Logical source entity. @param sourceEntityId - Optional source UUID. @returns Nothing. */
  async append(eventName: string, payload: Record<string, unknown>, sourceEntity: string, sourceEntityId?: string, context?: ManagerCoreTransactionContext): Promise<void> {
    const repository = context ? context.getRepository(ManagerCoreImmutableEventLogEntity) : await (await this.tenants.getDataSource()).getRepository(ManagerCoreImmutableEventLogEntity);
    await (repository as any).insert(repository.create({ eventName, payload, sourceEntity, sourceEntityId: sourceEntityId ?? null }));
  }
}
