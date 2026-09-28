// RESPONSIBILITY: Owns backend core database schema migration.
// FLOW: Migration runner → ordered schema change → reversible database state transition.
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class MasterHardening1711000000200 implements MigrationInterface {
  name='MasterHardening1711000000200';
  async up(queryRunner:QueryRunner):Promise<void>{ await queryRunner.query('CREATE INDEX IF NOT EXISTS "IDX_user_tenants_user_id_tenant_id" ON "user_tenants" ("user_id","tenant_id")'); await queryRunner.query('CREATE INDEX IF NOT EXISTS "IDX_tenants_database_name" ON "tenants" ("database_name")'); }
  async down(_queryRunner:QueryRunner):Promise<void>{}
}
