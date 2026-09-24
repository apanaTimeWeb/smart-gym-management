import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Primary Intent: Enforces valid DEBIT/CREDIT accounting directions at the database boundary.
 * Edge Cases: Existing valid rows remain unchanged; invalid legacy rows must be remediated before migration.
 * Side-Effects: Prevents malformed financial ledger states.
 * AI-Note: Keep the named constraints aligned with the enum domain.
 */
export class SuperadminCoreLedgerDirectionCheckMigration implements MigrationInterface {
  /** Adds the schema elements required by this migration; safe to run once through the migration runner. */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='CHK_superadmin_affiliate_ledger_direction') THEN ALTER TABLE superadmin_affiliate_ledger_entries ADD CONSTRAINT CHK_superadmin_affiliate_ledger_direction CHECK (direction IN ('DEBIT','CREDIT')); END IF; END $$`);
    await queryRunner.query(`DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='CHK_superadmin_saas_billing_invoice_ledger_direction') THEN ALTER TABLE superadmin_saas_billing_invoice_ledger_entries ADD CONSTRAINT CHK_superadmin_saas_billing_invoice_ledger_direction CHECK (direction IN ('DEBIT','CREDIT')); END IF; END $$`);
  }
  /** Reverts only the schema elements introduced by this migration. */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE superadmin_affiliate_ledger_entries DROP CONSTRAINT IF EXISTS CHK_superadmin_affiliate_ledger_direction`);
    await queryRunner.query(`ALTER TABLE superadmin_saas_billing_invoice_ledger_entries DROP CONSTRAINT IF EXISTS CHK_superadmin_saas_billing_invoice_ledger_direction`);
  }
}
