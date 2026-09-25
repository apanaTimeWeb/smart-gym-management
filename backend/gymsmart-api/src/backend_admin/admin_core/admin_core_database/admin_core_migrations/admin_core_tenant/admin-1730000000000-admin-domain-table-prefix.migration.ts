// RESPONSIBILITY: Renames legacy tenant tables and their named constraints/indexes into the explicit admin_ namespace.
// FLOW: Legacy tenant schema -> table rename -> index/constraint rename -> Admin entity metadata.
import { MigrationInterface, QueryRunner } from 'typeorm';

const TABLE_RENAMES = [
  ['announcements', 'admin_announcements'],
  ['attendance_records', 'admin_attendance_records'],
  ['audit_log_views', 'admin_audit_log_views'],
  ['blacklisted_members', 'admin_blacklisted_members'],
  ['branches', 'admin_branches'],
  ['campaigns', 'admin_campaigns'],
  ['coupons', 'admin_coupons'],
  ['dashboard_snapshots', 'admin_dashboard_snapshots'],
  ['data_export_jobs', 'admin_data_export_jobs'],
  ['payment_transactions', 'admin_payment_transactions'],
  ['gym_health_alerts', 'admin_gym_health_alerts'],
  ['staff', 'admin_staff'],
  ['members', 'admin_members'],
  ['notifications', 'admin_notifications'],
  ['gym_payouts', 'admin_gym_payouts'],
  ['permission_overrides', 'admin_permission_overrides'],
  ['plans', 'admin_plans'],
  ['report_snapshots', 'admin_report_snapshots'],
  ['sales_snapshots', 'admin_sales_snapshots'],
  ['subscriptions', 'admin_subscriptions'],
  ['usage_snapshots', 'admin_usage_snapshots'],
] as const;

/**
 * @description Defines the AdminDomainTablePrefix1730000000000 boundary for the admin_core_database backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDomainTablePrefix1730000000000 implements MigrationInterface {
  name = 'AdminDomainTablePrefix1730000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.renameNamedObjects(queryRunner, TABLE_RENAMES);
    for (const [oldName, newName] of TABLE_RENAMES) {
      await queryRunner.query(`ALTER TABLE IF EXISTS "${oldName}" RENAME TO "${newName}"`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.renameNamedObjects(queryRunner, [...TABLE_RENAMES].map(([oldName, newName]) => [newName, oldName] as const));
    for (const [oldName, newName] of [...TABLE_RENAMES].reverse()) {
      await queryRunner.query(`ALTER TABLE IF EXISTS "${newName}" RENAME TO "${oldName}"`);
    }
  }

  private async renameNamedObjects(queryRunner: QueryRunner, renames: readonly (readonly [string, string])[]): Promise<void> {
    for (const [oldName, newName] of renames) {
      await queryRunner.query(`DO $$ DECLARE item RECORD; target_name TEXT; BEGIN
        FOR item IN
          SELECT indexname
          FROM pg_indexes
          WHERE schemaname = current_schema()
            AND tablename = '${oldName}'
            AND position('${oldName}' in indexname) > 0
        LOOP
          target_name := replace(item.indexname, '${oldName}', '${newName}');
          IF target_name <> item.indexname
             AND to_regclass(format('%I.%I', current_schema(), item.indexname)) IS NOT NULL
             AND to_regclass(format('%I.%I', current_schema(), target_name)) IS NULL THEN
            EXECUTE format('ALTER INDEX %I RENAME TO %I', item.indexname, target_name);
          END IF;
        END LOOP;

        FOR item IN
          SELECT c.conname, c.conrelid::regclass::text AS table_name
          FROM pg_constraint c
          JOIN pg_class t ON t.oid = c.conrelid
          JOIN pg_namespace n ON n.oid = t.relnamespace
          WHERE n.nspname = current_schema()
            AND t.relname = '${oldName}'
            AND position('${oldName}' in c.conname) > 0
        LOOP
          target_name := replace(item.conname, '${oldName}', '${newName}');
          IF target_name <> item.conname
             AND NOT EXISTS (
               SELECT 1
               FROM pg_constraint existing
               JOIN pg_class existing_table ON existing_table.oid = existing.conrelid
               JOIN pg_namespace existing_namespace ON existing_namespace.oid = existing_table.relnamespace
               WHERE existing_namespace.nspname = current_schema()
                 AND existing.conname = target_name
             ) THEN
            EXECUTE format('ALTER TABLE %s RENAME CONSTRAINT %I TO %I', item.table_name, item.conname, target_name);
          END IF;
        END LOOP;
      END $$;`);
    }
  }
}
