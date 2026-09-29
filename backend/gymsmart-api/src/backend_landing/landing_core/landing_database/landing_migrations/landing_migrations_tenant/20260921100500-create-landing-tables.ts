// RESPONSIBILITY: Creates Landing tenant tables, audit trail, and explicit database constraints.
// FLOW: Tenant provisioner â†’ tenant migration runner â†’ PostgreSQL tenant database.
import type { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Intent: Defines the create landing tables boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class CreateLandingTables20260921100500 implements MigrationInterface {
  name = 'CreateLandingTables20260921100500';

  /** @description Applies this migration's schema changes. @param queryRunner - Active TypeORM migration runner. @returns Resolves after all schema operations complete. @throws Error when PostgreSQL rejects a schema operation. */
  
  /**
   * Intent: Preserve the single responsibility of 20260921100500-create-landing-tables.up at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);
    await queryRunner.query(`CREATE TYPE "landing_booking_type" AS ENUM ('trial', 'membership', 'class')`);
    await queryRunner.query(`CREATE TYPE "landing_audit_actor_role" AS ENUM ('PUBLIC')`);
    await queryRunner.query(`
      CREATE TABLE "landing_bookings" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" varchar(100) NOT NULL,
        "email" varchar(320) NOT NULL,
        "phone" varchar(15) NOT NULL,
        "date" TIMESTAMPTZ(3) NOT NULL,
        "type" "landing_booking_type" NOT NULL,
        "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ(3),
        CONSTRAINT "PK_landing_bookings" PRIMARY KEY ("id"),
        CONSTRAINT "CHK_landing_bookings_type" CHECK ("type" IN ('trial', 'membership', 'class')),
        CONSTRAINT "CHK_landing_bookings_phone" CHECK ("phone" ~ '^[0-9]{10,15}$')
      )
    `);
    await queryRunner.query(`CREATE INDEX "IDX_landing_bookings_created_at" ON "landing_bookings" ("created_at" DESC)`);
    await queryRunner.query(`CREATE INDEX "IDX_landing_bookings_type" ON "landing_bookings" ("type")`);
    await queryRunner.query(`
      CREATE TABLE "landing_contacts" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" varchar(100) NOT NULL,
        "email" varchar(320) NOT NULL,
        "message" text NOT NULL,
        "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ(3),
        CONSTRAINT "PK_landing_contacts" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`CREATE INDEX "IDX_landing_contacts_created_at" ON "landing_contacts" ("created_at" DESC)`);
    await queryRunner.query(`
      CREATE TABLE "audit_logs" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "actor_id" uuid,
        "actor_role" "landing_audit_actor_role" NOT NULL,
        "action" varchar(120) NOT NULL,
        "entity_type" varchar(120) NOT NULL,
        "entity_id" uuid NOT NULL,
        "old_value" jsonb,
        "new_value" jsonb,
        "ip_address" inet,
        "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ(3),
        CONSTRAINT "PK_audit_logs" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`CREATE INDEX "IDX_audit_logs_entity" ON "audit_logs" ("entity_type", "entity_id")`);
  }

  /** @description Reverts only the schema objects created by this migration. @param queryRunner - Active TypeORM migration runner. @returns Resolves after rollback operations complete. @throws Error when PostgreSQL rejects a rollback operation. */
  
  /**
   * Intent: Preserve the single responsibility of 20260921100500-create-landing-tables.down at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "audit_logs"`);
    await queryRunner.query(`DROP TABLE "landing_contacts"`);
    await queryRunner.query(`DROP TABLE "landing_bookings"`);
    await queryRunner.query(`DROP TYPE "landing_audit_actor_role"`);
    await queryRunner.query(`DROP TYPE "landing_booking_type"`);
  }
}
