// RESPONSIBILITY: Creates the durable Manager communications delivery job table and explicit database constraints.
// FLOW: Tenant schema migration -> durable outbox job table -> indexed retry/DLQ lifecycle.
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class ManagerCommunicationsDeliveryJobs1711000000600 implements MigrationInterface {
  name = 'ManagerCommunicationsDeliveryJobs1711000000600';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "manager_communications_delivery_jobs" ("id" uuid CONSTRAINT "PK_manager_communications_delivery_jobs_id" PRIMARY KEY, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz NULL, "communication_id" uuid NOT NULL, "delivery_medium" varchar(16) NOT NULL, "status" varchar(20) NOT NULL DEFAULT 'QUEUED', "payload" jsonb NOT NULL DEFAULT '{}'::jsonb, "attempts" integer NOT NULL DEFAULT 0, "max_attempts" integer NOT NULL DEFAULT 5, "next_attempt_at" timestamptz NOT NULL DEFAULT now(), "last_error" text NULL)`);
    await queryRunner.query(`ALTER TABLE "manager_communications_delivery_jobs" DROP CONSTRAINT IF EXISTS "FK_manager_comm_delivery_jobs_communication_id"`);
    await queryRunner.query(`ALTER TABLE "manager_communications_delivery_jobs" ADD CONSTRAINT "FK_manager_comm_delivery_jobs_communication_id" FOREIGN KEY ("communication_id") REFERENCES "manager_communications"("id") ON DELETE RESTRICT`);
    await queryRunner.query(`ALTER TABLE "manager_communications_delivery_jobs" DROP CONSTRAINT IF EXISTS "CHK_manager_comm_delivery_medium"`);
    await queryRunner.query(`ALTER TABLE "manager_communications_delivery_jobs" ADD CONSTRAINT "CHK_manager_comm_delivery_medium" CHECK ("delivery_medium" IN ('EMAIL','WHATSAPP'))`);
    await queryRunner.query(`ALTER TABLE "manager_communications_delivery_jobs" DROP CONSTRAINT IF EXISTS "CHK_manager_comm_delivery_status"`);
    await queryRunner.query(`ALTER TABLE "manager_communications_delivery_jobs" ADD CONSTRAINT "CHK_manager_comm_delivery_status" CHECK ("status" IN ('QUEUED','PROCESSING','SENT','FAILED','DEAD_LETTER'))`);
    await queryRunner.query(`ALTER TABLE "manager_communications_delivery_jobs" DROP CONSTRAINT IF EXISTS "CHK_manager_comm_delivery_attempts_nonnegative"`);
    await queryRunner.query(`ALTER TABLE "manager_communications_delivery_jobs" ADD CONSTRAINT "CHK_manager_comm_delivery_attempts_nonnegative" CHECK ("attempts" >= 0)`);
    await queryRunner.query(`ALTER TABLE "manager_communications_delivery_jobs" DROP CONSTRAINT IF EXISTS "CHK_manager_comm_delivery_max_attempts_positive"`);
    await queryRunner.query(`ALTER TABLE "manager_communications_delivery_jobs" ADD CONSTRAINT "CHK_manager_comm_delivery_max_attempts_positive" CHECK ("max_attempts" >= 1)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_manager_comm_delivery_status_next_attempt" ON "manager_communications_delivery_jobs" ("status","next_attempt_at")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_manager_comm_delivery_communication_id" ON "manager_communications_delivery_jobs" ("communication_id")`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "manager_communications_delivery_jobs"`);
  }
}
