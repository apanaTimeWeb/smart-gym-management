// RESPONSIBILITY: Resolves and persists tenant feature flags using the master DB as source-of-truth with Redis caching.
// FLOW: Trusted tenant context -> master DB flag lookup/write -> Redis cache -> feature decision.
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { AdminCoreRequestContextService } from '@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service.js';
import { AdminCoreRedisService } from '@/backend_admin/admin_core/admin_core_redis/admin-core-redis.service.js';
import { AdminCoreMasterFeatureFlagEntity } from '@/backend_admin/admin_core/admin_core_config/admin-core-master-feature-flag.entity.js';

@Injectable()
/**
 * @description Provides centralized tenant-scoped feature-flag decisions.
 * @remarks Redis accelerates reads but never becomes the source of truth; all writes persist to master DB first.
 */
export class AdminCoreFeatureFlagService {
  private readonly prefix = 'core:feature-flag:v1:';
  private readonly ttlSeconds = 30 * 24 * 60 * 60;

  constructor(
    private readonly redis: AdminCoreRedisService,
    private readonly context: AdminCoreRequestContextService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  /** @description Resolves a normalized tenant feature flag, preferring a cached value and falling back to master DB. @param flag Stable feature-flag name. @returns Whether the flag is enabled. @remarks Unknown flags fail closed. */
  async isEnabled(flag: string): Promise<boolean> {
    const tenantId = this.context.get().tenantId;
    const key = this.key(tenantId, flag);
    const cached = await this.redis.get(key);
    if (cached !== null) return cached === '1';
    const normalized = this.normalize(flag);
    const repository = this.dataSource.getRepository(AdminCoreMasterFeatureFlagEntity);
    const record = await repository.findOne({ where: { tenantId, flagName: normalized } });
    const enabled = record?.enabled ?? false;
    await this.redis.setWithTtl(key, enabled ? '1' : '0', this.ttlSeconds);
    return enabled;
  }

  /** @description Persists one tenant feature flag and refreshes its cache after the DB write succeeds. @param flag Stable feature-flag name. @param enabled Desired state. @returns Promise completion. */
  async setEnabled(flag: string, enabled: boolean): Promise<void> {
    const tenantId = this.context.get().tenantId;
    const flagName = this.normalize(flag);
    const repository = this.dataSource.getRepository(AdminCoreMasterFeatureFlagEntity);
    const current = await repository.findOne({ where: { tenantId, flagName } });
    if (current) {
      current.enabled = enabled;
      current.updatedAt = new Date();
      await repository.save(current);
    } else {
      await repository.save(repository.create({ tenantId, flagName, enabled }));
    }
    await this.redis.setWithTtl(this.key(tenantId, flagName), enabled ? '1' : '0', this.ttlSeconds);
  }

  private normalize(flag: string): string {
    const normalized = flag.trim().toUpperCase().replace(/[^A-Z0-9_.-]/g, '_');
    if (!normalized) throw new Error('Feature flag name must not be empty.');
    return normalized;
  }

  private key(tenantId: string, flag: string): string {
    return `${this.prefix}${tenantId}:${this.normalize(flag)}`;
  }
}
