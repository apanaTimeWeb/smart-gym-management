// RESPONSIBILITY: Creates master-database tables for tenant routing, Admin authentication, memberships, and commercial subscription state.
// FLOW: TypeORM migration → PostgreSQL master DB → authentication/tenant/subscription services.

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoreMasterInitial1710000000000 implements MigrationInterface {
  name = 'CoreMasterInitial1710000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');
    await queryRunner.query(`CREATE TABLE "tenants" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(160) NOT NULL,
      "slug" varchar(160) NOT NULL,
      "database_name" varchar(160) NOT NULL,
      "is_active" boolean NOT NULL DEFAULT true,
      CONSTRAINT "PK_tenants" PRIMARY KEY ("id"),
      CONSTRAINT "UQ_tenants_slug" UNIQUE ("slug")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_tenants_is_active" ON "tenants" ("is_active")');
    await queryRunner.query(`CREATE TABLE "admins" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "tenant_id" uuid NOT NULL,
      "email" varchar(320) NOT NULL,
      "password_hash" varchar(255) NOT NULL,
      "name" varchar(160) NOT NULL,
      "phone" varchar(32),
      "role" varchar(32) NOT NULL DEFAULT 'ADMIN',
      "failed_login_count" integer NOT NULL DEFAULT 0,
      "is_active" boolean NOT NULL DEFAULT true,
      CONSTRAINT "PK_admins" PRIMARY KEY ("id"),
      CONSTRAINT "UQ_admins_email" UNIQUE ("email"),
      CONSTRAINT "FK_admins_tenants_tenant_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_admins_tenant_id" ON "admins" ("tenant_id")');
    await queryRunner.query(`CREATE TABLE "tenant_memberships" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "actor_id" uuid NOT NULL,
      "tenant_id" uuid NOT NULL,
      "role" varchar(32) NOT NULL DEFAULT 'ADMIN',
      "is_active" boolean NOT NULL DEFAULT true,
      CONSTRAINT "PK_tenant_memberships" PRIMARY KEY ("id"),
      CONSTRAINT "UQ_tenant_memberships_actor_tenant" UNIQUE ("actor_id", "tenant_id"),
      CONSTRAINT "FK_tenant_memberships_tenants_tenant_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id"),
      CONSTRAINT "FK_tenant_memberships_admins_actor_id" FOREIGN KEY ("actor_id") REFERENCES "admins"("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_tenant_memberships_actor_id" ON "tenant_memberships" ("actor_id")');
    await queryRunner.query('CREATE INDEX "IDX_tenant_memberships_tenant_id" ON "tenant_memberships" ("tenant_id")');
    await queryRunner.query(`CREATE TABLE "plans_master" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar(160) NOT NULL, "tier" varchar(32) NOT NULL,
      "monthly_price_minor" bigint NOT NULL DEFAULT 0, "annual_price_minor" bigint NOT NULL DEFAULT 0,
      "is_active" boolean NOT NULL DEFAULT true, "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      CONSTRAINT "PK_plans_master" PRIMARY KEY ("id"),
      CONSTRAINT "UQ_plans_master_tier" UNIQUE ("tier")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_plans_master_tier" ON "plans_master" ("tier")');
    await queryRunner.query(`CREATE TABLE "subscriptions_master" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(), "tenant_id" uuid NOT NULL, "plan_id" uuid,
      "status" varchar(32) NOT NULL, "auto_renew" boolean NOT NULL DEFAULT true, "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      CONSTRAINT "PK_subscriptions_master" PRIMARY KEY ("id"),
      CONSTRAINT "FK_subscriptions_master_tenants_tenant_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id"),
      CONSTRAINT "FK_subscriptions_master_plans_master_plan_id" FOREIGN KEY ("plan_id") REFERENCES "plans_master"("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_subscriptions_master_tenant_id" ON "subscriptions_master" ("tenant_id")');
    await queryRunner.query(`CREATE TABLE "invoices_master" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(), "tenant_id" uuid NOT NULL, "invoice_no" varchar(80) NOT NULL,
      "amount_minor" bigint NOT NULL DEFAULT 0, "status" varchar(32) NOT NULL, "issued_at" timestamptz NOT NULL, "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      CONSTRAINT "PK_invoices_master" PRIMARY KEY ("id"),
      CONSTRAINT "UQ_invoices_master_invoice_no" UNIQUE ("invoice_no"),
      CONSTRAINT "FK_invoices_master_tenants_tenant_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_invoices_master_tenant_id" ON "invoices_master" ("tenant_id")');
    await queryRunner.query(`CREATE TABLE "payment_methods_master" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(), "tenant_id" uuid NOT NULL, "provider" varchar(40) NOT NULL,
      "external_reference" varchar(160) NOT NULL, "is_default" boolean NOT NULL DEFAULT false, "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      CONSTRAINT "PK_payment_methods_master" PRIMARY KEY ("id"),
      CONSTRAINT "UQ_payment_methods_master_external_reference" UNIQUE ("external_reference"),
      CONSTRAINT "FK_payment_methods_master_tenants_tenant_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_payment_methods_master_tenant_id" ON "payment_methods_master" ("tenant_id")');
    await queryRunner.query(`CREATE TABLE "upgrade_requests_master" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(), "tenant_id" uuid NOT NULL, "requested_plan_id" uuid NOT NULL,
      "status" varchar(32) NOT NULL DEFAULT 'PENDING', "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
      CONSTRAINT "PK_upgrade_requests_master" PRIMARY KEY ("id"),
      CONSTRAINT "FK_upgrade_requests_master_tenants_tenant_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id"),
      CONSTRAINT "FK_upgrade_requests_master_plans_master_requested_plan_id" FOREIGN KEY ("requested_plan_id") REFERENCES "plans_master"("id")
    )`);
    await queryRunner.query('CREATE INDEX "IDX_upgrade_requests_master_tenant_id" ON "upgrade_requests_master" ("tenant_id")');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "upgrade_requests_master"');
    await queryRunner.query('DROP TABLE IF EXISTS "payment_methods_master"');
    await queryRunner.query('DROP TABLE IF EXISTS "invoices_master"');
    await queryRunner.query('DROP TABLE IF EXISTS "subscriptions_master"');
    await queryRunner.query('DROP TABLE IF EXISTS "plans_master"');
    await queryRunner.query('DROP TABLE IF EXISTS "tenant_memberships"');
    await queryRunner.query('DROP TABLE IF EXISTS "admins"');
    await queryRunner.query('DROP TABLE IF EXISTS "tenants"');
  }
}
