// RESPONSIBILITY: Persists and publishes tenant-scoped realtime events with commit-safe ordering and replay support.
// FLOW: Feature mutation -> AdminCoreRealtimePublisherService -> realtime event persistence -> transaction commit -> Redis Pub/Sub.
import { Injectable } from '@nestjs/common';

import type { AdminCoreRegisteredEventName } from '@/backend_admin/admin_core/admin_core_events/admin-core-event-registry.constants'
import { AdminCoreRequestContextService } from '@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service'
import { AdminCoreTenantDataSourceManager } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-data-source.manager'
import { AdminCoreRealtimeEventEntity } from '@/backend_admin/admin_core/admin_core_realtime/admin-core-realtime-event.entity'
import { AdminCoreRedisService } from '@/backend_admin/admin_core/admin_core_redis/admin-core-redis.service'

import type { AdminCoreRealtimeEnvelope } from '@/backend_admin/admin_core/admin_core_realtime/admin-core-realtime-envelope'

@Injectable()
/**
 * @description Defines the AdminCoreRealtimePublisherService boundary for the admin_core_realtime backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreRealtimePublisherService {
  private readonly channelPrefix = 'core:realtime:v1:';

  constructor(
    private readonly redis: AdminCoreRedisService,
    private readonly context: AdminCoreRequestContextService,
    private readonly tenantManager: AdminCoreTenantDataSourceManager,
  ) {}

  /**
   * @description Persists a tenant-scoped realtime event before publication so reconnecting clients have a durable replay source.
   * @param event Registered domain event name.
   * @param data Typed event payload.
   * @returns Promise completion after durable persistence and safe publication scheduling.
   * @throws Error when no trusted tenant context exists or persistence fails.
   * @remarks Publication is deferred until the current transaction commits when a transaction manager is active.
   */
  async publish<TPayload extends Record<string, unknown>>(event: AdminCoreRegisteredEventName, data: TPayload): Promise<void> {
    const context = this.context.get();
    const envelope: AdminCoreRealtimeEnvelope<TPayload> = {
      event,
      tenantId: context.tenantId,
      emittedAt: new Date().toISOString(),
      data,
    };
    const repository = context.entityManager
      ? context.entityManager.getRepository(AdminCoreRealtimeEventEntity)
      : await this.tenantManager.getCurrentRepository(AdminCoreRealtimeEventEntity);
    await repository.save(repository.create({ tenantId: context.tenantId, eventName: event, payload: envelope as unknown as Record<string, unknown> }));

    const publishAfterCommit = async (): Promise<void> => {
      await this.redis.publish(`${this.channelPrefix}${context.tenantId}`, envelope);
    };
    if (context.entityManager) {
      this.context.deferUntilCommit(publishAfterCommit);
      return;
    }
    await publishAfterCommit();
  }
}
