// RESPONSIBILITY: Provides the infrastructure EventBus used for declared runtime feature dependencies.
// FLOW: Feature service â†’ CoreEventBus â†’ registered event name â†’ subscribers.

import { Injectable } from '@nestjs/common';

export class CoreEventBus {
  private readonly listeners = new Map<string, Array<(payload: unknown) => Promise<void> | void>>();

  on(eventName: string, listener: (payload: unknown) => Promise<void> | void): void {
    const current = this.listeners.get(eventName) ?? [];
    current.push(listener);
    this.listeners.set(eventName, current);
  }

  async emit(eventName: string, payload: unknown): Promise<void> {
    const listeners = this.listeners.get(eventName) ?? [];
    await Promise.all(listeners.map((listener) => listener(payload)));
  }
}

@Injectable()
export class CoreEventBusService extends CoreEventBus {}
