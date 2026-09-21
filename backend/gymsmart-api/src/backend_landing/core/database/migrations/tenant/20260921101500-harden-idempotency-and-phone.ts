// RESPONSIBILITY: Adds durable tenant idempotency state and aligns the Landing phone database invariant with the frozen API contract.
// FLOW: Tenant migration runner â†’ PostgreSQL â†’ idempotency_records / landing_bookings constraints.
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class HardenIdempotencyAndPhone20260921101500 implements MigrationInterface {
  name = 'HardenIdempotencyAndPhone20260921101500';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "idempotency_records" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "scope" varchar(120) NOT NULL,
        "key" varchar(255) NOT NULL,
        "request_hash" varchar(64) NOT NULL,
        "processing" boolean NOT NULL DEFAULT true,
        "response" jsonb,
        "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ(3),
        CONSTRAINT "PK_idempotency_records" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_idempotency_records_scope_key" UNIQUE ("scope", "key"),
        CONSTRAINT "CHK_idempotency_records_completed_has_response" CHECK ("processing" = TRUE OR "response" IS NOT NULL)
      )
    `);
    await queryRunner.query(`CREATE INDEX "IDX_idempotency_records_created_at" ON "idempotency_records" ("created_at" DESC)`);
    await queryRunner.query(`ALTER TABLE "landing_bookings" DROP CONSTRAINT "CHK_landing_bookings_phone"`);
    await queryRunner.query(`ALTER TABLE "landing_bookings" ADD CONSTRAINT "CHK_landing_bookings_phone" CHECK ("phone" ~ '^[0-9]{10}$')`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "landing_bookings" DROP CONSTRAINT "CHK_landing_bookings_phone"`);
    await queryRunner.query(`ALTER TABLE "landing_bookings" ADD CONSTRAINT "CHK_landing_bookings_phone" CHECK ("phone" ~ '^[0-9]{10,15}$')`);
    await queryRunner.query(`DROP INDEX "IDX_idempotency_records_created_at"`);
    await queryRunner.query(`DROP TABLE "idempotency_records"`);
  }
}
