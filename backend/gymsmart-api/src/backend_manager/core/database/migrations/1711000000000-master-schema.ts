// RESPONSIBILITY: Versioned master PostgreSQL schema for users, tenants, and tenant memberships.
// FLOW: Migration runner -> master schema -> authentication/tenant authorization lookups.
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class MasterSchema1711000000000 implements MigrationInterface {
  name = 'MasterSchema1711000000000';
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("CREATE TYPE core_role_enum AS ENUM ('MANAGER','ADMIN','STAFF')");
    const base="created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), deleted_at timestamptz NULL";
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS users (id uuid CONSTRAINT PK_users PRIMARY KEY, ${base}, email varchar(120) NOT NULL, role core_role_enum NOT NULL, is_active boolean NOT NULL DEFAULT true, CONSTRAINT UQ_users_email UNIQUE(email))`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS tenants (id uuid CONSTRAINT PK_tenants PRIMARY KEY, ${base}, slug varchar(64) NOT NULL, database_name varchar(120) NOT NULL, is_active boolean NOT NULL DEFAULT true, CONSTRAINT UQ_tenants_slug UNIQUE(slug), CONSTRAINT UQ_tenants_database_name UNIQUE(database_name))`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS user_tenants (id uuid CONSTRAINT PK_user_tenants PRIMARY KEY, ${base}, user_id uuid NOT NULL, tenant_id uuid NOT NULL, database_name varchar(120) NOT NULL, is_active boolean NOT NULL DEFAULT true, CONSTRAINT FK_user_tenants_users_user_id FOREIGN KEY(user_id) REFERENCES users(id), CONSTRAINT FK_user_tenants_tenants_tenant_id FOREIGN KEY(tenant_id) REFERENCES tenants(id), CONSTRAINT UQ_user_tenants_user_id_tenant_id UNIQUE(user_id,tenant_id))`);
    await queryRunner.query("CREATE INDEX IF NOT EXISTS IDX_users_email ON users(email)");
    await queryRunner.query("CREATE INDEX IF NOT EXISTS IDX_tenants_database_name ON tenants(database_name)");
    await queryRunner.query("CREATE INDEX IF NOT EXISTS IDX_user_tenants_user_id ON user_tenants(user_id)");
    await queryRunner.query("CREATE INDEX IF NOT EXISTS IDX_user_tenants_tenant_id ON user_tenants(tenant_id)");
  }
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS user_tenants');
    await queryRunner.query('DROP TABLE IF EXISTS tenants');
    await queryRunner.query('DROP TABLE IF EXISTS users');
    await queryRunner.query('DROP TYPE IF EXISTS core_role_enum');
  }
}
