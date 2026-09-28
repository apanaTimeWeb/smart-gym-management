// RESPONSIBILITY: Defines the provider-neutral Redis infrastructure contract Manager requires from the global application.
// FLOW: Global application Redis adapter -> injection token -> Manager core -> idempotency/rate limiting.
import { InjectionToken } from '@nestjs/common';

export interface ManagerCoreRedisPort {
  set(key: string, value: string, mode?: 'EX', ttlSeconds?: number, condition?: 'NX'): Promise<'OK' | null>;
  get(key: string): Promise<string | null>;
  del(key: string): Promise<number>;
  incr(key: string): Promise<number>;
  expire(key: string, ttlSeconds: number): Promise<boolean>;
}

export const MANAGER_CORE_REDIS_PORT: InjectionToken = Symbol('MANAGER_CORE_REDIS_PORT');
