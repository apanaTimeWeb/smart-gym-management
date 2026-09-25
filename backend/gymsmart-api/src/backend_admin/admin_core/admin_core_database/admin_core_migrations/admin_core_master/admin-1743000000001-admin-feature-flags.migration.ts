// RESPONSIBILITY: Creates the master-database persistence contract for tenant feature flags.
// FLOW: TypeORM migration -> admin_feature_flags table -> centralized FeatureFlagService.
import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * @description Creates the persistent master DB feature-flag store with tenant/flag uniqueness.
 * @remarks The migration is additive and preserves rollback safety.
 */
export class AdminFeatureFlags1743000000001 implements MigrationInterface {
  /** @description Applies the feature flag table migration. @param queryRunner TypeORM migration runner. @returns Promise completion. @throws Database driver errors if DDL fails. */
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "admin_feature_flags" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "tenant_id" uuid NOT NULL, "flag_name" varchar(160) NOT NULL, "enabled" boolean NOT NULL DEFAULT false, "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_admin_feature_flags" PRIMARY KEY ("id"), CONSTRAINT "UQ_admin_feature_flags_tenant_flag" UNIQUE ("tenant_id", "flag_name"));`);
  }

  /** @description Reverses the additive feature flag table migration. @param queryRunner TypeORM migration runner. @returns Promise completion. @throws Database driver errors if DDL rollback fails. */
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "admin_feature_flags";`);
  }
}
