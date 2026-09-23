// RESPONSIBILITY: Preserves backward compatibility while converging legacy Manager table names to canonical names.
// FLOW: Existing tenant schema -> detect legacy table -> rename only when canonical target is absent.
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class ManagerTableNameNormalization1711000000300 implements MigrationInterface {
  name = 'ManagerTableNameNormalization1711000000300';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DO $$ BEGIN IF to_regclass('manager_attendance') IS NOT NULL AND to_regclass('manager_attendances') IS NULL THEN ALTER TABLE "manager_attendance" RENAME TO "manager_attendances"; END IF; END $$;`);
    await queryRunner.query(`DO $$ BEGIN IF to_regclass('manager_dashboard') IS NOT NULL AND to_regclass('manager_dashboards') IS NULL THEN ALTER TABLE "manager_dashboard" RENAME TO "manager_dashboards"; END IF; END $$;`);
    await queryRunner.query(`DO $$ BEGIN IF to_regclass('manager_finance') IS NOT NULL AND to_regclass('manager_finances') IS NULL THEN ALTER TABLE "manager_finance" RENAME TO "manager_finances"; END IF; END $$;`);
    await queryRunner.query(`DO $$ BEGIN IF to_regclass('manager_grievance') IS NOT NULL AND to_regclass('manager_grievances') IS NULL THEN ALTER TABLE "manager_grievance" RENAME TO "manager_grievances"; END IF; END $$;`);
    await queryRunner.query(`DO $$ BEGIN IF to_regclass('manager_hr') IS NOT NULL AND to_regclass('manager_hrs') IS NULL THEN ALTER TABLE "manager_hr" RENAME TO "manager_hrs"; END IF; END $$;`);
    await queryRunner.query(`DO $$ BEGIN IF to_regclass('manager_library') IS NOT NULL AND to_regclass('manager_libraries') IS NULL THEN ALTER TABLE "manager_library" RENAME TO "manager_libraries"; END IF; END $$;`);
    await queryRunner.query(`DO $$ BEGIN IF to_regclass('manager_maintenance') IS NOT NULL AND to_regclass('manager_maintenances') IS NULL THEN ALTER TABLE "manager_maintenance" RENAME TO "manager_maintenances"; END IF; END $$;`);
    await queryRunner.query(`DO $$ BEGIN IF to_regclass('manager_profile') IS NOT NULL AND to_regclass('manager_profiles') IS NULL THEN ALTER TABLE "manager_profile" RENAME TO "manager_profiles"; END IF; END $$;`);
    await queryRunner.query(`DO $$ BEGIN IF to_regclass('manager_pt') IS NOT NULL AND to_regclass('manager_pts') IS NULL THEN ALTER TABLE "manager_pt" RENAME TO "manager_pts"; END IF; END $$;`);
    await queryRunner.query(`DO $$ BEGIN IF to_regclass('manager_schedule') IS NOT NULL AND to_regclass('manager_schedules') IS NULL THEN ALTER TABLE "manager_schedule" RENAME TO "manager_schedules"; END IF; END $$;`);
    await queryRunner.query(`DO $$ BEGIN IF to_regclass('manager_store') IS NOT NULL AND to_regclass('manager_stores') IS NULL THEN ALTER TABLE "manager_store" RENAME TO "manager_stores"; END IF; END $$;`);
    await queryRunner.query(`DO $$ BEGIN IF to_regclass('manager_workout') IS NOT NULL AND to_regclass('manager_workouts') IS NULL THEN ALTER TABLE "manager_workout" RENAME TO "manager_workouts"; END IF; END $$;`);
  }

  async down(_queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
