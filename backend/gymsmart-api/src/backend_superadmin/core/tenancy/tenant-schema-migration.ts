// RESPONSIBILITY: Creates the minimal tenant-local operational tables required by the supplied Superadmin backend.
// FLOW: Tenant database initialization -> TypeORM migration -> tenant-local operational tables.
import { MigrationInterface, QueryRunner } from 'typeorm';

export class TenantSchemaMigration202609210001 implements MigrationInterface {
  name = 'TenantSchemaMigration202609210001';

  /** Applies the tenant-local schema used by tenant-scoped operational capabilities. */
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS tenant_messages (id varchar(64) NOT NULL, created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, deleted_at timestamptz NULL, tenant_id varchar(64) NOT NULL, tenant_name varchar(500) NOT NULL, channel varchar(100) NOT NULL, subject varchar(500) NOT NULL, body text NOT NULL, status varchar(100) NOT NULL, sent_at timestamptz NULL, scheduled_at timestamptz NULL, CONSTRAINT PK_tenant_messages PRIMARY KEY (id))`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS support_tickets (id varchar(64) NOT NULL, created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, deleted_at timestamptz NULL, tenant_id varchar(64) NOT NULL, tenant_name varchar(500) NOT NULL, reporter_email varchar(500) NOT NULL, subject varchar(500) NOT NULL, description text NOT NULL, status varchar(100) NOT NULL, priority varchar(100) NOT NULL, assigned_to varchar(500) NULL, attachments jsonb NOT NULL DEFAULT '[]'::jsonb, sla_deadline timestamptz NULL, first_response_at timestamptz NULL, resolution_time integer NOT NULL DEFAULT 0, messages jsonb NOT NULL DEFAULT '[]'::jsonb, last_updated timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT PK_support_tickets PRIMARY KEY (id))`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS usage_meters (id varchar(64) NOT NULL, created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, deleted_at timestamptz NULL, tenant_id varchar(64) NOT NULL, database_gb numeric(12,3) NOT NULL DEFAULT 0, media_gb numeric(12,3) NOT NULL DEFAULT 0, storage_limit_gb numeric(12,3) NOT NULL DEFAULT 0, api_calls_monthly integer NOT NULL DEFAULT 0, CONSTRAINT PK_usage_meters PRIMARY KEY (id))`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS IDX_tenant_messages_tenant_id ON tenant_messages(tenant_id)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS IDX_support_tickets_tenant_id_status ON support_tickets(tenant_id, status)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS IDX_usage_meters_tenant_id ON usage_meters(tenant_id)`);
  }

  /** Removes only tenant-local operational objects created by this migration. */
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS usage_meters');
    await queryRunner.query('DROP TABLE IF EXISTS support_tickets');
    await queryRunner.query('DROP TABLE IF EXISTS tenant_messages');
  }
}
