// RESPONSIBILITY: Exposes durable tenant-scoped realtime replay for clients reconnecting after a disconnect.
// FLOW: Authenticated tenant request -> replay query DTO -> persisted realtime events -> canonical response envelope.
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreRequestContextService } from '@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service'
import { AdminCoreTenantDataSourceManager } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-data-source.manager'
import { AdminCoreRealtimeEventEntity } from '@/backend_admin/admin_core/admin_core_realtime/admin-core-realtime-event.entity'
import { AdminCoreRealtimeReplayEventDto } from '@/backend_admin/admin_core/admin_core_realtime/admin-core-realtime-replay-event.dto'
import { AdminCoreRealtimeReplayQueryDto } from '@/backend_admin/admin_core/admin_core_realtime/admin-core-realtime-replay-query.dto'

@ApiTags('Admin Realtime')
@Controller('admin/realtime')
/**
 * @description Provides the authenticated Admin reconnect endpoint for durable realtime event recovery.
 * @remarks The controller only reads persisted event history; it does not publish, mutate, or bypass tenant authorization.
 */
export class AdminCoreRealtimeReplayController {
  constructor(
    private readonly context: AdminCoreRequestContextService,
    private readonly tenantManager: AdminCoreTenantDataSourceManager,
  ) {}

  /**
   * @description Returns durable tenant-scoped realtime events for a reconnecting client so critical notifications are recoverable after network loss.
   * @param query Bounded replay cursor and result limit.
   * @returns Persisted realtime event envelopes in reverse chronological order.
   * @remarks No event is emitted from this endpoint; it is a read-only recovery path for Rule 120.
   */
  @Get('replay')
  @ApiOperation({ summary: 'Replay durable Admin realtime events' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Persisted realtime events returned.', type: AdminCoreRealtimeReplayEventDto, isArray: true })
  async replay(query: AdminCoreRealtimeReplayQueryDto): Promise<AdminCoreRealtimeReplayEventDto[]> {
    const tenantId = this.context.get().tenantId;
    const repository = await this.tenantManager.getCurrentRepository(AdminCoreRealtimeEventEntity);
    const builder = repository.createQueryBuilder('event')
      .where('event.tenant_id = :tenantId', { tenantId })
      .orderBy('event.created_at', 'DESC')
      .take(query.limit);
    if (query.after) builder.andWhere('event.created_at > :after', { after: query.after });
    const entities = await builder.getMany();
    return entities.map((entity) => ({
      id: entity.id,
      eventName: entity.eventName,
      payload: entity.payload,
      createdAt: entity.createdAt.toISOString(),
    }));
  }
}
