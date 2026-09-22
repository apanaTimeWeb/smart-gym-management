// RESPONSIBILITY: Applies non-destructive compatibility repairs to previously provisioned tenant databases.
// FLOW: Tenant provisioner/resolver → repair migration → tenant schema compatibility.

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoreTenantSchemaRepair20260922Migration implements MigrationInterface {
  name = 'CoreTenantSchemaRepair20260922Migration';

  /** Repairs legacy table names and adds trainer ownership columns without destructive data loss. */
  async up(q: QueryRunner): Promise<void> {
    const renames: Array<[string, string]> = [
      ['trainer_trainer_profiles', 'trainer_profiles'], ['trainer_trainer_diet_plans', 'trainer_diet_plans'],
      ['trainer_trainer_diet_plan_assignments', 'trainer_diet_plan_assignments'], ['trainer_trainer_workouts', 'trainer_workouts'],
      ['trainer_trainer_exercises', 'trainer_exercises'], ['trainer_trainer_attendance_records', 'trainer_attendance_records'],
      ['trainer_trainer_progress_entries', 'trainer_progress_entries'], ['trainer_trainer_weekly_availability', 'trainer_weekly_availability'],
      ['trainer_trainer_leave_requests', 'trainer_leave_requests'], ['trainer_trainer_sessions', 'trainer_sessions'],
      ['trainer_trainer_notifications', 'trainer_notifications'], ['trainer_trainer_notification_preferences', 'trainer_notification_preferences'],
      ['trainer_trainer_earnings_payouts', 'trainer_earnings_payouts'], ['trainer_trainer_earnings_history', 'trainer_earnings_history'],
    ];
    for (const [legacy, current] of renames) {
      const legacyExists = await q.query(`SELECT to_regclass($1) AS name`, [legacy]);
      const currentExists = await q.query(`SELECT to_regclass($1) AS name`, [current]);
      if (legacyExists[0]?.name && !currentExists[0]?.name) await q.query(`ALTER TABLE "${legacy}" RENAME TO "${current}"`);
    }
    await q.query(`DO $$ BEGIN CREATE TYPE leave_type_enum AS ENUM ('Sick Leave','Casual Leave','Emergency','Personal','Other'); EXCEPTION WHEN duplicate_object THEN NULL; END $$`);
    await q.query(`DO $$ BEGIN CREATE TYPE schedule_day_enum AS ENUM ('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'); EXCEPTION WHEN duplicate_object THEN NULL; END $$`);
    const dayColumn = await q.query(`SELECT data_type, udt_name FROM information_schema.columns WHERE table_name='trainer_weekly_availability' AND column_name='day'`);
    if (dayColumn[0]?.data_type === 'character varying') {
      await q.query(`ALTER TABLE trainer_weekly_availability ALTER COLUMN day TYPE schedule_day_enum USING day::schedule_day_enum`);
    }
    await q.query(`ALTER TABLE trainer_members ADD COLUMN IF NOT EXISTS assigned_diet_snapshot jsonb`);
    await q.query(`ALTER TABLE trainer_members ADD COLUMN IF NOT EXISTS assigned_workout_snapshot jsonb`);
    await q.query(`ALTER TABLE trainer_workouts ADD COLUMN IF NOT EXISTS trainer_id uuid`);
    await q.query(`ALTER TABLE trainer_exercises ADD COLUMN IF NOT EXISTS trainer_id uuid`);
    await q.query(`CREATE INDEX IF NOT EXISTS IDX_trainer_workouts_trainer_id ON trainer_workouts(trainer_id)`);
    await q.query(`CREATE INDEX IF NOT EXISTS IDX_trainer_exercises_trainer_id ON trainer_exercises(trainer_id)`);
    await q.query(`CREATE INDEX IF NOT EXISTS IDX_trainer_notifications_trainer_id_is_read ON trainer_notifications(trainer_id,is_read)`);
    await q.query(`CREATE INDEX IF NOT EXISTS IDX_trainer_members_assigned_trainer_id ON trainer_members(assigned_trainer_id)`);
    await q.query(`ALTER TABLE trainer_profiles ADD COLUMN IF NOT EXISTS commission_rate numeric(5,2) NOT NULL DEFAULT 0`);
    await q.query(`ALTER TABLE trainer_profiles ADD COLUMN IF NOT EXISTS commission_tier varchar(64) NOT NULL DEFAULT 'Standard'`);
    await q.query(`ALTER TABLE trainer_profiles ADD COLUMN IF NOT EXISTS bank_account_masked varchar(32)`);
    await q.query(`ALTER TABLE trainer_members ALTER COLUMN medical_restrictions TYPE text USING medical_restrictions::text`);
    await q.query(`ALTER TABLE trainer_members ALTER COLUMN medical_history TYPE text USING medical_history::text`);
    await q.query(`DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='CHK_trainer_members_age_non_negative') THEN ALTER TABLE trainer_members ADD CONSTRAINT CHK_trainer_members_age_non_negative CHECK (age IS NULL OR age >= 0); END IF; END $$`);
    await q.query(`CREATE INDEX IF NOT EXISTS IDX_trainer_members_assigned_trainer_id_status ON trainer_members(assigned_trainer_id,status)`);
    await q.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM pg_type WHERE typname='member_status_enum') THEN ALTER TYPE member_status_enum RENAME TO member_status_enum_legacy; END IF; EXCEPTION WHEN duplicate_object THEN NULL; END $$`);
    await q.query(`DO $$ BEGIN CREATE TYPE member_status_enum AS ENUM ('ACTIVE','INACTIVE','EXPIRED','PENDING'); EXCEPTION WHEN duplicate_object THEN NULL; END $$`);
    await q.query(`ALTER TABLE trainer_members ALTER COLUMN status TYPE member_status_enum USING UPPER(status::text)::member_status_enum`);
    await q.query(`DROP TYPE IF EXISTS member_status_enum_legacy`);
    await q.query(`DO $$ BEGIN CREATE TYPE member_gender_enum AS ENUM ('MALE','FEMALE','OTHER'); EXCEPTION WHEN duplicate_object THEN NULL; END $$`);
    await q.query(`DO $$ BEGIN CREATE TYPE member_billing_cycle_enum AS ENUM ('Monthly','Quarterly','Yearly'); EXCEPTION WHEN duplicate_object THEN NULL; END $$`);
    await q.query(`ALTER TABLE trainer_members ALTER COLUMN gender TYPE member_gender_enum USING UPPER(gender::text)::member_gender_enum`);    await q.query(`ALTER TABLE trainer_members DROP CONSTRAINT IF EXISTS CHK_trainer_members_status`);
    await q.query(`ALTER TABLE trainer_members ADD CONSTRAINT CHK_trainer_members_status CHECK (status IN ('ACTIVE','INACTIVE','EXPIRED','PENDING'))`);
    await q.query(`ALTER TABLE trainer_leave_requests ALTER COLUMN leave_type TYPE leave_type_enum USING leave_type::text::leave_type_enum`);

    await q.query(`ALTER TABLE trainer_members ALTER COLUMN billing_cycle TYPE member_billing_cycle_enum USING billing_cycle::member_billing_cycle_enum`);
    await q.query(`ALTER TABLE trainer_weekly_availability DROP CONSTRAINT IF EXISTS UQ_trainer_weekly_availability_trainer_day`);
    await q.query(`CREATE UNIQUE INDEX IF NOT EXISTS UQ_trainer_weekly_availability_active_trainer_day ON trainer_weekly_availability(trainer_id,day) WHERE deleted_at IS NULL`);
    await q.query(`CREATE UNIQUE INDEX IF NOT EXISTS UQ_trainer_attendance_open_staff ON trainer_attendance_records(staff_id) WHERE type='STAFF' AND check_out IS NULL AND deleted_at IS NULL`);


  }

  /** Compatibility down migration intentionally leaves user data in place. */
  async down(): Promise<void> { return; }
}
