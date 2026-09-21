// RESPONSIBILITY: Creates tenant feature tables with explicit PostgreSQL constraints and soft-delete columns.
// FLOW: TypeORM migration -> tenant PostgreSQL DB -> feature tables/indexes.

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoreTenantInitial1710000000001 implements MigrationInterface {
  name = 'CoreTenantInitial1710000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');
    await queryRunner.query(`CREATE TABLE "announcements" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(200),
      "status" varchar(64),
      "branch_id" uuid,
      "amount_minor" bigint,
      "is_pinned" boolean NOT NULL DEFAULT false,
      "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now(),
      "deleted_at" timestamptz,
      CONSTRAINT "PK_announcements" PRIMARY KEY ("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_announcements_created_at" ON "announcements" ("created_at")');
    await queryRunner.query('CREATE INDEX "IDX_announcements_status" ON "announcements" ("status")');
    await queryRunner.query('CREATE INDEX "IDX_announcements_branch_id" ON "announcements" ("branch_id")');
    await queryRunner.query('CREATE INDEX "IDX_announcements_deleted_at" ON "announcements" ("deleted_at")');
    await queryRunner.query(`CREATE TABLE "attendance_records" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(200),
      "status" varchar(64),
      "branch_id" uuid,
      "amount_minor" bigint,
      "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now(),
      "deleted_at" timestamptz,
      CONSTRAINT "PK_attendance_records" PRIMARY KEY ("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_attendance_records_created_at" ON "attendance_records" ("created_at")');
    await queryRunner.query('CREATE INDEX "IDX_attendance_records_status" ON "attendance_records" ("status")');
    await queryRunner.query('CREATE INDEX "IDX_attendance_records_branch_id" ON "attendance_records" ("branch_id")');
    await queryRunner.query('CREATE INDEX "IDX_attendance_records_deleted_at" ON "attendance_records" ("deleted_at")');
    await queryRunner.query(`CREATE TABLE "audit_log_views" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(200),
      "status" varchar(64),
      "branch_id" uuid,
      "amount_minor" bigint,
      "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now(),
      "deleted_at" timestamptz,
      CONSTRAINT "PK_audit_log_views" PRIMARY KEY ("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_audit_log_views_created_at" ON "audit_log_views" ("created_at")');
    await queryRunner.query('CREATE INDEX "IDX_audit_log_views_status" ON "audit_log_views" ("status")');
    await queryRunner.query('CREATE INDEX "IDX_audit_log_views_branch_id" ON "audit_log_views" ("branch_id")');
    await queryRunner.query('CREATE INDEX "IDX_audit_log_views_deleted_at" ON "audit_log_views" ("deleted_at")');
    await queryRunner.query(`CREATE TABLE "blacklisted_members" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(200),
      "status" varchar(64),
      "branch_id" uuid,
      "amount_minor" bigint,
      "member_id" uuid,
      "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now(),
      "deleted_at" timestamptz,
      CONSTRAINT "PK_blacklisted_members" PRIMARY KEY ("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_blacklisted_members_created_at" ON "blacklisted_members" ("created_at")');
    await queryRunner.query('CREATE INDEX "IDX_blacklisted_members_status" ON "blacklisted_members" ("status")');
    await queryRunner.query('CREATE INDEX "IDX_blacklisted_members_branch_id" ON "blacklisted_members" ("branch_id")');
    await queryRunner.query('CREATE INDEX "IDX_blacklisted_members_deleted_at" ON "blacklisted_members" ("deleted_at")');
    await queryRunner.query(`CREATE TABLE "branches" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(200),
      "status" varchar(64),
      "branch_id" uuid,
      "amount_minor" bigint,
      "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now(),
      "deleted_at" timestamptz,
      CONSTRAINT "PK_branches" PRIMARY KEY ("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_branches_created_at" ON "branches" ("created_at")');
    await queryRunner.query('CREATE INDEX "IDX_branches_status" ON "branches" ("status")');
    await queryRunner.query('CREATE INDEX "IDX_branches_branch_id" ON "branches" ("branch_id")');
    await queryRunner.query('CREATE INDEX "IDX_branches_deleted_at" ON "branches" ("deleted_at")');
    await queryRunner.query(`CREATE TABLE "campaigns" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(200),
      "status" varchar(64),
      "branch_id" uuid,
      "amount_minor" bigint,
      "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now(),
      "deleted_at" timestamptz,
      CONSTRAINT "PK_campaigns" PRIMARY KEY ("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_campaigns_created_at" ON "campaigns" ("created_at")');
    await queryRunner.query('CREATE INDEX "IDX_campaigns_status" ON "campaigns" ("status")');
    await queryRunner.query('CREATE INDEX "IDX_campaigns_branch_id" ON "campaigns" ("branch_id")');
    await queryRunner.query('CREATE INDEX "IDX_campaigns_deleted_at" ON "campaigns" ("deleted_at")');
    await queryRunner.query(`CREATE TABLE "coupons" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(200),
      "status" varchar(64),
      "branch_id" uuid,
      "amount_minor" bigint,
      "code" varchar(80),
      "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now(),
      "deleted_at" timestamptz,
      CONSTRAINT "PK_coupons" PRIMARY KEY ("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_coupons_created_at" ON "coupons" ("created_at")');
    await queryRunner.query('CREATE INDEX "IDX_coupons_status" ON "coupons" ("status")');
    await queryRunner.query('CREATE INDEX "IDX_coupons_branch_id" ON "coupons" ("branch_id")');
    await queryRunner.query('CREATE INDEX "IDX_coupons_deleted_at" ON "coupons" ("deleted_at")');
    await queryRunner.query(`CREATE TABLE "dashboard_snapshots" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(200),
      "status" varchar(64),
      "branch_id" uuid,
      "amount_minor" bigint,
      "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now(),
      "deleted_at" timestamptz,
      CONSTRAINT "PK_dashboard_snapshots" PRIMARY KEY ("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_dashboard_snapshots_created_at" ON "dashboard_snapshots" ("created_at")');
    await queryRunner.query('CREATE INDEX "IDX_dashboard_snapshots_status" ON "dashboard_snapshots" ("status")');
    await queryRunner.query('CREATE INDEX "IDX_dashboard_snapshots_branch_id" ON "dashboard_snapshots" ("branch_id")');
    await queryRunner.query('CREATE INDEX "IDX_dashboard_snapshots_deleted_at" ON "dashboard_snapshots" ("deleted_at")');
    await queryRunner.query(`CREATE TABLE "data_export_jobs" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(200),
      "status" varchar(64),
      "branch_id" uuid,
      "amount_minor" bigint,
      "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now(),
      "deleted_at" timestamptz,
      CONSTRAINT "PK_data_export_jobs" PRIMARY KEY ("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_data_export_jobs_created_at" ON "data_export_jobs" ("created_at")');
    await queryRunner.query('CREATE INDEX "IDX_data_export_jobs_status" ON "data_export_jobs" ("status")');
    await queryRunner.query('CREATE INDEX "IDX_data_export_jobs_branch_id" ON "data_export_jobs" ("branch_id")');
    await queryRunner.query('CREATE INDEX "IDX_data_export_jobs_deleted_at" ON "data_export_jobs" ("deleted_at")');
    await queryRunner.query(`CREATE TABLE "payment_transactions" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(200),
      "status" varchar(64),
      "branch_id" uuid,
      "amount_minor" bigint,
      "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now(),
      "deleted_at" timestamptz,
      CONSTRAINT "PK_payment_transactions" PRIMARY KEY ("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_payment_transactions_created_at" ON "payment_transactions" ("created_at")');
    await queryRunner.query('CREATE INDEX "IDX_payment_transactions_status" ON "payment_transactions" ("status")');
    await queryRunner.query('CREATE INDEX "IDX_payment_transactions_branch_id" ON "payment_transactions" ("branch_id")');
    await queryRunner.query('CREATE INDEX "IDX_payment_transactions_deleted_at" ON "payment_transactions" ("deleted_at")');
    await queryRunner.query(`CREATE TABLE "gym_health_alerts" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(200),
      "status" varchar(64),
      "branch_id" uuid,
      "amount_minor" bigint,
      "severity" varchar(16),
      "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now(),
      "deleted_at" timestamptz,
      CONSTRAINT "PK_gym_health_alerts" PRIMARY KEY ("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_gym_health_alerts_created_at" ON "gym_health_alerts" ("created_at")');
    await queryRunner.query('CREATE INDEX "IDX_gym_health_alerts_status" ON "gym_health_alerts" ("status")');
    await queryRunner.query('CREATE INDEX "IDX_gym_health_alerts_branch_id" ON "gym_health_alerts" ("branch_id")');
    await queryRunner.query('CREATE INDEX "IDX_gym_health_alerts_deleted_at" ON "gym_health_alerts" ("deleted_at")');
    await queryRunner.query(`CREATE TABLE "staff" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(200),
      "status" varchar(64),
      "branch_id" uuid,
      "amount_minor" bigint,
      "employee_id" varchar(80),
      "salary_minor" bigint,
      "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now(),
      "deleted_at" timestamptz,
      CONSTRAINT "PK_staff" PRIMARY KEY ("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_staff_created_at" ON "staff" ("created_at")');
    await queryRunner.query('CREATE INDEX "IDX_staff_status" ON "staff" ("status")');
    await queryRunner.query('CREATE INDEX "IDX_staff_branch_id" ON "staff" ("branch_id")');
    await queryRunner.query('CREATE INDEX "IDX_staff_deleted_at" ON "staff" ("deleted_at")');
    await queryRunner.query(`CREATE TABLE "members" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(200),
      "status" varchar(64),
      "branch_id" uuid,
      "amount_minor" bigint,
      "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now(),
      "deleted_at" timestamptz,
      CONSTRAINT "PK_members" PRIMARY KEY ("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_members_created_at" ON "members" ("created_at")');
    await queryRunner.query('CREATE INDEX "IDX_members_status" ON "members" ("status")');
    await queryRunner.query('CREATE INDEX "IDX_members_branch_id" ON "members" ("branch_id")');
    await queryRunner.query('CREATE INDEX "IDX_members_deleted_at" ON "members" ("deleted_at")');
    await queryRunner.query(`CREATE TABLE "notifications" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(200),
      "status" varchar(64),
      "branch_id" uuid,
      "amount_minor" bigint,
      "read" boolean NOT NULL DEFAULT false,
      "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now(),
      "deleted_at" timestamptz,
      CONSTRAINT "PK_notifications" PRIMARY KEY ("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_notifications_created_at" ON "notifications" ("created_at")');
    await queryRunner.query('CREATE INDEX "IDX_notifications_status" ON "notifications" ("status")');
    await queryRunner.query('CREATE INDEX "IDX_notifications_branch_id" ON "notifications" ("branch_id")');
    await queryRunner.query('CREATE INDEX "IDX_notifications_deleted_at" ON "notifications" ("deleted_at")');
    await queryRunner.query(`CREATE TABLE "gym_payouts" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(200),
      "status" varchar(64),
      "branch_id" uuid,
      "amount_minor" bigint,
      "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now(),
      "deleted_at" timestamptz,
      CONSTRAINT "PK_gym_payouts" PRIMARY KEY ("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_gym_payouts_created_at" ON "gym_payouts" ("created_at")');
    await queryRunner.query('CREATE INDEX "IDX_gym_payouts_status" ON "gym_payouts" ("status")');
    await queryRunner.query('CREATE INDEX "IDX_gym_payouts_branch_id" ON "gym_payouts" ("branch_id")');
    await queryRunner.query('CREATE INDEX "IDX_gym_payouts_deleted_at" ON "gym_payouts" ("deleted_at")');
    await queryRunner.query(`CREATE TABLE "permission_overrides" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(200),
      "status" varchar(64),
      "branch_id" uuid,
      "amount_minor" bigint,
      "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now(),
      "deleted_at" timestamptz,
      CONSTRAINT "PK_permission_overrides" PRIMARY KEY ("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_permission_overrides_created_at" ON "permission_overrides" ("created_at")');
    await queryRunner.query('CREATE INDEX "IDX_permission_overrides_status" ON "permission_overrides" ("status")');
    await queryRunner.query('CREATE INDEX "IDX_permission_overrides_branch_id" ON "permission_overrides" ("branch_id")');
    await queryRunner.query('CREATE INDEX "IDX_permission_overrides_deleted_at" ON "permission_overrides" ("deleted_at")');
    await queryRunner.query(`CREATE TABLE "plans" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(200),
      "status" varchar(64),
      "branch_id" uuid,
      "amount_minor" bigint,
      "tier" varchar(32),
      "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now(),
      "deleted_at" timestamptz,
      CONSTRAINT "PK_plans" PRIMARY KEY ("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_plans_created_at" ON "plans" ("created_at")');
    await queryRunner.query('CREATE INDEX "IDX_plans_status" ON "plans" ("status")');
    await queryRunner.query('CREATE INDEX "IDX_plans_branch_id" ON "plans" ("branch_id")');
    await queryRunner.query('CREATE INDEX "IDX_plans_deleted_at" ON "plans" ("deleted_at")');
    await queryRunner.query(`CREATE TABLE "admin_profiles" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(200),
      "status" varchar(64),
      "branch_id" uuid,
      "amount_minor" bigint,
      "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now(),
      "deleted_at" timestamptz,
      CONSTRAINT "PK_admin_profiles" PRIMARY KEY ("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_admin_profiles_created_at" ON "admin_profiles" ("created_at")');
    await queryRunner.query('CREATE INDEX "IDX_admin_profiles_status" ON "admin_profiles" ("status")');
    await queryRunner.query('CREATE INDEX "IDX_admin_profiles_branch_id" ON "admin_profiles" ("branch_id")');
    await queryRunner.query('CREATE INDEX "IDX_admin_profiles_deleted_at" ON "admin_profiles" ("deleted_at")');
    await queryRunner.query(`CREATE TABLE "report_snapshots" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(200),
      "status" varchar(64),
      "branch_id" uuid,
      "amount_minor" bigint,
      "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now(),
      "deleted_at" timestamptz,
      CONSTRAINT "PK_report_snapshots" PRIMARY KEY ("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_report_snapshots_created_at" ON "report_snapshots" ("created_at")');
    await queryRunner.query('CREATE INDEX "IDX_report_snapshots_status" ON "report_snapshots" ("status")');
    await queryRunner.query('CREATE INDEX "IDX_report_snapshots_branch_id" ON "report_snapshots" ("branch_id")');
    await queryRunner.query('CREATE INDEX "IDX_report_snapshots_deleted_at" ON "report_snapshots" ("deleted_at")');
    await queryRunner.query(`CREATE TABLE "sales_snapshots" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(200),
      "status" varchar(64),
      "branch_id" uuid,
      "amount_minor" bigint,
      "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now(),
      "deleted_at" timestamptz,
      CONSTRAINT "PK_sales_snapshots" PRIMARY KEY ("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_sales_snapshots_created_at" ON "sales_snapshots" ("created_at")');
    await queryRunner.query('CREATE INDEX "IDX_sales_snapshots_status" ON "sales_snapshots" ("status")');
    await queryRunner.query('CREATE INDEX "IDX_sales_snapshots_branch_id" ON "sales_snapshots" ("branch_id")');
    await queryRunner.query('CREATE INDEX "IDX_sales_snapshots_deleted_at" ON "sales_snapshots" ("deleted_at")');
    await queryRunner.query(`CREATE TABLE "admin_settings" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(200),
      "status" varchar(64),
      "branch_id" uuid,
      "amount_minor" bigint,
      "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now(),
      "deleted_at" timestamptz,
      CONSTRAINT "PK_admin_settings" PRIMARY KEY ("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_admin_settings_created_at" ON "admin_settings" ("created_at")');
    await queryRunner.query('CREATE INDEX "IDX_admin_settings_status" ON "admin_settings" ("status")');
    await queryRunner.query('CREATE INDEX "IDX_admin_settings_branch_id" ON "admin_settings" ("branch_id")');
    await queryRunner.query('CREATE INDEX "IDX_admin_settings_deleted_at" ON "admin_settings" ("deleted_at")');
    await queryRunner.query(`CREATE TABLE "subscriptions" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(200),
      "status" varchar(64),
      "branch_id" uuid,
      "amount_minor" bigint,
      "plan_id" uuid,
      "auto_renew" boolean NOT NULL DEFAULT true,
      "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now(),
      "deleted_at" timestamptz,
      CONSTRAINT "PK_subscriptions" PRIMARY KEY ("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_subscriptions_created_at" ON "subscriptions" ("created_at")');
    await queryRunner.query('CREATE INDEX "IDX_subscriptions_status" ON "subscriptions" ("status")');
    await queryRunner.query('CREATE INDEX "IDX_subscriptions_branch_id" ON "subscriptions" ("branch_id")');
    await queryRunner.query('CREATE INDEX "IDX_subscriptions_deleted_at" ON "subscriptions" ("deleted_at")');
    await queryRunner.query(`CREATE TABLE "usage_snapshots" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(200),
      "status" varchar(64),
      "branch_id" uuid,
      "amount_minor" bigint,
      "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now(),
      "deleted_at" timestamptz,
      CONSTRAINT "PK_usage_snapshots" PRIMARY KEY ("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_usage_snapshots_created_at" ON "usage_snapshots" ("created_at")');
    await queryRunner.query('CREATE INDEX "IDX_usage_snapshots_status" ON "usage_snapshots" ("status")');
    await queryRunner.query('CREATE INDEX "IDX_usage_snapshots_branch_id" ON "usage_snapshots" ("branch_id")');
    await queryRunner.query('CREATE INDEX "IDX_usage_snapshots_deleted_at" ON "usage_snapshots" ("deleted_at")');
    await queryRunner.query(`
      CREATE TABLE "audit_logs" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "actor_id" uuid NOT NULL,
        "actor_role" varchar(32) NOT NULL,
        "action" varchar(120) NOT NULL,
        "entity_type" varchar(120) NOT NULL,
        "entity_id" uuid,
        "old_value" jsonb,
        "new_value" jsonb,
        "ip_address" inet,
        "timestamp" timestamptz NOT NULL DEFAULT now(),
        "severity" varchar(16) NOT NULL DEFAULT 'low',
        "module" varchar(80) NOT NULL,
        CONSTRAINT "PK_audit_logs" PRIMARY KEY ("id")
      )`);
    await queryRunner.query('CREATE INDEX "IDX_audit_logs_timestamp" ON "audit_logs" ("timestamp")');
    await queryRunner.query('CREATE INDEX "IDX_audit_logs_entity_type" ON "audit_logs" ("entity_type")');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "usage_snapshots"');
    await queryRunner.query('DROP TABLE IF EXISTS "subscriptions"');
    await queryRunner.query('DROP TABLE IF EXISTS "admin_settings"');
    await queryRunner.query('DROP TABLE IF EXISTS "sales_snapshots"');
    await queryRunner.query('DROP TABLE IF EXISTS "report_snapshots"');
    await queryRunner.query('DROP TABLE IF EXISTS "admin_profiles"');
    await queryRunner.query('DROP TABLE IF EXISTS "plans"');
    await queryRunner.query('DROP TABLE IF EXISTS "permission_overrides"');
    await queryRunner.query('DROP TABLE IF EXISTS "gym_payouts"');
    await queryRunner.query('DROP TABLE IF EXISTS "notifications"');
    await queryRunner.query('DROP TABLE IF EXISTS "members"');
    await queryRunner.query('DROP TABLE IF EXISTS "staff"');
    await queryRunner.query('DROP TABLE IF EXISTS "gym_health_alerts"');
    await queryRunner.query('DROP TABLE IF EXISTS "payment_transactions"');
    await queryRunner.query('DROP TABLE IF EXISTS "data_export_jobs"');
    await queryRunner.query('DROP TABLE IF EXISTS "dashboard_snapshots"');
    await queryRunner.query('DROP TABLE IF EXISTS "coupons"');
    await queryRunner.query('DROP TABLE IF EXISTS "campaigns"');
    await queryRunner.query('DROP TABLE IF EXISTS "branches"');
    await queryRunner.query('DROP TABLE IF EXISTS "blacklisted_members"');
    await queryRunner.query('DROP TABLE IF EXISTS "audit_log_views"');
    await queryRunner.query('DROP TABLE IF EXISTS "attendance_records"');
    await queryRunner.query('DROP TABLE IF EXISTS "announcements"');
    await queryRunner.query('DROP TABLE IF EXISTS "audit_logs"');
  }
}
