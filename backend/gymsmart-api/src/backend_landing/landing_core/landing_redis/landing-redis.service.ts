// RESPONSIBILITY: Owns the single Redis client used for rate limiting and idempotency infrastructure.
// FLOW: ConfigService -> LandingRedisService -> Redis server.
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import Redis from 'ioredis';
import RedisMock from 'ioredis-mock';

/**
 * Intent: Provide one centrally configured Redis client for cross-cutting infrastructure.
 * Edge Cases: Redis is never silently replaced by a second broker; the explicit redis://mock URI is test-only infrastructure.
 * Side Effects: Opens a network connection and closes it on module shutdown.
 * AI Notes: Do not store business state directly in this service; consumers own key semantics.
 */
@Injectable()
export class LandingRedisService implements OnModuleDestroy {
  readonly client: Redis;

  
  /**
   * Intent: Preserve the single responsibility of landing-redis.service.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(config: ConfigService) {
    const url = config.getOrThrow<string>('landing.redis.url');
    const connectTimeout = config.getOrThrow<number>('landing.redis.connectTimeoutMs');
    this.client = url === 'redis://mock' ? new RedisMock() as unknown as Redis : new Redis(url, { connectTimeout, maxRetriesPerRequest: 2 });
  }

  /** Intent: Verify Redis availability. Edge Cases: Network failure propagates to the caller. Side Effects: Performs a PING. AI Notes: Readiness checks should fail if Redis is unavailable. */
  async ping(): Promise<string> { return this.client.ping(); }

  /** Intent: Close the Redis client gracefully. Edge Cases: Redis quit failure is propagated for shutdown diagnostics. Side Effects: Closes the network connection. AI Notes: Do not instantiate another Redis client during shutdown. */
  async onModuleDestroy(): Promise<void> { await this.client.quit(); }
}
