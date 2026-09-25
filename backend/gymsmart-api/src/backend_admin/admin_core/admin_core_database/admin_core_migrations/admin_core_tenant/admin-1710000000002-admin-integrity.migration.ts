// RESPONSIBILITY: Adds tenant-database referential, financial, uniqueness, and query-performance constraints required by the Admin backend.
// FLOW: TypeORM migration -> PostgreSQL tenant DB -> named FK/UNIQUE/CHECK/INDEX contracts.
import { MigrationInterface, QueryRunner } from 'typeorm';

const BRANCH_FOREIGN_KEYS = [
  'announcements',
  'attendance_records',
  'audit_log_views',
  'blacklisted_members',
  'campaigns',
  'coupons',
  'data_export_jobs',
  'payment_transactions',
  'gym_health_alerts',
  'staff',
  'members',
  'notifications',
  'gym_payouts',
  'permission_overrides',
  'plans',
  'admin_profiles',
  'report_snapshots',
  'sales_snapshots',
  'admin_settings',
  'subscriptions',
  'usage_snapshots',
];

const NON_NEGATIVE_AMOUNT_COLUMNS = [
  'announcements',
  'attendance_records',
  'audit_log_views',
  'blacklisted_members',
  'campaigns',
  'coupons',
  'dashboard_snapshots',
  'data_export_jobs',
  'payment_transactions',
  'gym_health_alerts',
  'staff',
  'members',
  'notifications',
  'gym_payouts',
  'permission_overrides',
  'plans',
  'admin_profiles',
  'report_snapshots',
  'sales_snapshots',
  'admin_settings',
  'subscriptions',
  'usage_snapshots',
];

/**
 * @description Defines the AdminIntegrity1710000000002 boundary for the admin_core_database backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminIntegrity1710000000002 implements MigrationInterface {
  name = 'AdminIntegrity1710000000002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const table of BRANCH_FOREIGN_KEYS) {
      await queryRunner.query(`
        DO $$
        BEGIN
          IF to_regclass('"${table}"') IS NOT NULL
             AND to_regclass('"branches"') IS NOT NULL
             AND NOT EXISTS (
               SELECT 1 FROM pg_constraint WHERE conname = 'FK_${table}_branches_branch_id'
             )
          THEN
            ALTER TABLE "${table}"
              ADD CONSTRAINT "FK_${table}_branches_branch_id"
              FOREIGN KEY ("branch_id") REFERENCES "branches"("id");
          END IF;
        END $$;
      `);
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_${table}_branch_id_created_at" ON "${table}" ("branch_id", "created_at")`);
    }

    await queryRunner.query(`
      DO $$
      BEGIN
        IF to_regclass('"blacklisted_members"') IS NOT NULL
           AND to_regclass('"members"') IS NOT NULL
           AND NOT EXISTS (
             SELECT 1 FROM pg_constraint WHERE conname = 'FK_blacklisted_members_members_member_id'
           )
        THEN
          ALTER TABLE "blacklisted_members"
            ADD CONSTRAINT "FK_blacklisted_members_members_member_id"
            FOREIGN KEY ("member_id") REFERENCES "members"("id");
        END IF;
      END $$;
    `);
    await queryRunner.query('CREATE INDEX IF NOT EXISTS "IDX_blacklisted_members_member_id" ON "blacklisted_members" ("member_id")');

    for (const table of NON_NEGATIVE_AMOUNT_COLUMNS) {
      await queryRunner.query(`
        DO $$
        BEGIN
          IF to_regclass('"${table}"') IS NOT NULL
             AND NOT EXISTS (
               SELECT 1 FROM pg_constraint WHERE conname = 'CHK_${table}_amount_minor_non_negative'
             )
          THEN
            ALTER TABLE "${table}"
              ADD CONSTRAINT "CHK_${table}_amount_minor_non_negative"
              CHECK ("amount_minor" IS NULL OR "amount_minor" >= 0);
          END IF;
        END $$;
      `);
    }

    await queryRunner.query(`
      DO $$
      BEGIN
        IF to_regclass('"staff"') IS NOT NULL
           AND NOT EXISTS (
             SELECT 1 FROM pg_constraint WHERE conname = 'CHK_staff_salary_minor_non_negative'
           )
        THEN
          ALTER TABLE "staff"
            ADD CONSTRAINT "CHK_staff_salary_minor_non_negative"
            CHECK ("salary_minor" IS NULL OR "salary_minor" >= 0);
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "UQ_coupons_code_active"
      ON "coupons" ("code")
      WHERE "code" IS NOT NULL AND "deleted_at" IS NULL;
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "UQ_staff_employee_id_active"
      ON "staff" ("employee_id")
      WHERE "employee_id" IS NOT NULL AND "deleted_at" IS NULL;
    `);

    await queryRunner.query('CREATE INDEX IF NOT EXISTS "IDX_members_status_created_at" ON "members" ("status", "created_at")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS "IDX_plans_status_created_at" ON "plans" ("status", "created_at")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS "IDX_subscriptions_status_created_at" ON "subscriptions" ("status", "created_at")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS "IDX_notifications_read_created_at" ON "notifications" ("read", "created_at")');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS "IDX_gym_health_alerts_severity_created_at" ON "gym_health_alerts" ("severity", "created_at")');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_gym_health_alerts_severity_created_at"');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_notifications_read_created_at"');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_subscriptions_status_created_at"');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_plans_status_created_at"');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_members_status_created_at"');
    await queryRunner.query('DROP INDEX IF EXISTS "UQ_staff_employee_id_active"');
    await queryRunner.query('DROP INDEX IF EXISTS "UQ_coupons_code_active"');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_blacklisted_members_member_id"');
    for (const table of [...NON_NEGATIVE_AMOUNT_COLUMNS].reverse()) {
      await queryRunner.query(`ALTER TABLE IF EXISTS "${table}" DROP CONSTRAINT IF EXISTS "CHK_${table}_amount_minor_non_negative"`);
    }
    await queryRunner.query('ALTER TABLE IF EXISTS "staff" DROP CONSTRAINT IF EXISTS "CHK_staff_salary_minor_non_negative"');
    await queryRunner.query('ALTER TABLE IF EXISTS "blacklisted_members" DROP CONSTRAINT IF EXISTS "FK_blacklisted_members_members_member_id"');
    for (const table of [...BRANCH_FOREIGN_KEYS].reverse()) {
      await queryRunner.query(`ALTER TABLE IF EXISTS "${table}" DROP CONSTRAINT IF EXISTS "FK_${table}_branches_branch_id"`);
      await queryRunner.query(`DROP INDEX IF EXISTS "IDX_${table}_branch_id_created_at"`);
    }
  }
}
