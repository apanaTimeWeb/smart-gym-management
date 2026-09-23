// RESPONSIBILITY: Owns backend core runtime event publication and subscription plumbing.
// FLOW: Feature orchestrator → registered event name → in-process event bus → declared consumer.

import { EventEmitter } from 'node:events';

import { Injectable } from '@nestjs/common';

import { CoreEventRegistry } from '@/backend_manager/core/events/core-event-registry.constants';

import type { CoreEventName } from '@/backend_manager/core/events/core-event.types';

@Injectable()
export class CoreEventService {
  private readonly bus = new EventEmitter();

  /**
   * @description Publishes a typed payload to a registered runtime event name.
   * @param name - Canonical event name from the event registry.
   * @param payload - Event payload validated by the emitting feature boundary.
   * @returns Nothing.
   */
  emit<T>(name: CoreEventName, payload: T): void {
    this.bus.emit(name, payload);
  }

  /**
   * @description Registers a consumer callback for a canonical runtime event.
   * @param name - Canonical event name from the event registry.
   * @param handler - Consumer callback for the event payload.
   * @returns Nothing.
   */
  on<T>(name: CoreEventName, handler: (payload: T) => void): void {
    this.bus.on(name, handler);
  }
}
