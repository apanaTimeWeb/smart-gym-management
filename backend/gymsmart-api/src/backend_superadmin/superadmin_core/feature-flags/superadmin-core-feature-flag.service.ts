// RESPONSIBILITY: Evaluates persisted Superadmin feature flags dynamically for a tenant without environment-variable branching.
// FLOW: Business caller -> SuperadminFeatureFlagService -> master DataSource -> superadmin_feature_flags.
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import type { DataSource } from 'typeorm';

@Injectable()
export class SuperadminFeatureFlagService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  /** Returns true only when a non-deleted flag is globally enabled or explicitly enabled for the tenant. */
  async isEnabled(featureName: string, tenantId: string): Promise<boolean> {
    const rows = await this.dataSource.query(
      `SELECT is_global_enabled, enabled_tenant_ids
         FROM superadmin_feature_flags
        WHERE name = $1 AND deleted_at IS NULL
        ORDER BY updated_at DESC
        LIMIT 1`,
      [featureName],
    ) as Array<{ is_global_enabled: boolean; enabled_tenant_ids: unknown }>;
    const row = rows[0];
    if (!row) return false;
    if (row.is_global_enabled) return true;
    if (!Array.isArray(row.enabled_tenant_ids)) return false;
    return row.enabled_tenant_ids.some((value) => value === tenantId);
  }
}
