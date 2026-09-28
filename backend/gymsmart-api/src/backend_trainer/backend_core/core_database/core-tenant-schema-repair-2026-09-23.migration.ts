// RESPONSIBILITY: Applies safe Trainer tenant schema fixes that must execute after the original and legacy repair migrations.
// FLOW: Tenant provisioning → prior migrations → 2026-09-23 repair → constraints/indexes.

import { MigrationInterface, QueryRunner } from 'typeorm';


/**
 * Intent: Defines the CoreTenantSchemaRepair20260923Migration boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class CoreTenantSchemaRepair20260923Migration implements MigrationInterface {
  name = 'CoreTenantSchemaRepair20260923Migration';

  /** Adds deterministic same-tenant constraints required by the repaired Trainer persistence model. */
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='FK_trainer_workouts_trainer_members_assigned_member_id') THEN ALTER TABLE trainer_workouts ADD CONSTRAINT FK_trainer_workouts_trainer_members_assigned_member_id FOREIGN KEY(assigned_member_id) REFERENCES trainer_members(id); END IF; END $$`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS IDX_trainer_members_assigned_trainer_id_plan ON trainer_members(assigned_trainer_id,plan_id)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS IDX_trainer_progress_entries_member_id_created_at ON trainer_progress_entries(member_id,created_at)`);
  }

  /** Leaves data intact because all repairs are additive. */
  async down(): Promise<void> {
    return;
  }
}
