// RESPONSIBILITY: Creates the tenant-local operational schema that feature repositories resolve at request time.
// FLOW: Tenant provisioning -> tenant DB migration -> tenant repositories.
import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Primary Intent: Defines SuperadminCoreTenantSchemaMigration as the class-level contract for superadmin-core-tenant-schema-migration.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminCoreTenantSchemaMigration implements MigrationInterface {
  name = 'SuperadminCoreTenantSchemaMigration';

  /**
 * Primary Intent: Executes the up use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS superadmin_tenant_messages (id varchar(64) NOT NULL, created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, deleted_at timestamptz NULL, tenant_id varchar(64) NOT NULL, tenant_name varchar(500) NOT NULL, channel varchar(100) NOT NULL, subject varchar(500) NOT NULL, body text NOT NULL, status varchar(100) NOT NULL, sent_at timestamptz NULL, scheduled_at timestamptz NULL, campaign_metadata jsonb NULL, CONSTRAINT PK_superadmin_tenant_messages PRIMARY KEY (id))`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS superadmin_support_tickets (id varchar(64) NOT NULL, created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, deleted_at timestamptz NULL, tenant_id varchar(64) NOT NULL, tenant_name varchar(500) NOT NULL, reporter_email varchar(500) NOT NULL, subject varchar(500) NOT NULL, description text NOT NULL, status varchar(100) NOT NULL, priority varchar(100) NOT NULL, assigned_to varchar(500) NULL, attachments jsonb NOT NULL DEFAULT '[]'::jsonb, sla_deadline timestamptz NULL, first_response_at timestamptz NULL, resolution_time integer NOT NULL DEFAULT 0, messages jsonb NOT NULL DEFAULT '[]'::jsonb, last_updated timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT PK_superadmin_support_tickets PRIMARY KEY (id))`);
    await queryRunner.query(`ALTER TABLE superadmin_tenant_messages ADD CONSTRAINT CHK_superadmin_tenant_messages_channel_allowed CHECK (channel IN ('EMAIL','WHATSAPP','SMS')) NOT VALID`);
    await queryRunner.query(`ALTER TABLE superadmin_tenant_messages ADD CONSTRAINT CHK_superadmin_tenant_messages_status_allowed CHECK (status IN ('QUEUED','SENT','FAILED','SCHEDULED')) NOT VALID`);
    await queryRunner.query(`ALTER TABLE superadmin_support_tickets ADD CONSTRAINT CHK_superadmin_support_tickets_status_allowed CHECK (status IN ('OPEN','IN_PROGRESS','RESOLVED','CLOSED','WAITING')) NOT VALID`);
    await queryRunner.query(`ALTER TABLE superadmin_support_tickets ADD CONSTRAINT CHK_superadmin_support_tickets_priority_allowed CHECK (priority IN ('LOW','MEDIUM','HIGH','CRITICAL','NORMAL','URGENT')) NOT VALID`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS superadmin_usage_meters (id varchar(64) NOT NULL, created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, deleted_at timestamptz NULL, tenant_id varchar(64) NOT NULL, database_gb numeric(12,3) NOT NULL DEFAULT 0, media_gb numeric(12,3) NOT NULL DEFAULT 0, storage_limit_gb numeric(12,3) NOT NULL DEFAULT 0, api_calls_monthly integer NOT NULL DEFAULT 0, CONSTRAINT PK_superadmin_usage_meters PRIMARY KEY (id))`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS audit_logs (id varchar(64) NOT NULL, created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, deleted_at timestamptz NULL, actor_id varchar(500) NOT NULL, actor_role varchar(500) NOT NULL, action varchar(500) NOT NULL, entity_type varchar(500) NOT NULL, entity_id varchar(500) NOT NULL, old_value jsonb NOT NULL DEFAULT 'null'::jsonb, new_value jsonb NOT NULL DEFAULT 'null'::jsonb, ip_address varchar(500) NOT NULL, tenant_id varchar(500) NULL, CONSTRAINT PK_audit_logs PRIMARY KEY (id), CONSTRAINT CHK_audit_logs_actor_id_nonempty CHECK (length(actor_id) > 0))`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS IDX_superadmin_tenant_messages_tenant_id ON superadmin_tenant_messages(tenant_id)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS IDX_superadmin_support_tickets_tenant_id_status ON superadmin_support_tickets(tenant_id,status)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS IDX_superadmin_usage_meters_tenant_id ON superadmin_usage_meters(tenant_id)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS IDX_audit_logs_tenant_id_created_at ON audit_logs(tenant_id,created_at)`);
  }

  /**
 * Primary Intent: Executes the down use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS audit_logs');
    await queryRunner.query('DROP TABLE IF EXISTS superadmin_usage_meters');
    await queryRunner.query('DROP TABLE IF EXISTS superadmin_support_tickets');
    await queryRunner.query('DROP TABLE IF EXISTS superadmin_tenant_messages');
  }
}
