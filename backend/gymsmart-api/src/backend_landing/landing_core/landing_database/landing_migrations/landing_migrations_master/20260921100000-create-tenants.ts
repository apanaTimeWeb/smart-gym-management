// RESPONSIBILITY: Creates the master tenant registry schema used to resolve trusted tenant databases.
// FLOW: Master migration runner â†’ PostgreSQL master database â†’ tenants table.
import type { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Intent: Defines the create tenants boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class CreateTenants20260921100000 implements MigrationInterface {
  name = 'CreateTenants20260921100000';

  /** @description Applies this migration's schema changes. @param queryRunner - Active TypeORM migration runner. @returns Resolves after all schema operations complete. @throws Error when PostgreSQL rejects a schema operation. */
  
  /**
   * Intent: Preserve the single responsibility of 20260921100000-create-tenants.up at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);
    await queryRunner.query(`CREATE TYPE "master_tenant_status" AS ENUM ('ACTIVE', 'SUSPENDED')`);
    await queryRunner.query(`
      CREATE TABLE "tenants" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "slug" varchar(120) NOT NULL,
        "display_name" varchar(200) NOT NULL,
        "database_name" varchar(120) NOT NULL,
        "status" "master_tenant_status" NOT NULL DEFAULT 'ACTIVE',
        "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ(3),
        CONSTRAINT "PK_tenants" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_tenants_slug" UNIQUE ("slug"),
        CONSTRAINT "UQ_tenants_database_name" UNIQUE ("database_name")
      )
    `);
    await queryRunner.query(`CREATE INDEX "IDX_tenants_status" ON "tenants" ("status")`);
  }

  /** @description Reverts only the schema objects created by this migration. @param queryRunner - Active TypeORM migration runner. @returns Resolves after rollback operations complete. @throws Error when PostgreSQL rejects a rollback operation. */
  
  /**
   * Intent: Preserve the single responsibility of 20260921100000-create-tenants.down at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_tenants_status"`);
    await queryRunner.query(`DROP TABLE "tenants"`);
    await queryRunner.query(`DROP TYPE "master_tenant_status"`);
  }
}
