// RESPONSIBILITY: Adds the optional Trainer session recurrence end-date column using a backward-compatible migration.
// FLOW: Migration runner → tenant DB → trainer_sessions.recurrence_end_date.

import type { MigrationInterface, QueryRunner } from 'typeorm';


/**
 * Intent: Defines the CoreTrainerSessionRecurrenceEndDate20260924Migration boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class CoreTrainerSessionRecurrenceEndDate20260924Migration implements MigrationInterface {
  /** Adds the nullable recurrence end date required by the Trainer Sessions contract. */
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE trainer_sessions ADD COLUMN IF NOT EXISTS recurrence_end_date date`);
  }

  /** Rolls back only the additive recurrence-end-date column. */
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE trainer_sessions DROP COLUMN IF EXISTS recurrence_end_date`);
  }
}
