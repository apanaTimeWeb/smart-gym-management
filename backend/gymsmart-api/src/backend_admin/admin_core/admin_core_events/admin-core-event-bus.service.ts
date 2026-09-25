// RESPONSIBILITY: Provides the infrastructure EventBus used for declared runtime feature dependencies.
// FLOW: Feature service â†’ AdminCoreEventBus â†’ registered event name â†’ subscribers.
import { Injectable } from '@nestjs/common';

import type { AdminCoreRegisteredEventName } from '@/backend_admin/admin_core/admin_core_events/admin-core-event-registry.constants'

/**
 * @description Defines the AdminCoreEventBus boundary for the admin_core_events backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreEventBus {
  private readonly listeners = new Map<string, Array<(payload: unknown) => Promise<void> | void>>();

  /** @description Registers a listener only for an architecture-approved event name. @param eventName Registered event identifier. @param listener Event consumer. @returns void. */
  on(eventName: AdminCoreRegisteredEventName, listener: (payload: unknown) => Promise<void> | void): void {
    const current = this.listeners.get(eventName) ?? [];
    current.push(listener);
    this.listeners.set(eventName, current);
  }

  /** @description Delivers a registered runtime event to all local subscribers. @param eventName Registered event identifier. @param payload Event payload. @returns Promise completion after subscribers finish. */
  async emit(eventName: AdminCoreRegisteredEventName, payload: unknown): Promise<void> {
    const listeners = this.listeners.get(eventName) ?? [];
    await Promise.all(listeners.map((listener) => listener(payload)));
  }
}

@Injectable()
/**
 * @description Defines the AdminCoreEventBusService boundary for the admin_core_events backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreEventBusService extends AdminCoreEventBus {}
