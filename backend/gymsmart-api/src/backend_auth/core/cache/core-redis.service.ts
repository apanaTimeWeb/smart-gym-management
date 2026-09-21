// RESPONSIBILITY: Owns Redis connectivity and bounded-time cache primitives for rate limits and lockout.
// FLOW: Feature/core service -> CoreRedisService -> Redis -> typed result.

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { TIMEOUT_CONFIG } from '@/backend_auth/core/config/timeout.config';
import { CoreRedisCounterTypeException, CoreRedisTimeoutException } from '@/backend_auth/core/exceptions/core-app.exception';

import type { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
@Injectable()
export class CoreRedisService implements OnModuleInit, OnModuleDestroy {
  private client!: Redis;

  constructor(private readonly configService: ConfigService) {}

  /** @description Opens the configured Redis connection with a bounded connection timeout. @returns Promise completion. @throws CoreRedisTimeoutException when connection exceeds the configured budget. */
  async onModuleInit(): Promise<void> {
    this.client = new Redis(this.configService.getOrThrow<string>('environment.REDIS_URL'), {
      connectTimeout: TIMEOUT_CONFIG.REDIS_MS,
      maxRetriesPerRequest: 1,
      lazyConnect: true,
    });
    await this.withTimeout(this.client.connect(), TIMEOUT_CONFIG.REDIS_MS, 'Redis connection timed out.');
  }

  /** @description Closes the Redis connection during graceful shutdown. @returns Promise completion. @throws CoreRedisTimeoutException when shutdown exceeds the configured budget. */
  async onModuleDestroy(): Promise<void> {
    if (this.client) await this.withTimeout(this.client.quit(), TIMEOUT_CONFIG.REDIS_MS, 'Redis shutdown timed out.');
  }

  /** @description Increments a Redis counter and applies the requested window. @param key - Redis key. @param ttlSeconds - Counter TTL. @returns New counter value. */
  async incrementWithExpiry(key: string, ttlSeconds: number): Promise<number> {
    const pipeline = this.client.multi();
    pipeline.incr(key);
    pipeline.expire(key, ttlSeconds);
    const result = await this.withTimeout(pipeline.exec(), TIMEOUT_CONFIG.REDIS_MS, 'Redis increment timed out.');
    const value = result?.[0]?.[1];
    if (typeof value !== 'number') throw new CoreRedisCounterTypeException();
    return value;
  }

  /** @description Reads a Redis string value. @param key - Redis key. @returns Value or null. */
  async get(key: string): Promise<string | null> { return this.withTimeout(this.client.get(key), TIMEOUT_CONFIG.REDIS_MS, 'Redis GET timed out.'); }

  /** @description Stores a Redis value with TTL. @param key - Redis key. @param value - Value. @param ttlSeconds - TTL. @returns Redis response string. */
  async set(key: string, value: string, ttlSeconds: number): Promise<string> {
    return this.withTimeout(this.client.set(key, value, 'EX', ttlSeconds), TIMEOUT_CONFIG.REDIS_MS, 'Redis SET timed out.');
  }

  /** @description Deletes Redis keys. @param keys - Keys to remove. @returns Number removed. */
  async delete(...keys: string[]): Promise<number> {
    if (!keys.length) return 0;
    return this.withTimeout(this.client.del(...keys), TIMEOUT_CONFIG.REDIS_MS, 'Redis DEL timed out.');
  }

  /** @description Checks Redis availability. @returns PONG when healthy. */
  async ping(): Promise<string> { return this.withTimeout(this.client.ping(), TIMEOUT_CONFIG.REDIS_MS, 'Redis PING timed out.'); }

  /** @description Runs a Redis operation with an explicit timeout budget. @param promise - Redis operation promise. @param timeoutMs - Timeout budget in milliseconds. @param message - Controlled timeout message. @returns The original Redis result when it completes in time. @throws CoreRedisTimeoutException when the budget is exceeded. */
  private async withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_resolve, reject) => setTimeout(() => reject(new CoreRedisTimeoutException(message)), timeoutMs)),
    ]);
  }
}
