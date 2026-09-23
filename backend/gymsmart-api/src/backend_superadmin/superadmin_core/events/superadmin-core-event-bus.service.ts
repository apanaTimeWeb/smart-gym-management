// RESPONSIBILITY: Provides the framework-level in-process event transport for declared cross-feature runtime events.
// FLOW: Feature mutation -> SuperadminEventBusService -> registered event subscribers.
import { EventEmitter } from 'node:events';
import { Injectable } from '@nestjs/common';
import type { EventName } from '@/backend_superadmin/superadmin_core/events/superadmin-core-event-registry.constants';

@Injectable()
export class SuperadminEventBusService {
  private readonly emitter = new EventEmitter();

  /** Emits a declared runtime event without importing sibling business modules. */
  emit(event: EventName, payload: unknown): void { this.emitter.emit(event, payload); }

  /** Registers a subscriber for a declared runtime event. */
  on(event: EventName, listener: (payload: unknown) => void): void { this.emitter.on(event, listener); }
}