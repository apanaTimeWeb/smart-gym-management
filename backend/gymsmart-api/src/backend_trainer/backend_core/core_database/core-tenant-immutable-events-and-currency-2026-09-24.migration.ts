// RESPONSIBILITY: Adds authoritative currency provenance and the append-only event log required for immutable analytics.
// FLOW: Migration runner → tenant schema → trainer_profiles.currency_code + immutable_domain_events + no-mutation trigger.

import type { MigrationInterface, QueryRunner } from 'typeorm';


/**
 * Intent: Defines the CoreTenantImmutableEventsAndCurrency20260924Migration boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class CoreTenantImmutableEventsAndCurrency20260924Migration implements MigrationInterface {
  /** Adds the centrally projected currency field and append-only immutable event storage. */
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE trainer_profiles ADD COLUMN IF NOT EXISTS currency_code varchar(3) NOT NULL DEFAULT 'INR'`);
    await queryRunner.query(`ALTER TABLE trainer_profiles ADD CONSTRAINT CHK_trainer_profiles_currency_code CHECK (currency_code ~ '^[A-Z]{3}$')`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS immutable_domain_events (id uuid NOT NULL DEFAULT gen_random_uuid(), CONSTRAINT PK_immutable_domain_events PRIMARY KEY(id), event_name varchar(160) NOT NULL, aggregate_type varchar(120) NOT NULL, aggregate_id uuid NOT NULL, actor_id uuid, occurred_at timestamptz NOT NULL, payload jsonb NOT NULL, event_version integer NOT NULL DEFAULT 1, created_at timestamptz NOT NULL DEFAULT now(), CONSTRAINT CHK_immutable_domain_events_event_name CHECK (event_name ~ '^[A-Z0-9_]+\\.[A-Z0-9_]+\\.[A-Z0-9_]+$'), CONSTRAINT CHK_immutable_domain_events_event_version CHECK (event_version > 0))`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS IDX_immutable_domain_events_aggregate ON immutable_domain_events(aggregate_type, aggregate_id)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS IDX_immutable_domain_events_name_occurred ON immutable_domain_events(event_name, occurred_at)`);
    await queryRunner.query(`CREATE OR REPLACE FUNCTION prevent_immutable_domain_event_mutation() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'immutable_domain_events is append-only'; END; $$`);
    await queryRunner.query(`DROP TRIGGER IF EXISTS TRG_immutable_domain_events_no_update ON immutable_domain_events`);
    await queryRunner.query(`DROP TRIGGER IF EXISTS TRG_immutable_domain_events_no_delete ON immutable_domain_events`);
    await queryRunner.query(`CREATE TRIGGER TRG_immutable_domain_events_no_update BEFORE UPDATE ON immutable_domain_events FOR EACH ROW EXECUTE FUNCTION prevent_immutable_domain_event_mutation()`);
    await queryRunner.query(`CREATE TRIGGER TRG_immutable_domain_events_no_delete BEFORE DELETE ON immutable_domain_events FOR EACH ROW EXECUTE FUNCTION prevent_immutable_domain_event_mutation()`);
  }

  /** Removes only the additive trigger/table and currency column introduced by this migration. */
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TRIGGER IF EXISTS TRG_immutable_domain_events_no_update ON immutable_domain_events`);
    await queryRunner.query(`DROP TRIGGER IF EXISTS TRG_immutable_domain_events_no_delete ON immutable_domain_events`);
    await queryRunner.query(`DROP TABLE IF EXISTS immutable_domain_events`);
    await queryRunner.query(`DROP FUNCTION IF EXISTS prevent_immutable_domain_event_mutation()`);
    await queryRunner.query(`ALTER TABLE trainer_profiles DROP CONSTRAINT IF EXISTS CHK_trainer_profiles_currency_code`);
    await queryRunner.query(`ALTER TABLE trainer_profiles DROP COLUMN IF EXISTS currency_code`);
  }
}
