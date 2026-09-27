// RESPONSIBILITY: Adds append-only Manager event history and double-entry ledger storage.
// FLOW: Tenant migration -> immutable event log + ledger tables -> named constraints and indexes.
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class ManagerImmutableEventsAndLedger1711000000700 implements MigrationInterface {
  name = 'ManagerImmutableEventsAndLedger1711000000700';

  /** @description Creates immutable domain-event and double-entry ledger tables with explicit integrity constraints. @param queryRunner - TypeORM migration runner. @returns Nothing. */
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "manager_events_log" ("id" uuid CONSTRAINT "PK_manager_events_log_id" PRIMARY KEY, "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" timestamptz NULL, "event_name" varchar(160) NOT NULL, "source_entity" varchar(96) NOT NULL, "source_entity_id" uuid NULL, "payload" jsonb NOT NULL DEFAULT '{}'::jsonb, "occurred_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP)`);
    await queryRunner.query(`ALTER TABLE "manager_events_log" ADD CONSTRAINT "CHK_manager_events_log_payload_object" CHECK (jsonb_typeof(payload) = 'object')`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_manager_events_log_name_created_at" ON "manager_events_log" ("event_name","created_at")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_manager_events_log_source_entity_created_at" ON "manager_events_log" ("source_entity","source_entity_id","created_at")`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "manager_ledger_entries" ("id" uuid CONSTRAINT "PK_manager_ledger_entries_id" PRIMARY KEY, "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" timestamptz NULL, "transaction_id" uuid NOT NULL, "account_id" varchar(96) NOT NULL, "entry_type" varchar(16) NOT NULL, "amount_minor" bigint NOT NULL, "currency" varchar(3) NOT NULL, "source_record_id" uuid NOT NULL, "metadata" jsonb NOT NULL DEFAULT '{}'::jsonb)`);
    await queryRunner.query(`ALTER TABLE "manager_ledger_entries" ADD CONSTRAINT "CHK_manager_ledger_entries_amount_positive" CHECK (amount_minor > 0)`);
    await queryRunner.query(`ALTER TABLE "manager_ledger_entries" ADD CONSTRAINT "CHK_manager_ledger_entries_entry_type" CHECK (entry_type IN ('DEBIT','CREDIT'))`);
    await queryRunner.query(`ALTER TABLE "manager_ledger_entries" ADD CONSTRAINT "CHK_manager_ledger_entries_currency" CHECK (currency ~ '^[A-Z]{3}$')`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_manager_ledger_entries_transaction_id" ON "manager_ledger_entries" ("transaction_id")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_manager_ledger_entries_account_id" ON "manager_ledger_entries" ("account_id")`);
    await queryRunner.query(`CREATE OR REPLACE FUNCTION manager_prevent_immutable_mutation() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'IMMUTABLE_RECORD'; END; $$`);
    await queryRunner.query(`DROP TRIGGER IF EXISTS "TRG_manager_events_log_immutable" ON "manager_events_log"`);
    await queryRunner.query(`CREATE TRIGGER "TRG_manager_events_log_immutable" BEFORE UPDATE OR DELETE ON "manager_events_log" FOR EACH ROW EXECUTE FUNCTION manager_prevent_immutable_mutation()`);
    await queryRunner.query(`DROP TRIGGER IF EXISTS "TRG_manager_ledger_entries_immutable" ON "manager_ledger_entries"`);
    await queryRunner.query(`CREATE TRIGGER "TRG_manager_ledger_entries_immutable" BEFORE UPDATE OR DELETE ON "manager_ledger_entries" FOR EACH ROW EXECUTE FUNCTION manager_prevent_immutable_mutation()`);
  }

  /** @description Drops only objects created by this migration while preserving all business records elsewhere. @param queryRunner - TypeORM migration runner. @returns Nothing. */
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TRIGGER IF EXISTS "TRG_manager_ledger_entries_immutable" ON "manager_ledger_entries"`);
    await queryRunner.query(`DROP TRIGGER IF EXISTS "TRG_manager_events_log_immutable" ON "manager_events_log"`);
    await queryRunner.query(`DROP FUNCTION IF EXISTS manager_prevent_immutable_mutation()`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_manager_ledger_entries_account_id"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_manager_ledger_entries_transaction_id"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "manager_ledger_entries"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_manager_events_log_source_entity_created_at"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_manager_events_log_name_created_at"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "manager_events_log"`);
  }
}
