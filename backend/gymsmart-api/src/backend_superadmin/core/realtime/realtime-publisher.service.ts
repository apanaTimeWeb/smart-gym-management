// RESPONSIBILITY: Publishes authenticated realtime events through Redis so every application instance can deliver them.
// FLOW: Feature event handler -> Redis realtime channel -> WebSocket gateway -> authenticated user room.
import { Injectable } from '@nestjs/common';
import { RedisService } from '@/backend_superadmin/core/cache/redis.service';

export interface RealtimeEventEnvelope {
  userId: string;
  event: string;
  payload: unknown;
}

@Injectable()
export class RealtimePublisherService {
  constructor(private readonly redis: RedisService) {}

  /** Publishes an event to the distributed realtime channel. */
  async publish(userId: string, event: string, payload: unknown): Promise<void> {
    const envelope: RealtimeEventEnvelope = { userId, event, payload };
    await this.redis.getClient().publish('superadmin:realtime', JSON.stringify(envelope));
  }
}
