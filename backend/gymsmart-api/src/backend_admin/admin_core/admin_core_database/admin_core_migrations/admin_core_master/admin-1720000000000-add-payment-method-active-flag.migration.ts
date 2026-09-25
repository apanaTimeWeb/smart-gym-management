// RESPONSIBILITY: Adds soft-deactivation state to master payment methods without deleting payment history.
// FLOW: Migration â†’ payment_methods_master.is_active â†’ repository soft removal.
import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * @description Defines the AddPaymentMethodActiveFlag1720000000000 boundary for the admin_core_database backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AddPaymentMethodActiveFlag1720000000000 implements MigrationInterface {
  name = 'AddPaymentMethodActiveFlag1720000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payment_methods_master" ADD COLUMN "is_active" boolean NOT NULL DEFAULT true`);
    await queryRunner.query(`CREATE INDEX "IDX_payment_methods_master_tenant_active" ON "payment_methods_master" ("tenant_id", "is_active")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_payment_methods_master_tenant_active"`);
    await queryRunner.query(`ALTER TABLE "payment_methods_master" DROP COLUMN IF EXISTS "is_active"`);
  }
}
