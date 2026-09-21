// RESPONSIBILITY: Converts audit actor roles to the canonical finite enum without changing Auth role values.
// FLOW: TypeORM migration runner -> PostgreSQL enum conversion -> audit_logs.actor_role.

import type { MigrationInterface, QueryRunner } from 'typeorm';

export class EnforceAuditActorRoleEnum1730000001000 implements MigrationInterface {
  name = 'EnforceAuditActorRoleEnum1730000001000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "core_audit_logs_actor_role_enum" AS ENUM ('SUPERADMIN','ADMIN','MANAGER','TRAINER')`);
    await queryRunner.query(`
      ALTER TABLE "audit_logs"
      ALTER COLUMN "actor_role" TYPE "core_audit_logs_actor_role_enum"
      USING "actor_role"::text::"core_audit_logs_actor_role_enum"
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "audit_logs"
      ALTER COLUMN "actor_role" TYPE varchar(32)
      USING "actor_role"::text
    `);
    await queryRunner.query(`DROP TYPE "core_audit_logs_actor_role_enum"`);
  }
}
