// RESPONSIBILITY: Applies master-database enum and audit-table constraints required by the Admin architecture.
// FLOW: Existing varchar values -> normalized uppercase -> PostgreSQL enums -> master audit table.
import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * @description Defines the AdminCoreMasterEnumsAndAudit1721000000000 boundary for the admin_core_database backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreMasterEnumsAndAudit1721000000000 implements MigrationInterface {
  /** @description Converts finite master state columns to PostgreSQL enums and creates the master audit table. @param queryRunner Migration runner. @returns Completion promise. */
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "core_master_admin_role_enum" AS ENUM ('ADMIN','SUPERADMIN','MANAGER')`);
    await queryRunner.query(`UPDATE "admins" SET "role" = UPPER("role") WHERE "role" IS NOT NULL`);
    await queryRunner.query(`ALTER TABLE "admins" ALTER COLUMN "role" TYPE "core_master_admin_role_enum" USING "role"::text::"core_master_admin_role_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "core_master_membership_role_enum" AS ENUM ('ADMIN','SUPERADMIN','MANAGER','STAFF')`);
    await queryRunner.query(`UPDATE "tenant_memberships" SET "role" = UPPER("role") WHERE "role" IS NOT NULL`);
    await queryRunner.query(`ALTER TABLE "tenant_memberships" ALTER COLUMN "role" TYPE "core_master_membership_role_enum" USING "role"::text::"core_master_membership_role_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "core_master_subscriptionstatus_enum" AS ENUM ('ACTIVE','CANCELLED','PAST_DUE','FAILED','PAUSED','EXPIRED')`);
    await queryRunner.query(`UPDATE "subscriptions_master" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`ALTER TABLE "subscriptions_master" ALTER COLUMN "status" TYPE "core_master_subscriptionstatus_enum" USING "status"::text::"core_master_subscriptionstatus_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "core_master_invoicestatus_enum" AS ENUM ('PAID','PENDING','VOID','REFUNDED','FAILED')`);
    await queryRunner.query(`UPDATE "invoices_master" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`ALTER TABLE "invoices_master" ALTER COLUMN "status" TYPE "core_master_invoicestatus_enum" USING "status"::text::"core_master_invoicestatus_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "core_master_upgrade_request_status_enum" AS ENUM ('PENDING','APPROVED','REJECTED','FULFILLED')`);
    await queryRunner.query(`UPDATE "upgrade_requests_master" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`ALTER TABLE "upgrade_requests_master" ALTER COLUMN "status" TYPE "core_master_upgrade_request_status_enum" USING "status"::text::"core_master_upgrade_request_status_enum"`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "audit_logs" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "actor_id" uuid, "actor_role" varchar(32), "action" varchar(120) NOT NULL, "entity_type" varchar(120) NOT NULL, "entity_id" uuid, "old_value" jsonb, "new_value" jsonb, "ip_address" inet, "module" varchar(120), "severity" varchar(20) NOT NULL DEFAULT 'LOW', "timestamp" timestamptz NOT NULL DEFAULT now(), CONSTRAINT "PK_audit_logs" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_audit_logs_timestamp" ON "audit_logs" ("timestamp")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_audit_logs_entity" ON "audit_logs" ("entity_type", "entity_id")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_audit_logs_actor" ON "audit_logs" ("actor_id")`);
  }

  /** @description Leaves enum/audit structures in place because subsequent migrations and audit history depend on them. @param _queryRunner Migration runner. @returns Promise completion. */
  async down(_queryRunner: QueryRunner): Promise<void> {}
}
