// RESPONSIBILITY: Creates the durable tenant realtime event history required for reconnect/replay semantics.
// FLOW: Migration runner -> admin_realtime_events -> realtime publisher persistence.
import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * @description Defines the AdminRealtimeEvents1743000000000 boundary for the admin_core_database backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminRealtimeEvents1743000000000 implements MigrationInterface {
  /**
   * @description Creates the append-only tenant realtime event table and its replay index.
   * @param queryRunner Active migration runner.
   * @returns Promise completion.
   */
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "admin_realtime_events" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "tenant_id" uuid NOT NULL, "event_name" varchar(200) NOT NULL, "payload" jsonb NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), CONSTRAINT "PK_admin_realtime_events_ID" PRIMARY KEY ("id"));`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_admin_realtime_events_tenant_created_at" ON "admin_realtime_events" ("tenant_id", "created_at");`);
  }

  /**
   * @description Removes the durable realtime history table during rollback.
   * @param queryRunner Active migration runner.
   * @returns Promise completion.
   */
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "admin_realtime_events";`);
  }
}
