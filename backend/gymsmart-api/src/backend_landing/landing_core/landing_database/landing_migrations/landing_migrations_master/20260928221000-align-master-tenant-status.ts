// RESPONSIBILITY: Aligns the master tenant PostgreSQL enum with the verified Landing tenant lifecycle states.
// FLOW: TypeORM migration runner -> master_tenant_status enum -> tenant registry entity compatibility.
import type { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Intent: Add the TRIAL and CANCELLED states already modeled by the master tenant entity so database and ORM state cannot diverge.
 * Edge Cases: PostgreSQL enum values are additive in this migration; rollback cannot safely remove values referenced by existing rows.
 * Side Effects: Changes the master database enum type only.
 * AI Notes: Never silently alter tenant lifecycle states; coordinate future enum changes with a migration.
 */
export class AlignMasterTenantStatus20260928221000 implements MigrationInterface {
  name = 'AlignMasterTenantStatus20260928221000';

  /** @description Adds missing tenant lifecycle enum values in a forward-only safe migration. @param queryRunner - TypeORM master database query runner. @returns Resolves after enum alignment. */
  /** @description Applies this migration's schema changes. @param queryRunner - Active TypeORM migration runner. @returns Resolves after all schema operations complete. @throws Error when PostgreSQL rejects a schema operation. */
  
  /**
   * Intent: Preserve the single responsibility of 20260928221000-align-master-tenant-status.up at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TYPE "master_tenant_status" ADD VALUE IF NOT EXISTS 'TRIAL'`);
    await queryRunner.query(`ALTER TYPE "master_tenant_status" ADD VALUE IF NOT EXISTS 'CANCELLED'`);
  }

  /** @description Keeps rollback a no-op because PostgreSQL cannot safely remove enum values used by existing data. @param _queryRunner - TypeORM query runner. @returns Resolves without destructive enum mutation. */
  
  /**
   * Intent: Preserve the single responsibility of 20260928221000-align-master-tenant-status.down at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async down(_queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
