// RESPONSIBILITY: Creates the master Auth/audit schema with explicit human-readable DB constraints and indexes.
// FLOW: TypeORM migration runner -> PostgreSQL -> auth_users/auth_refresh_sessions/audit_logs.

import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthAndAuditTables1730000000000 implements MigrationInterface {
  name = 'CreateAuthAndAuditTables1730000000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS citext');
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');

    await queryRunner.query(`CREATE TYPE "auth_users_role_enum" AS ENUM ('SUPERADMIN','ADMIN','MANAGER','TRAINER')`);
    await queryRunner.query(`CREATE TYPE "auth_users_status_enum" AS ENUM ('ACTIVE','DISABLED')`);

    await queryRunner.query(`
      CREATE TABLE "auth_users" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" varchar(160) NOT NULL,
        "email" citext NOT NULL,
        "password_hash" varchar(255) NOT NULL,
        "role" "auth_users_role_enum" NOT NULL,
        "tenant_id" uuid NULL,
        "status" "auth_users_status_enum" NOT NULL,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ NULL,
        CONSTRAINT "PK_auth_users" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_auth_users_email" UNIQUE ("email")
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_auth_users_role" ON "auth_users" ("role")`);
    await queryRunner.query(`CREATE INDEX "IDX_auth_users_status" ON "auth_users" ("status")`);

    await queryRunner.query(`
      CREATE TABLE "auth_refresh_sessions" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "user_id" uuid NOT NULL,
        "refresh_token_hash" varchar(128) NOT NULL,
        "expires_at" TIMESTAMPTZ NOT NULL,
        "revoked_at" TIMESTAMPTZ NULL,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ NULL,
        CONSTRAINT "PK_auth_refresh_sessions" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_auth_refresh_sessions_refresh_token_hash" UNIQUE ("refresh_token_hash"),
        CONSTRAINT "FK_auth_refresh_sessions_auth_users_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_users"("id") ON DELETE RESTRICT
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_auth_refresh_sessions_user_id" ON "auth_refresh_sessions" ("user_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_auth_refresh_sessions_expires_at" ON "auth_refresh_sessions" ("expires_at")`);

    await queryRunner.query(`
      CREATE TABLE "audit_logs" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "actor_id" uuid NULL,
        "actor_role" varchar(32) NULL,
        "action" varchar(150) NOT NULL,
        "entity_type" varchar(150) NOT NULL,
        "entity_id" uuid NULL,
        "old_value" jsonb NULL,
        "new_value" jsonb NULL,
        "ip_address" inet NULL,
        "request_id" uuid NULL,
        "trace_id" varchar(64) NULL,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ NULL,
        CONSTRAINT "PK_audit_logs" PRIMARY KEY ("id")
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_audit_logs_entity_type_entity_id" ON "audit_logs" ("entity_type","entity_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_audit_logs_actor_id_created_at" ON "audit_logs" ("actor_id","created_at")`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "audit_logs"');
    await queryRunner.query('DROP TABLE "auth_refresh_sessions"');
    await queryRunner.query('DROP TABLE "auth_users"');
    await queryRunner.query('DROP TYPE "auth_users_status_enum"');
    await queryRunner.query('DROP TYPE "auth_users_role_enum"');
  }
}
