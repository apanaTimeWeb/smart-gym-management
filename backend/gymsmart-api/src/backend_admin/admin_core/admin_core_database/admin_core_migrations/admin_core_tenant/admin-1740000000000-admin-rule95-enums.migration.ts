// RESPONSIBILITY: Converts finite Admin state columns from free-form strings to explicit PostgreSQL enum constraints.
// FLOW: Migration -> normalize legacy state -> validate allowed values -> ALTER COLUMN TYPE -> enum-constrained persistence.
import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * @description Defines the AdminRule95Enums1740000000000 boundary for the admin_core_database backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminRule95Enums1740000000000 implements MigrationInterface {
  /** @description Converts Admin finite status, tier and severity persistence to database-enforced enums. @param queryRunner Active migration runner. @returns Completion promise. */
  async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_announcements_status_enum" AS ENUM ('ACTIVE', 'DRAFT', 'EXPIRED', 'SCHEDULED', 'PUBLISHED')`);
    await queryRunner.query(`UPDATE "admin_announcements" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM "admin_announcements" WHERE "status" IS NOT NULL AND "status"::text NOT IN ('ACTIVE', 'DRAFT', 'EXPIRED', 'SCHEDULED', 'PUBLISHED')) THEN RAISE EXCEPTION 'Unknown status in admin_announcements'; END IF; END $$;`);
    await queryRunner.query(`ALTER TABLE "admin_announcements" ALTER COLUMN "status" TYPE "admin_announcements_status_enum" USING "status"::text::"admin_announcements_status_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_attendance_records_status_enum" AS ENUM ('PRESENT', 'ABSENT', 'LATE')`);
    await queryRunner.query(`UPDATE "admin_attendance_records" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM "admin_attendance_records" WHERE "status" IS NOT NULL AND "status"::text NOT IN ('PRESENT', 'ABSENT', 'LATE')) THEN RAISE EXCEPTION 'Unknown status in admin_attendance_records'; END IF; END $$;`);
    await queryRunner.query(`ALTER TABLE "admin_attendance_records" ALTER COLUMN "status" TYPE "admin_attendance_records_status_enum" USING "status"::text::"admin_attendance_records_status_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_audit_logs_status_enum" AS ENUM ('ACTIVE')`);
    await queryRunner.query(`UPDATE "admin_audit_logs" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM "admin_audit_logs" WHERE "status" IS NOT NULL AND "status"::text NOT IN ('ACTIVE')) THEN RAISE EXCEPTION 'Unknown status in admin_audit_logs'; END IF; END $$;`);
    await queryRunner.query(`ALTER TABLE "admin_audit_logs" ALTER COLUMN "status" TYPE "admin_audit_logs_status_enum" USING "status"::text::"admin_audit_logs_status_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_blacklist_status_enum" AS ENUM ('ACTIVE', 'INACTIVE')`);
    await queryRunner.query(`UPDATE "admin_blacklist" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM "admin_blacklist" WHERE "status" IS NOT NULL AND "status"::text NOT IN ('ACTIVE', 'INACTIVE')) THEN RAISE EXCEPTION 'Unknown status in admin_blacklist'; END IF; END $$;`);
    await queryRunner.query(`ALTER TABLE "admin_blacklist" ALTER COLUMN "status" TYPE "admin_blacklist_status_enum" USING "status"::text::"admin_blacklist_status_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_branches_status_enum" AS ENUM ('ACTIVE', 'INACTIVE', 'MAINTENANCE', 'EXPIRED')`);
    await queryRunner.query(`UPDATE "admin_branches" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM "admin_branches" WHERE "status" IS NOT NULL AND "status"::text NOT IN ('ACTIVE', 'INACTIVE', 'MAINTENANCE', 'EXPIRED')) THEN RAISE EXCEPTION 'Unknown status in admin_branches'; END IF; END $$;`);
    await queryRunner.query(`ALTER TABLE "admin_branches" ALTER COLUMN "status" TYPE "admin_branches_status_enum" USING "status"::text::"admin_branches_status_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_campaigns_status_enum" AS ENUM ('ACTIVE')`);
    await queryRunner.query(`UPDATE "admin_campaigns" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM "admin_campaigns" WHERE "status" IS NOT NULL AND "status"::text NOT IN ('ACTIVE')) THEN RAISE EXCEPTION 'Unknown status in admin_campaigns'; END IF; END $$;`);
    await queryRunner.query(`ALTER TABLE "admin_campaigns" ALTER COLUMN "status" TYPE "admin_campaigns_status_enum" USING "status"::text::"admin_campaigns_status_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_coupons_status_enum" AS ENUM ('ACTIVE', 'INACTIVE', 'EXPIRED')`);
    await queryRunner.query(`UPDATE "admin_coupons" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM "admin_coupons" WHERE "status" IS NOT NULL AND "status"::text NOT IN ('ACTIVE', 'INACTIVE', 'EXPIRED')) THEN RAISE EXCEPTION 'Unknown status in admin_coupons'; END IF; END $$;`);
    await queryRunner.query(`ALTER TABLE "admin_coupons" ALTER COLUMN "status" TYPE "admin_coupons_status_enum" USING "status"::text::"admin_coupons_status_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_dashboard_status_enum" AS ENUM ('ACTIVE')`);
    await queryRunner.query(`UPDATE "admin_dashboard" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM "admin_dashboard" WHERE "status" IS NOT NULL AND "status"::text NOT IN ('ACTIVE')) THEN RAISE EXCEPTION 'Unknown status in admin_dashboard'; END IF; END $$;`);
    await queryRunner.query(`ALTER TABLE "admin_dashboard" ALTER COLUMN "status" TYPE "admin_dashboard_status_enum" USING "status"::text::"admin_dashboard_status_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_data_export_status_enum" AS ENUM ('PROCESSING', 'COMPLETED', 'FAILED')`);
    await queryRunner.query(`UPDATE "admin_data_export" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM "admin_data_export" WHERE "status" IS NOT NULL AND "status"::text NOT IN ('PROCESSING', 'COMPLETED', 'FAILED')) THEN RAISE EXCEPTION 'Unknown status in admin_data_export'; END IF; END $$;`);
    await queryRunner.query(`ALTER TABLE "admin_data_export" ALTER COLUMN "status" TYPE "admin_data_export_status_enum" USING "status"::text::"admin_data_export_status_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_finance_status_enum" AS ENUM ('COMPLETED', 'PAID')`);
    await queryRunner.query(`UPDATE "admin_finance" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM "admin_finance" WHERE "status" IS NOT NULL AND "status"::text NOT IN ('COMPLETED', 'PAID')) THEN RAISE EXCEPTION 'Unknown status in admin_finance'; END IF; END $$;`);
    await queryRunner.query(`ALTER TABLE "admin_finance" ALTER COLUMN "status" TYPE "admin_finance_status_enum" USING "status"::text::"admin_finance_status_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_gym_health_alerts_status_enum" AS ENUM ('ACTIVE', 'RESOLVED', 'DISMISSED')`);
    await queryRunner.query(`UPDATE "admin_gym_health_alerts" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM "admin_gym_health_alerts" WHERE "status" IS NOT NULL AND "status"::text NOT IN ('ACTIVE', 'RESOLVED', 'DISMISSED')) THEN RAISE EXCEPTION 'Unknown status in admin_gym_health_alerts'; END IF; END $$;`);
    await queryRunner.query(`ALTER TABLE "admin_gym_health_alerts" ALTER COLUMN "status" TYPE "admin_gym_health_alerts_status_enum" USING "status"::text::"admin_gym_health_alerts_status_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_hr_status_enum" AS ENUM ('ACTIVE', 'INACTIVE', 'PAID', 'PENDING')`);
    await queryRunner.query(`UPDATE "admin_hr" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM "admin_hr" WHERE "status" IS NOT NULL AND "status"::text NOT IN ('ACTIVE', 'INACTIVE', 'PAID', 'PENDING')) THEN RAISE EXCEPTION 'Unknown status in admin_hr'; END IF; END $$;`);
    await queryRunner.query(`ALTER TABLE "admin_hr" ALTER COLUMN "status" TYPE "admin_hr_status_enum" USING "status"::text::"admin_hr_status_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_members_status_enum" AS ENUM ('ACTIVE', 'EXPIRED', 'PENDING', 'FROZEN')`);
    await queryRunner.query(`UPDATE "admin_members" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM "admin_members" WHERE "status" IS NOT NULL AND "status"::text NOT IN ('ACTIVE', 'EXPIRED', 'PENDING', 'FROZEN')) THEN RAISE EXCEPTION 'Unknown status in admin_members'; END IF; END $$;`);
    await queryRunner.query(`ALTER TABLE "admin_members" ALTER COLUMN "status" TYPE "admin_members_status_enum" USING "status"::text::"admin_members_status_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_notifications_status_enum" AS ENUM ('ACTIVE')`);
    await queryRunner.query(`UPDATE "admin_notifications" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM "admin_notifications" WHERE "status" IS NOT NULL AND "status"::text NOT IN ('ACTIVE')) THEN RAISE EXCEPTION 'Unknown status in admin_notifications'; END IF; END $$;`);
    await queryRunner.query(`ALTER TABLE "admin_notifications" ALTER COLUMN "status" TYPE "admin_notifications_status_enum" USING "status"::text::"admin_notifications_status_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_payouts_status_enum" AS ENUM ('PENDING', 'PROCESSING', 'PAID')`);
    await queryRunner.query(`UPDATE "admin_payouts" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM "admin_payouts" WHERE "status" IS NOT NULL AND "status"::text NOT IN ('PENDING', 'PROCESSING', 'PAID')) THEN RAISE EXCEPTION 'Unknown status in admin_payouts'; END IF; END $$;`);
    await queryRunner.query(`ALTER TABLE "admin_payouts" ALTER COLUMN "status" TYPE "admin_payouts_status_enum" USING "status"::text::"admin_payouts_status_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_permissions_status_enum" AS ENUM ('ACTIVE')`);
    await queryRunner.query(`UPDATE "admin_permissions" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM "admin_permissions" WHERE "status" IS NOT NULL AND "status"::text NOT IN ('ACTIVE')) THEN RAISE EXCEPTION 'Unknown status in admin_permissions'; END IF; END $$;`);
    await queryRunner.query(`ALTER TABLE "admin_permissions" ALTER COLUMN "status" TYPE "admin_permissions_status_enum" USING "status"::text::"admin_permissions_status_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_plans_status_enum" AS ENUM ('ACTIVE')`);
    await queryRunner.query(`UPDATE "admin_plans" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM "admin_plans" WHERE "status" IS NOT NULL AND "status"::text NOT IN ('ACTIVE')) THEN RAISE EXCEPTION 'Unknown status in admin_plans'; END IF; END $$;`);
    await queryRunner.query(`ALTER TABLE "admin_plans" ALTER COLUMN "status" TYPE "admin_plans_status_enum" USING "status"::text::"admin_plans_status_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_profile_status_enum" AS ENUM ('ACTIVE')`);
    await queryRunner.query(`UPDATE "admin_profile" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM "admin_profile" WHERE "status" IS NOT NULL AND "status"::text NOT IN ('ACTIVE')) THEN RAISE EXCEPTION 'Unknown status in admin_profile'; END IF; END $$;`);
    await queryRunner.query(`ALTER TABLE "admin_profile" ALTER COLUMN "status" TYPE "admin_profile_status_enum" USING "status"::text::"admin_profile_status_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_reports_status_enum" AS ENUM ('PROCESSING', 'COMPLETED', 'FAILED')`);
    await queryRunner.query(`UPDATE "admin_reports" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM "admin_reports" WHERE "status" IS NOT NULL AND "status"::text NOT IN ('PROCESSING', 'COMPLETED', 'FAILED')) THEN RAISE EXCEPTION 'Unknown status in admin_reports'; END IF; END $$;`);
    await queryRunner.query(`ALTER TABLE "admin_reports" ALTER COLUMN "status" TYPE "admin_reports_status_enum" USING "status"::text::"admin_reports_status_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_sales_status_enum" AS ENUM ('ACTIVE', 'PAID', 'PENDING')`);
    await queryRunner.query(`UPDATE "admin_sales" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM "admin_sales" WHERE "status" IS NOT NULL AND "status"::text NOT IN ('ACTIVE', 'PAID', 'PENDING')) THEN RAISE EXCEPTION 'Unknown status in admin_sales'; END IF; END $$;`);
    await queryRunner.query(`ALTER TABLE "admin_sales" ALTER COLUMN "status" TYPE "admin_sales_status_enum" USING "status"::text::"admin_sales_status_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_settings_status_enum" AS ENUM ('ACTIVE')`);
    await queryRunner.query(`UPDATE "admin_settings" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM "admin_settings" WHERE "status" IS NOT NULL AND "status"::text NOT IN ('ACTIVE')) THEN RAISE EXCEPTION 'Unknown status in admin_settings'; END IF; END $$;`);
    await queryRunner.query(`ALTER TABLE "admin_settings" ALTER COLUMN "status" TYPE "admin_settings_status_enum" USING "status"::text::"admin_settings_status_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_subscriptions_status_enum" AS ENUM ('ACTIVE', 'CANCELLED', 'PAST_DUE', 'FAILED', 'PAID', 'PENDING')`);
    await queryRunner.query(`UPDATE "admin_subscriptions" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM "admin_subscriptions" WHERE "status" IS NOT NULL AND "status"::text NOT IN ('ACTIVE', 'CANCELLED', 'PAST_DUE', 'FAILED', 'PAID', 'PENDING')) THEN RAISE EXCEPTION 'Unknown status in admin_subscriptions'; END IF; END $$;`);
    await queryRunner.query(`ALTER TABLE "admin_subscriptions" ALTER COLUMN "status" TYPE "admin_subscriptions_status_enum" USING "status"::text::"admin_subscriptions_status_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_usage_status_enum" AS ENUM ('ACTIVE', 'PENDING')`);
    await queryRunner.query(`UPDATE "admin_usage" SET "status" = UPPER("status") WHERE "status" IS NOT NULL`);
    await queryRunner.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM "admin_usage" WHERE "status" IS NOT NULL AND "status"::text NOT IN ('ACTIVE', 'PENDING')) THEN RAISE EXCEPTION 'Unknown status in admin_usage'; END IF; END $$;`);
    await queryRunner.query(`ALTER TABLE "admin_usage" ALTER COLUMN "status" TYPE "admin_usage_status_enum" USING "status"::text::"admin_usage_status_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_plans_tier_enum" AS ENUM ('STARTER','GROWTH','PRO','ENTERPRISE')`);
    await queryRunner.query(`UPDATE "admin_plans" SET "tier" = UPPER("tier") WHERE "tier" IS NOT NULL`);
    await queryRunner.query(`ALTER TABLE "admin_plans" ALTER COLUMN "tier" TYPE "admin_plans_tier_enum" USING "tier"::text::"admin_plans_tier_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "admin_gym_health_alerts_severity_enum" AS ENUM ('LOW','INFO','WARNING','CRITICAL')`);
    await queryRunner.query(`UPDATE "admin_gym_health_alerts" SET "severity" = UPPER("severity") WHERE "severity" IS NOT NULL`);
    await queryRunner.query(`ALTER TABLE "admin_gym_health_alerts" ALTER COLUMN "severity" TYPE "admin_gym_health_alerts_severity_enum" USING "severity"::text::"admin_gym_health_alerts_severity_enum"`);
    await queryRunner.query(`CREATE TYPE IF NOT EXISTS "core_audit_logs_severity_enum" AS ENUM ('HIGH','MEDIUM','LOW')`);
    await queryRunner.query(`UPDATE "audit_logs" SET "severity" = UPPER("severity") WHERE "severity" IS NOT NULL`);
    await queryRunner.query(`ALTER TABLE "audit_logs" ALTER COLUMN "severity" TYPE "core_audit_logs_severity_enum" USING "severity"::text::"core_audit_logs_severity_enum"`);
  }

  /** @description Reverts enum columns to varchar representation for rollback. @param queryRunner Active migration runner. @returns Completion promise. */
  async down(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`ALTER TABLE "admin_usage" ALTER COLUMN "status" TYPE varchar(64) USING "status"::text`);
    await queryRunner.query(`ALTER TABLE "admin_subscriptions" ALTER COLUMN "status" TYPE varchar(64) USING "status"::text`);
    await queryRunner.query(`ALTER TABLE "admin_settings" ALTER COLUMN "status" TYPE varchar(64) USING "status"::text`);
    await queryRunner.query(`ALTER TABLE "admin_sales" ALTER COLUMN "status" TYPE varchar(64) USING "status"::text`);
    await queryRunner.query(`ALTER TABLE "admin_reports" ALTER COLUMN "status" TYPE varchar(64) USING "status"::text`);
    await queryRunner.query(`ALTER TABLE "admin_profile" ALTER COLUMN "status" TYPE varchar(64) USING "status"::text`);
    await queryRunner.query(`ALTER TABLE "admin_plans" ALTER COLUMN "status" TYPE varchar(64) USING "status"::text`);
    await queryRunner.query(`ALTER TABLE "admin_permissions" ALTER COLUMN "status" TYPE varchar(64) USING "status"::text`);
    await queryRunner.query(`ALTER TABLE "admin_payouts" ALTER COLUMN "status" TYPE varchar(64) USING "status"::text`);
    await queryRunner.query(`ALTER TABLE "admin_notifications" ALTER COLUMN "status" TYPE varchar(64) USING "status"::text`);
    await queryRunner.query(`ALTER TABLE "admin_members" ALTER COLUMN "status" TYPE varchar(64) USING "status"::text`);
    await queryRunner.query(`ALTER TABLE "admin_hr" ALTER COLUMN "status" TYPE varchar(64) USING "status"::text`);
    await queryRunner.query(`ALTER TABLE "admin_gym_health_alerts" ALTER COLUMN "status" TYPE varchar(64) USING "status"::text`);
    await queryRunner.query(`ALTER TABLE "admin_finance" ALTER COLUMN "status" TYPE varchar(64) USING "status"::text`);
    await queryRunner.query(`ALTER TABLE "admin_data_export" ALTER COLUMN "status" TYPE varchar(64) USING "status"::text`);
    await queryRunner.query(`ALTER TABLE "admin_dashboard" ALTER COLUMN "status" TYPE varchar(64) USING "status"::text`);
    await queryRunner.query(`ALTER TABLE "admin_coupons" ALTER COLUMN "status" TYPE varchar(64) USING "status"::text`);
    await queryRunner.query(`ALTER TABLE "admin_campaigns" ALTER COLUMN "status" TYPE varchar(64) USING "status"::text`);
    await queryRunner.query(`ALTER TABLE "admin_branches" ALTER COLUMN "status" TYPE varchar(64) USING "status"::text`);
    await queryRunner.query(`ALTER TABLE "admin_blacklist" ALTER COLUMN "status" TYPE varchar(64) USING "status"::text`);
    await queryRunner.query(`ALTER TABLE "admin_audit_logs" ALTER COLUMN "status" TYPE varchar(64) USING "status"::text`);
    await queryRunner.query(`ALTER TABLE "admin_attendance_records" ALTER COLUMN "status" TYPE varchar(64) USING "status"::text`);
    await queryRunner.query(`ALTER TABLE "admin_announcements" ALTER COLUMN "status" TYPE varchar(64) USING "status"::text`);
    await queryRunner.query(`ALTER TABLE "admin_plans" ALTER COLUMN "tier" TYPE varchar(32) USING "tier"::text`);
    await queryRunner.query(`ALTER TABLE "admin_gym_health_alerts" ALTER COLUMN "severity" TYPE varchar(16) USING "severity"::text`);
    await queryRunner.query(`ALTER TABLE "audit_logs" ALTER COLUMN "severity" TYPE varchar(16) USING "severity"::text`);
  }
}
