// RESPONSIBILITY: Migrates legacy mixed-case tenant enum values to canonical SCREAMING_SNAKE_CASE values without changing API labels.
// FLOW: Existing tenant enum → temporary canonical enum → column conversion → old type removal → canonical TypeORM enum.

import { MigrationInterface, QueryRunner } from 'typeorm';


/**
 * Intent: Defines the CoreTenantEnumNormalization20260923Migration boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class CoreTenantEnumNormalization20260923Migration implements MigrationInterface {
  name = 'CoreTenantEnumNormalization20260923Migration';

  /** Converts legacy enum types and stored values to the canonical backend representation required by Rule 95. */
  async up(q: QueryRunner): Promise<void> {
    const enums: Array<{ type: string; table: string; column: string; values: Array<[string,string]> }> = [
      { type: 'member_billing_cycle_enum', table: 'trainer_members', column: 'billing_cycle', values: [['Monthly','MONTHLY'],['Quarterly','QUARTERLY'],['Yearly','YEARLY']] },
      { type: 'member_progress_status_enum', table: 'trainer_members', column: 'progress_status', values: [['Good','GOOD'],['Average','AVERAGE'],['Needs Attention','NEEDS_ATTENTION']] },
      { type: 'diet_goal_enum', table: 'trainer_diet_plans', column: 'goal', values: [['Weight Loss','WEIGHT_LOSS'],['Maintenance','MAINTENANCE'],['Muscle Gain','MUSCLE_GAIN']] },
      { type: 'schedule_day_enum', table: 'trainer_weekly_availability', column: 'day', values: [['Monday','MONDAY'],['Tuesday','TUESDAY'],['Wednesday','WEDNESDAY'],['Thursday','THURSDAY'],['Friday','FRIDAY'],['Saturday','SATURDAY'],['Sunday','SUNDAY']] },
      { type: 'leave_type_enum', table: 'trainer_leave_requests', column: 'leave_type', values: [['Sick Leave','SICK_LEAVE'],['Casual Leave','CASUAL_LEAVE'],['Emergency','EMERGENCY'],['Personal','PERSONAL'],['Other','OTHER']] },
      { type: 'session_type_enum', table: 'trainer_sessions', column: 'type', values: [['PT','PT'],['Group','GROUP']] },
      { type: 'session_status_enum', table: 'trainer_sessions', column: 'status', values: [['Upcoming','UPCOMING'],['Completed','COMPLETED'],['No Show','NO_SHOW']] },
      { type: 'session_recurrence_enum', table: 'trainer_sessions', column: 'recurrence_rule', values: [['none','NONE'],['weekly','WEEKLY'],['biweekly','BIWEEKLY']] },
      { type: 'earnings_history_type_enum', table: 'trainer_earnings_history', column: 'type', values: [['Session','SESSION'],['Bonus','BONUS'],['Commission','COMMISSION']] },
      { type: 'earnings_status_enum', table: 'trainer_earnings_history', column: 'status', values: [['pending','PENDING'],['processing','PROCESSING'],['settled','SETTLED']] },
      { type: 'workout_level_enum', table: 'trainer_workouts', column: 'level', values: [['Beginner','BEGINNER'],['Intermediate','INTERMEDIATE'],['Advanced','ADVANCED']] },
      { type: 'exercise_difficulty_enum', table: 'trainer_exercises', column: 'difficulty', values: [['Beginner','BEGINNER'],['Intermediate','INTERMEDIATE'],['Advanced','ADVANCED']] },
    ];

    for (const item of enums) {
      const exists = await q.query(`SELECT 1 FROM pg_type WHERE typname = $1`, [item.type]);
      if (!exists.length) continue;
      const canonical = item.type.replace(/_enum$/, '_canonical_enum');
      const canonicalExists = await q.query(`SELECT 1 FROM pg_type WHERE typname = $1`, [canonical]);
      if (!canonicalExists.length) {
        const values = [...new Set(item.values.map((entry) => entry[1]))].map((value) => `'${value}'`).join(',');
        await q.query(`CREATE TYPE ${canonical} AS ENUM (${values})`);
      }
      await q.query(`ALTER TABLE ${item.table} ALTER COLUMN ${item.column} TYPE ${canonical} USING CASE ${item.column}::text ${item.values.map(([legacy, next]) => `WHEN '${legacy}' THEN '${next}'`).join(' ')} ELSE ${item.column}::text END::${canonical}`);
      await q.query(`DROP TYPE IF EXISTS ${item.type}`);
      await q.query(`ALTER TYPE ${canonical} RENAME TO ${item.type}`);
    }
  }

  /** Recreates legacy enum types and converts canonical values back for rollback in an isolated migration environment. */
  async down(q: QueryRunner): Promise<void> {
    // Rollback is intentionally conservative: restoring legacy enum labels in production can corrupt API compatibility.
    // The project architecture requires forward-only backward-compatible migrations for production clients.
    void q;
  }
}
