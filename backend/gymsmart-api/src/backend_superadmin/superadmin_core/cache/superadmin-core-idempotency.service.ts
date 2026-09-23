// RESPONSIBILITY: Stores and replays critical mutation responses using Idempotency-Key.
// FLOW: Controller -> SuperadminIdempotencyService -> Redis -> original response replay.
import { Injectable } from '@nestjs/common';
import { SuperadminRedisService } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-redis.service';

@Injectable()
export class SuperadminIdempotencyService {
  constructor(private readonly redis: SuperadminRedisService) {}

  /** Returns an existing response for a key or reserves the key for processing. */
  async begin(key: string): Promise<string | null> {
    const existing = await this.redis.get(`idem:${key}`);
    if (existing) return existing;
    const reserved = await this.redis.set(`idem:${key}`, '__IN_PROGRESS__', 86400, true);
    return reserved ? null : this.redis.get(`idem:${key}`);
  }

  /** Saves the canonical response payload for a successful idempotent operation. */
  async complete(key: string, payload: string): Promise<void> { await this.redis.set(`idem:${key}`, payload, 86400); }

  /** Releases a reserved key when the protected operation fails before producing a response. */
  async release(key: string): Promise<void> { await this.redis.delete(`idem:${key}`); }
}