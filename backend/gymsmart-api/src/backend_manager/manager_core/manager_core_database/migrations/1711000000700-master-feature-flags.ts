// RESPONSIBILITY: Creates the master-database tenant-scoped feature-flag registry.
// FLOW: Migration runner → feature_flags table/constraints → reversible master schema.
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class MasterFeatureFlags1711000000700 implements MigrationInterface {
  name = 'MasterFeatureFlags1711000000700';

  /** @description Creates the tenant-scoped feature flag registry and its integrity constraints. @param queryRunner - TypeORM migration runner. @returns Promise resolved after DDL completes. */
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "feature_flags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tenant_id" uuid NOT NULL, "key" varchar(120) NOT NULL, "enabled" boolean NOT NULL DEFAULT false, "rollout_percent" integer NOT NULL DEFAULT 0, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz NULL, CONSTRAINT "PK_feature_flags_id" PRIMARY KEY ("id"), CONSTRAINT "UQ_feature_flags_tenant_key" UNIQUE ("tenant_id", "key"), CONSTRAINT "FK_feature_flags_tenants_tenant_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id"), CONSTRAINT "CHK_feature_flags_rollout_percent" CHECK ("rollout_percent" BETWEEN 0 AND 100))`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_feature_flags_tenant_id" ON "feature_flags" ("tenant_id")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_feature_flags_deleted_at" ON "feature_flags" ("deleted_at")`);
  }

  /** @description Removes the tenant-scoped feature flag registry. @param queryRunner - TypeORM migration runner. @returns Promise resolved after rollback completes. */
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "feature_flags"');
  }
}
