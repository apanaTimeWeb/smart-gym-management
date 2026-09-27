// RESPONSIBILITY: Publishes typed Manager events and persists immutable event records for historical analytics.
// FLOW: Feature orchestrator -> registered event name -> in-process delivery + durable tenant event log.
import { EventEmitter } from 'node:events';
import { Injectable } from '@nestjs/common';
import { ManagerCoreRequestContextService } from '@/backend_manager/manager_core/manager_core_context/manager-core-request-context.service';
import { ManagerCoreImmutableEventLogRepository } from '@/backend_manager/manager_core/manager_core_events/manager-core-immutable-event-log.repository';
import { ManagerCoreEventRegistry } from '@/backend_manager/manager_core/manager_core_events/manager-core-event-registry.constants';
import type { ManagerCoreEventName } from '@/backend_manager/manager_core/manager_core_events/manager-core-event.types';

@Injectable()
export class ManagerCoreEventService {
  private readonly bus = new EventEmitter();

  constructor(private readonly eventLog: ManagerCoreImmutableEventLogRepository, private readonly context: ManagerCoreRequestContextService) {}

  /** @description Publishes a typed event and durably appends its immutable history record after the caller's transaction has committed. @param name - Canonical event name. @param payload - Event payload. @returns Nothing. */
  emit<T>(name: ManagerCoreEventName, payload: T): void {
    this.bus.emit(name, payload);
    const source = payload && typeof payload === 'object' ? payload as Record<string, unknown> : {};
    const sourceEntity = typeof source.feature === 'string' ? source.feature : name.split('.')[2] ?? 'unknown';
    const sourceEntityId = typeof source.id === 'string' ? source.id : undefined;
    void this.persistSafely(name, source, sourceEntity, sourceEntityId);
  }

  /** @description Registers a consumer callback for a canonical runtime event. @param name - Event name. @param handler - Consumer callback. @returns Nothing. */
  on<T>(name: ManagerCoreEventName, handler: (payload: T) => void): void { this.bus.on(name, handler); }

  /** @description Persists a non-blocking immutable event record using the trusted request tenant context. @param name - Event name. @param payload - Event payload. @param sourceEntity - Source entity. @param sourceEntityId - Source UUID. @returns Promise that resolves after best-effort persistence. */
  private async persistSafely(name: ManagerCoreEventName, payload: Record<string, unknown>, sourceEntity: string, sourceEntityId?: string): Promise<void> {
    if (!this.context.get().tenantId) return;
    try { await this.eventLog.append(name, payload, sourceEntity, sourceEntityId); } catch { /* telemetry boundary intentionally avoids breaking committed requests */ }
  }
}
