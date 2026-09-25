// RESPONSIBILITY: Adds explicit read-model freshness metadata to Admin feature rows.
// FLOW: Migration -> feature table -> read_model_updated_at -> query-service freshness contract.
import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * @description Defines the AdminReadModelFreshness1741000000000 boundary for the admin_core_database backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminReadModelFreshness1741000000000 implements MigrationInterface {
  /** @description Adds read-model freshness markers to Admin feature tables. @param queryRunner Active migration runner. @returns Completion promise. */
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "admin_announcements" ADD COLUMN IF NOT EXISTS "read_model_updated_at" timestamptz NULL;`);
    await queryRunner.query(`UPDATE "admin_announcements" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`UPDATE "admin_announcements" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`ALTER TABLE "admin_attendance_records" ADD COLUMN IF NOT EXISTS "read_model_updated_at" timestamptz NULL;`);
    await queryRunner.query(`UPDATE "admin_attendance_records" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`UPDATE "admin_attendance_records" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`ALTER TABLE "admin_audit_log_views" ADD COLUMN IF NOT EXISTS "read_model_updated_at" timestamptz NULL;`);
    await queryRunner.query(`UPDATE "admin_audit_log_views" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`UPDATE "admin_audit_log_views" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`ALTER TABLE "admin_blacklisted_members" ADD COLUMN IF NOT EXISTS "read_model_updated_at" timestamptz NULL;`);
    await queryRunner.query(`UPDATE "admin_blacklisted_members" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`UPDATE "admin_blacklisted_members" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`ALTER TABLE "admin_branches" ADD COLUMN IF NOT EXISTS "read_model_updated_at" timestamptz NULL;`);
    await queryRunner.query(`UPDATE "admin_branches" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`UPDATE "admin_branches" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`ALTER TABLE "admin_campaigns" ADD COLUMN IF NOT EXISTS "read_model_updated_at" timestamptz NULL;`);
    await queryRunner.query(`UPDATE "admin_campaigns" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`UPDATE "admin_campaigns" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`ALTER TABLE "admin_coupons" ADD COLUMN IF NOT EXISTS "read_model_updated_at" timestamptz NULL;`);
    await queryRunner.query(`UPDATE "admin_coupons" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`UPDATE "admin_coupons" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`ALTER TABLE "admin_dashboard_snapshots" ADD COLUMN IF NOT EXISTS "read_model_updated_at" timestamptz NULL;`);
    await queryRunner.query(`UPDATE "admin_dashboard_snapshots" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`UPDATE "admin_dashboard_snapshots" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`ALTER TABLE "admin_data_export_jobs" ADD COLUMN IF NOT EXISTS "read_model_updated_at" timestamptz NULL;`);
    await queryRunner.query(`UPDATE "admin_data_export_jobs" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`UPDATE "admin_data_export_jobs" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`ALTER TABLE "admin_payment_transactions" ADD COLUMN IF NOT EXISTS "read_model_updated_at" timestamptz NULL;`);
    await queryRunner.query(`UPDATE "admin_payment_transactions" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`UPDATE "admin_payment_transactions" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`ALTER TABLE "admin_gym_health_alerts" ADD COLUMN IF NOT EXISTS "read_model_updated_at" timestamptz NULL;`);
    await queryRunner.query(`UPDATE "admin_gym_health_alerts" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`UPDATE "admin_gym_health_alerts" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`ALTER TABLE "admin_staff" ADD COLUMN IF NOT EXISTS "read_model_updated_at" timestamptz NULL;`);
    await queryRunner.query(`UPDATE "admin_staff" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`UPDATE "admin_staff" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`ALTER TABLE "admin_members" ADD COLUMN IF NOT EXISTS "read_model_updated_at" timestamptz NULL;`);
    await queryRunner.query(`UPDATE "admin_members" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`UPDATE "admin_members" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`ALTER TABLE "admin_notifications" ADD COLUMN IF NOT EXISTS "read_model_updated_at" timestamptz NULL;`);
    await queryRunner.query(`UPDATE "admin_notifications" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`UPDATE "admin_notifications" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`ALTER TABLE "admin_gym_payouts" ADD COLUMN IF NOT EXISTS "read_model_updated_at" timestamptz NULL;`);
    await queryRunner.query(`UPDATE "admin_gym_payouts" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`UPDATE "admin_gym_payouts" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`ALTER TABLE "admin_permission_overrides" ADD COLUMN IF NOT EXISTS "read_model_updated_at" timestamptz NULL;`);
    await queryRunner.query(`UPDATE "admin_permission_overrides" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`UPDATE "admin_permission_overrides" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`ALTER TABLE "admin_plans" ADD COLUMN IF NOT EXISTS "read_model_updated_at" timestamptz NULL;`);
    await queryRunner.query(`UPDATE "admin_plans" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`UPDATE "admin_plans" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`ALTER TABLE "admin_profiles" ADD COLUMN IF NOT EXISTS "read_model_updated_at" timestamptz NULL;`);
    await queryRunner.query(`UPDATE "admin_profiles" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`UPDATE "admin_profiles" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`ALTER TABLE "admin_report_snapshots" ADD COLUMN IF NOT EXISTS "read_model_updated_at" timestamptz NULL;`);
    await queryRunner.query(`UPDATE "admin_report_snapshots" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`UPDATE "admin_report_snapshots" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`ALTER TABLE "admin_sales_snapshots" ADD COLUMN IF NOT EXISTS "read_model_updated_at" timestamptz NULL;`);
    await queryRunner.query(`UPDATE "admin_sales_snapshots" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`UPDATE "admin_sales_snapshots" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`ALTER TABLE "admin_settings" ADD COLUMN IF NOT EXISTS "read_model_updated_at" timestamptz NULL;`);
    await queryRunner.query(`UPDATE "admin_settings" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`UPDATE "admin_settings" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`ALTER TABLE "admin_subscriptions" ADD COLUMN IF NOT EXISTS "read_model_updated_at" timestamptz NULL;`);
    await queryRunner.query(`UPDATE "admin_subscriptions" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`UPDATE "admin_subscriptions" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`ALTER TABLE "admin_usage_snapshots" ADD COLUMN IF NOT EXISTS "read_model_updated_at" timestamptz NULL;`);
    await queryRunner.query(`UPDATE "admin_usage_snapshots" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

    await queryRunner.query(`UPDATE "admin_usage_snapshots" SET "read_model_updated_at" = COALESCE("updated_at", "created_at", NOW()) WHERE "read_model_updated_at" IS NULL;`);
    // Existing rows are valid read-model rows as of their last mutation timestamp.

  }

  /** @description Removes read-model freshness markers. @param queryRunner Active migration runner. @returns Completion promise. */
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "admin_usage_snapshots" DROP COLUMN IF EXISTS "read_model_updated_at";`);
    await queryRunner.query(`ALTER TABLE "admin_subscriptions" DROP COLUMN IF EXISTS "read_model_updated_at";`);
    await queryRunner.query(`ALTER TABLE "admin_settings" DROP COLUMN IF EXISTS "read_model_updated_at";`);
    await queryRunner.query(`ALTER TABLE "admin_sales_snapshots" DROP COLUMN IF EXISTS "read_model_updated_at";`);
    await queryRunner.query(`ALTER TABLE "admin_report_snapshots" DROP COLUMN IF EXISTS "read_model_updated_at";`);
    await queryRunner.query(`ALTER TABLE "admin_profiles" DROP COLUMN IF EXISTS "read_model_updated_at";`);
    await queryRunner.query(`ALTER TABLE "admin_plans" DROP COLUMN IF EXISTS "read_model_updated_at";`);
    await queryRunner.query(`ALTER TABLE "admin_permission_overrides" DROP COLUMN IF EXISTS "read_model_updated_at";`);
    await queryRunner.query(`ALTER TABLE "admin_gym_payouts" DROP COLUMN IF EXISTS "read_model_updated_at";`);
    await queryRunner.query(`ALTER TABLE "admin_notifications" DROP COLUMN IF EXISTS "read_model_updated_at";`);
    await queryRunner.query(`ALTER TABLE "admin_members" DROP COLUMN IF EXISTS "read_model_updated_at";`);
    await queryRunner.query(`ALTER TABLE "admin_staff" DROP COLUMN IF EXISTS "read_model_updated_at";`);
    await queryRunner.query(`ALTER TABLE "admin_gym_health_alerts" DROP COLUMN IF EXISTS "read_model_updated_at";`);
    await queryRunner.query(`ALTER TABLE "admin_payment_transactions" DROP COLUMN IF EXISTS "read_model_updated_at";`);
    await queryRunner.query(`ALTER TABLE "admin_data_export_jobs" DROP COLUMN IF EXISTS "read_model_updated_at";`);
    await queryRunner.query(`ALTER TABLE "admin_dashboard_snapshots" DROP COLUMN IF EXISTS "read_model_updated_at";`);
    await queryRunner.query(`ALTER TABLE "admin_coupons" DROP COLUMN IF EXISTS "read_model_updated_at";`);
    await queryRunner.query(`ALTER TABLE "admin_campaigns" DROP COLUMN IF EXISTS "read_model_updated_at";`);
    await queryRunner.query(`ALTER TABLE "admin_branches" DROP COLUMN IF EXISTS "read_model_updated_at";`);
    await queryRunner.query(`ALTER TABLE "admin_blacklisted_members" DROP COLUMN IF EXISTS "read_model_updated_at";`);
    await queryRunner.query(`ALTER TABLE "admin_audit_log_views" DROP COLUMN IF EXISTS "read_model_updated_at";`);
    await queryRunner.query(`ALTER TABLE "admin_attendance_records" DROP COLUMN IF EXISTS "read_model_updated_at";`);
    await queryRunner.query(`ALTER TABLE "admin_announcements" DROP COLUMN IF EXISTS "read_model_updated_at";`);
  }
}
