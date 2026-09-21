// RESPONSIBILITY: Owns the single Redis client used for idempotency, lockout and rate-limit state.
// FLOW: Core services → CoreRedisService → Redis.

import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class CoreRedisService implements OnModuleDestroy {
  private readonly client: Redis;

  constructor(config: ConfigService) {
    this.client = new Redis(config.getOrThrow<string>('REDIS_URL'), {
      maxRetriesPerRequest: 1,
      lazyConnect: true,
    });
  }

  async connect(): Promise<void> {
    if (this.client.status === 'wait') await this.client.connect();
  }

  /** @description Verifies Redis connectivity. @returns PONG response. */
  async ping(): Promise<string> {
    await this.connect();
    return this.client.ping();
  }

  /** @description Stores a value with a TTL. @param key Redis key. @param value Serialized value. @param ttlSeconds Expiration in seconds. @returns Redis acknowledgment. */
  async setWithTtl(key: string, value: string, ttlSeconds: number): Promise<string | null> {
    await this.connect();
    return this.client.set(key, value, 'EX', ttlSeconds);
  }

  /** @description Gets a Redis value. @param key Redis key. @returns Stored string or null. */
  async get(key: string): Promise<string | null> {
    await this.connect();
    return this.client.get(key);
  }


  /** @description Deletes one Redis key. @param key Redis key. @returns Redis deletion count. */
  async delete(key: string): Promise<number> {
    await this.connect();
    return this.client.del(key);
  }

  /** @description Atomically increments a numeric value. @param key Redis key. @returns New counter. */
  async increment(key: string): Promise<number> {
    await this.connect();
    return this.client.incr(key);
  }

  /** @description Atomically sets a Redis key only when it is absent. @param key Redis key. @param value Value. @param ttlSeconds Expiration in seconds. @returns True when the key was acquired. */
  async setIfAbsent(key: string, value: string, ttlSeconds: number): Promise<boolean> {
    await this.connect();
    const result = await this.client.set(key, value, 'EX', ttlSeconds, 'NX');
    return result === 'OK';
  }

  async onModuleDestroy(): Promise<void> {
    if (this.client.status !== 'end') await this.client.quit();
  }
}
