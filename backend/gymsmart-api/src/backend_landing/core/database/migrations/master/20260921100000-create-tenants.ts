// RESPONSIBILITY: Creates the master tenant registry schema used to resolve trusted tenant databases.
// FLOW: Master migration runner → PostgreSQL master database → tenants table.
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTenants20260921100000 implements MigrationInterface {
  name = 'CreateTenants20260921100000';

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

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_tenants_status"`);
    await queryRunner.query(`DROP TABLE "tenants"`);
    await queryRunner.query(`DROP TYPE "master_tenant_status"`);
  }
}
