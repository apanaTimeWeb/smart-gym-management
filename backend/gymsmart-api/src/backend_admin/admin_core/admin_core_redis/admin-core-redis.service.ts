// RESPONSIBILITY: Owns the single Redis client boundary used for idempotency, lockout, rate limits, queues, and realtime publication.
// FLOW: Core services -> AdminCoreRedisService -> Redis; test mode uses isolated in-memory state without changing production behavior.
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import Redis from 'ioredis';

@Injectable()
/**
 * @description Defines the AdminCoreRedisService boundary for the admin_core_redis backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreRedisService implements OnModuleDestroy {
  private readonly client: Redis | null;
  private readonly url: string;
  private readonly memory = new Map<string, { value: string; expiresAt: number }>();
  private readonly lists = new Map<string, string[]>();
  private readonly useMemory: boolean;

  constructor(config: ConfigService) {
    this.url = config.getOrThrow<string>('runtime.redisUrl');
    this.useMemory = this.url === 'redis://mock' || config.get<string>('runtime.nodeEnv') === 'test';
    this.client = this.useMemory ? null : new Redis(this.url, { maxRetriesPerRequest: 1, lazyConnect: true });
  }

  /** @description Connects Redis when production runtime requires it. @returns Promise completion. */
  async connect(): Promise<void> {
    if (!this.client || this.client.status !== 'wait') return;
    await this.client.connect();
  }

  /** @description Verifies Redis connectivity. @returns PONG response. */
  async ping(): Promise<string> {
    if (this.useMemory) return 'PONG';
    await this.connect();
    return this.client!.ping();
  }

  /** @description Stores a value with TTL. @param key Redis key. @param value Serialized value. @param ttlSeconds Expiry in seconds. @returns Redis acknowledgment. */
  async setWithTtl(key: string, value: string, ttlSeconds: number): Promise<string | null> {
    if (this.useMemory) { this.memory.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 }); return 'OK'; }
    await this.connect();
    return this.client!.set(key, value, 'EX', ttlSeconds);
  }

  /** @description Gets a value and enforces local TTL semantics in test mode. @param key Redis key. @returns Stored value or null. */
  async get(key: string): Promise<string | null> {
    if (this.useMemory) {
      const item = this.memory.get(key);
      if (!item || item.expiresAt <= Date.now()) { this.memory.delete(key); return null; }
      return item.value;
    }
    await this.connect();
    return this.client!.get(key);
  }

  /** @description Deletes one key. @param key Redis key. @returns Deletion count. */
  async delete(key: string): Promise<number> {
    if (this.useMemory) return this.memory.delete(key) ? 1 : 0;
    await this.connect();
    return this.client!.del(key);
  }

  /** @description Atomically increments a numeric value. @param key Redis key. @returns New counter. */
  async increment(key: string): Promise<number> {
    if (this.useMemory) { const value = Number.parseInt((await this.get(key)) ?? '0', 10) + 1; this.memory.set(key, { value: String(value), expiresAt: Date.now() + 300000 }); return value; }
    await this.connect();
    return this.client!.incr(key);
  }

  /** @description Appends a JSON message to a Redis list. @param key Redis list key. @param value JSON-serializable message. @returns New list length. */
  async pushJson(key: string, value: unknown): Promise<number> {
    const serialized = JSON.stringify(value);
    if (this.useMemory) { const list = this.lists.get(key) ?? []; list.unshift(serialized); this.lists.set(key, list); return list.length; }
    await this.connect();
    return this.client!.lpush(key, serialized);
  }

  /** @description Pops one JSON message, blocking up to the requested timeout in Redis mode. @param key Queue key. @param timeoutSeconds Blocking timeout. @returns Parsed message or null. */
  async popJson<T>(key: string, timeoutSeconds: number): Promise<T | null> {
    if (this.useMemory) { const list = this.lists.get(key) ?? []; const value = list.pop(); if (!value) return null; return JSON.parse(value) as T; }
    await this.connect();
    const result = await this.client!.brpop(key, timeoutSeconds);
    return result ? JSON.parse(result[1]) as T : null;
  }

  /** @description Returns Redis list depth. @param key Queue key. @returns Current list length. */
  async listLength(key: string): Promise<number> {
    if (this.useMemory) return (this.lists.get(key) ?? []).length;
    await this.connect();
    return this.client!.llen(key);
  }

  /** @description Publishes one JSON payload to a Redis Pub/Sub channel. @param channel Channel name. @param payload JSON-serializable payload. @returns Subscriber count. */
  async publish(channel: string, payload: unknown): Promise<number> {
    if (this.useMemory) { await this.setWithTtl(`pubsub:${channel}`, JSON.stringify(payload), 60); return 0; }
    await this.connect();
    return this.client!.publish(channel, JSON.stringify(payload));
  }

  /** @description Atomically acquires a key only when absent. @param key Key. @param value Value. @param ttlSeconds Expiry. @returns Whether acquisition succeeded. */
  async setIfAbsent(key: string, value: string, ttlSeconds: number): Promise<boolean> {
    if (this.useMemory) { if (await this.get(key)) return false; await this.setWithTtl(key, value, ttlSeconds); return true; }
    await this.connect();
    return (await this.client!.set(key, value, 'EX', ttlSeconds, 'NX')) === 'OK';
  }

  /** @description Closes the production Redis connection during graceful shutdown. @returns Promise completion. */
  async onModuleDestroy(): Promise<void> {
    if (this.client && this.client.status !== 'end') await this.client.quit();
  }
}
