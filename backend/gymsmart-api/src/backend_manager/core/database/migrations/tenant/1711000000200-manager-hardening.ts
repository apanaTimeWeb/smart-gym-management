// RESPONSIBILITY: Owns backend core database schema migration.
// FLOW: Migration runner → ordered schema change → reversible database state transition.
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class ManagerHardening1711000000200 implements MigrationInterface {
  name='ManagerHardening1711000000200';
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE INDEX IF NOT EXISTS \"IDX_manager_attendance_deleted_at\" ON \"manager_attendance\" (\"deleted_at\")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS \"IDX_manager_communications_deleted_at\" ON \"manager_communications\" (\"deleted_at\")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS \"IDX_manager_dashboard_deleted_at\" ON \"manager_dashboard\" (\"deleted_at\")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS \"IDX_manager_expenses_deleted_at\" ON \"manager_expenses\" (\"deleted_at\")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS \"IDX_manager_finance_deleted_at\" ON \"manager_finance\" (\"deleted_at\")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS \"IDX_manager_grievance_deleted_at\" ON \"manager_grievance\" (\"deleted_at\")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS \"IDX_manager_hrs_deleted_at\" ON \"manager_hrs\" (\"deleted_at\")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS \"IDX_manager_inquiries_deleted_at\" ON \"manager_inquiries\" (\"deleted_at\")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS \"IDX_manager_library_deleted_at\" ON \"manager_library\" (\"deleted_at\")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS \"IDX_manager_maintenance_deleted_at\" ON \"manager_maintenance\" (\"deleted_at\")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS \"IDX_manager_members_deleted_at\" ON \"manager_members\" (\"deleted_at\")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS \"IDX_manager_notifications_deleted_at\" ON \"manager_notifications\" (\"deleted_at\")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS \"IDX_manager_plans_deleted_at\" ON \"manager_plans\" (\"deleted_at\")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS \"IDX_manager_profiles_deleted_at\" ON \"manager_profiles\" (\"deleted_at\")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS \"IDX_manager_pts_deleted_at\" ON \"manager_pts\" (\"deleted_at\")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS \"IDX_manager_referrals_deleted_at\" ON \"manager_referrals\" (\"deleted_at\")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS \"IDX_manager_reports_deleted_at\" ON \"manager_reports\" (\"deleted_at\")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS \"IDX_manager_sales_deleted_at\" ON \"manager_sales\" (\"deleted_at\")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS \"IDX_manager_schedule_deleted_at\" ON \"manager_schedule\" (\"deleted_at\")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS \"IDX_manager_settings_deleted_at\" ON \"manager_settings\" (\"deleted_at\")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS \"IDX_manager_store_deleted_at\" ON \"manager_store\" (\"deleted_at\")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS \"IDX_manager_workout_deleted_at\" ON \"manager_workout\" (\"deleted_at\")');
  }
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX IF EXISTS \"IDX_manager_attendance_deleted_at\"');
    await queryRunner.query('DROP INDEX IF EXISTS \"IDX_manager_communications_deleted_at\"');
    await queryRunner.query('DROP INDEX IF EXISTS \"IDX_manager_dashboard_deleted_at\"');
    await queryRunner.query('DROP INDEX IF EXISTS \"IDX_manager_expenses_deleted_at\"');
    await queryRunner.query('DROP INDEX IF EXISTS \"IDX_manager_finance_deleted_at\"');
    await queryRunner.query('DROP INDEX IF EXISTS \"IDX_manager_grievance_deleted_at\"');
    await queryRunner.query('DROP INDEX IF EXISTS \"IDX_manager_hrs_deleted_at\"');
    await queryRunner.query('DROP INDEX IF EXISTS \"IDX_manager_inquiries_deleted_at\"');
    await queryRunner.query('DROP INDEX IF EXISTS \"IDX_manager_library_deleted_at\"');
    await queryRunner.query('DROP INDEX IF EXISTS \"IDX_manager_maintenance_deleted_at\"');
    await queryRunner.query('DROP INDEX IF EXISTS \"IDX_manager_members_deleted_at\"');
    await queryRunner.query('DROP INDEX IF EXISTS \"IDX_manager_notifications_deleted_at\"');
    await queryRunner.query('DROP INDEX IF EXISTS \"IDX_manager_plans_deleted_at\"');
    await queryRunner.query('DROP INDEX IF EXISTS \"IDX_manager_profiles_deleted_at\"');
    await queryRunner.query('DROP INDEX IF EXISTS \"IDX_manager_pts_deleted_at\"');
    await queryRunner.query('DROP INDEX IF EXISTS \"IDX_manager_referrals_deleted_at\"');
    await queryRunner.query('DROP INDEX IF EXISTS \"IDX_manager_reports_deleted_at\"');
    await queryRunner.query('DROP INDEX IF EXISTS \"IDX_manager_sales_deleted_at\"');
    await queryRunner.query('DROP INDEX IF EXISTS \"IDX_manager_schedule_deleted_at\"');
    await queryRunner.query('DROP INDEX IF EXISTS \"IDX_manager_settings_deleted_at\"');
    await queryRunner.query('DROP INDEX IF EXISTS \"IDX_manager_store_deleted_at\"');
    await queryRunner.query('DROP INDEX IF EXISTS \"IDX_manager_workout_deleted_at\"');
  }
}

