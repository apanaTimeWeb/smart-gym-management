// RESPONSIBILITY: Evaluates centralized tenant-aware feature flags for the Manager backend.
// FLOW: Trusted tenant context -> master feature-flag repository -> deterministic rollout decision -> feature capability.
import { Injectable } from '@nestjs/common';

import { DataSource, IsNull } from 'typeorm';

import { ManagerCoreFeatureFlagEntity } from '@/backend_manager/manager_core/manager_core_config/manager-core-feature-flag.entity';

@Injectable()
export class ManagerCoreFeatureFlagService {
  constructor(private readonly dataSource: DataSource) {}

  /** @description Evaluates a tenant-scoped feature flag with a deterministic rollout bucket and fail-closed default. @param key - Feature flag key. @param tenantId - Trusted tenant identifier. @param defaultValue - Safe fallback when no flag is configured. @returns Whether the flag is enabled for the tenant. */
  async isEnabled(key: string, tenantId: string, defaultValue = false): Promise<boolean> {
    const flag = await this.dataSource.getRepository(ManagerCoreFeatureFlagEntity).findOne({ where: { key, tenantId, deletedAt: IsNull() } });
    if (!flag) return defaultValue;
    if (!flag.enabled) return false;
    if (flag.rolloutPercent >= 100) return true;
    const bucket = this.bucket(`${key}:${tenantId}`);
    return bucket < Math.max(0, Math.min(100, flag.rolloutPercent));
  }

  /** @description Calculates a stable 0-99 rollout bucket without external randomness. @param input - Flag and tenant seed. @returns Stable rollout bucket. */
  private bucket(input: string): number {
    let hash = 0;
    for (const char of input) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    return hash % 100;
  }
}
