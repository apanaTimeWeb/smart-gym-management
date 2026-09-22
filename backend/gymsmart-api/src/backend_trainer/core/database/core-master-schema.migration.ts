// RESPONSIBILITY: Creates the master PostgreSQL schema with explicit, stable database constraint names.
// FLOW: Master DataSource → versioned migration → core identity/tenant/auth tables.

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoreMasterSchemaMigration implements MigrationInterface {
  name = 'CoreMasterSchemaMigration_2026_09_22';

  /** Creates master identity, tenancy, and authentication security tables with named constraints. */
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS core_users (
      id uuid NOT NULL DEFAULT gen_random_uuid(),
      email varchar(320) NOT NULL,
      password_hash text NOT NULL,
      name varchar(160) NOT NULL,
      role varchar(32) NOT NULL,
      is_active boolean NOT NULL DEFAULT true,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),
      deleted_at timestamptz,
      CONSTRAINT PK_core_users PRIMARY KEY(id),
      CONSTRAINT UQ_core_users_email UNIQUE(email),
      CONSTRAINT CHK_core_users_role CHECK(role IN ('TRAINER','MANAGER','ADMIN','MEMBER'))
    )`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS core_tenants (
      id uuid NOT NULL DEFAULT gen_random_uuid(),
      name varchar(160) NOT NULL,
      database_name varchar(160) NOT NULL,
      is_active boolean NOT NULL DEFAULT true,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),
      deleted_at timestamptz,
      CONSTRAINT PK_core_tenants PRIMARY KEY(id),
      CONSTRAINT UQ_core_tenants_database_name UNIQUE(database_name)
    )`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS core_tenant_memberships (
      id uuid NOT NULL DEFAULT gen_random_uuid(),
      user_id uuid NOT NULL,
      tenant_id uuid NOT NULL,
      role varchar(32) NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),
      deleted_at timestamptz,
      CONSTRAINT PK_core_tenant_memberships PRIMARY KEY(id),
      CONSTRAINT UQ_core_tenant_memberships_user_tenant UNIQUE(user_id,tenant_id),
      CONSTRAINT CHK_core_tenant_memberships_role CHECK(role IN ('TRAINER','MANAGER','ADMIN','MEMBER')),
      CONSTRAINT FK_core_tenant_memberships_users_user_id FOREIGN KEY(user_id) REFERENCES core_users(id),
      CONSTRAINT FK_core_tenant_memberships_tenants_tenant_id FOREIGN KEY(tenant_id) REFERENCES core_tenants(id)
    )`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS core_auth_audit_logs (
      id uuid NOT NULL DEFAULT gen_random_uuid(),
      user_id uuid,
      action varchar(64) NOT NULL,
      identifier_hash varchar(64),
      created_at timestamptz NOT NULL DEFAULT now(),
      CONSTRAINT PK_core_auth_audit_logs PRIMARY KEY(id),
      CONSTRAINT FK_core_auth_audit_logs_users_user_id FOREIGN KEY(user_id) REFERENCES core_users(id)
    )`);
    await queryRunner.query('CREATE INDEX IF NOT EXISTS IDX_core_tenant_memberships_user_id ON core_tenant_memberships(user_id)');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS IDX_core_tenant_memberships_tenant_id ON core_tenant_memberships(tenant_id)');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS IDX_core_auth_audit_logs_user_id ON core_auth_audit_logs(user_id)');
  }

  /** Drops master security and tenant identity tables for controlled rollback. */
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS core_auth_audit_logs CASCADE');
    await queryRunner.query('DROP TABLE IF EXISTS core_tenant_memberships CASCADE');
    await queryRunner.query('DROP TABLE IF EXISTS core_tenants CASCADE');
    await queryRunner.query('DROP TABLE IF EXISTS core_users CASCADE');
  }
}
