// RESPONSIBILITY: Publishes authenticated realtime events through Redis so every application instance can deliver them.
// FLOW: Feature event handler -> Redis realtime channel -> WebSocket gateway -> authenticated user room.
import { Injectable } from '@nestjs/common';
import { SuperadminRedisService } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-redis.service';

export interface SuperadminRealtimeEventEnvelope {
  userId: string;
  event: string;
  payload: unknown;
}

@Injectable()
export class SuperadminRealtimePublisherService {
  constructor(private readonly redis: SuperadminRedisService) {}

  /** Publishes an event to the distributed realtime channel. */
  async publish(userId: string, event: string, payload: unknown): Promise<void> {
    const envelope: SuperadminRealtimeEventEnvelope = { userId, event, payload };
    await this.redis.getClient().publish('superadmin:realtime', JSON.stringify(envelope));
  }
}
