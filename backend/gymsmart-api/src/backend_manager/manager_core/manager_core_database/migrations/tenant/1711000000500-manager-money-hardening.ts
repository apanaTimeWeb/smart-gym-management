// RESPONSIBILITY: Migrates Manager monetary payload fields into integer minor-unit columns with explicit currency metadata.
// FLOW: Legacy JSONB money -> validated integer minor columns -> remove duplicate monetary keys from JSONB.
import { MigrationInterface, QueryRunner } from 'typeorm';

const MONEY_FIELDS: Record<string, string[]> = {
  manager_finances: ['amount', 'gstAmount', 'discountAmount', 'taxableAmount'],
  manager_plans: ['price1Month', 'price3Month', 'price6Month', 'price12Month'],
  manager_stores: ['price', 'costPrice', 'total'],
  manager_hrs: ['salary', 'advanceSalary', 'currentDue', 'amount', 'paidAmount', 'pendingAmount', 'advanceAmount', 'netPayable'],
  manager_members: ['totalAmount', 'paidAmount', 'pendingAmount', 'advanceAmount', 'amountPaid'],
  manager_inquiries: ['totalAmount', 'paidAmount', 'pendingAmount'],
  manager_expenses: ['amount', 'taxAmount'],
  manager_maintenances: ['estimatedCost'],
  manager_pts: ['price', 'amountPaid', 'totalAmount'],
  manager_referrals: ['rewardAmount'],
  manager_sales: ['amount', 'revenue', 'pendingAmount', 'refund'],
  manager_reports: ['totalRevenue', 'totalExpenses', 'netProfit', 'revenue', 'expenses', 'profit', 'amount'],
  manager_dashboards: ['totalRevenue', 'monthlyRevenue', 'pendingPayments', 'todayCollection', 'totalPTRevenue', 'paidAmount', 'pendingAmount'],
};

function snake(value: string): string { return value.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`); }

export class ManagerMoneyHardening1711000000500 implements MigrationInterface {
  name = 'ManagerMoneyHardening1711000000500';

  /** Applies nullable minor-unit columns and currency metadata, then migrates legacy JSONB amounts. */
  async up(queryRunner: QueryRunner): Promise<void> {
    for (const [table, fields] of Object.entries(MONEY_FIELDS)) {
      for (const field of fields) {
        const column = `${snake(field)}_minor`;
        await queryRunner.query(`ALTER TABLE "${table}" ADD COLUMN IF NOT EXISTS "${column}" BIGINT`);
        await queryRunner.query(`ALTER TABLE "${table}" DROP CONSTRAINT IF EXISTS "CHK_${table}_${column}_nonnegative"`);
        await queryRunner.query(`ALTER TABLE "${table}" ADD CONSTRAINT "CHK_${table}_${column}_nonnegative" CHECK ("${column}" IS NULL OR "${column}" >= 0)`);
        await queryRunner.query(`UPDATE "${table}" SET "${column}" = ROUND((payload ->> '${field}')::numeric * 100)::bigint WHERE "${column}" IS NULL AND payload ? '${field}' AND (payload ->> '${field}') ~ '^[0-9]+(\\.[0-9]+)?$'`);
        await queryRunner.query(`UPDATE "${table}" SET payload = payload - '${field}' WHERE payload ? '${field}'`);
      }
      await queryRunner.query(`ALTER TABLE "${table}" ADD COLUMN IF NOT EXISTS "currency" VARCHAR(3) NOT NULL DEFAULT 'INR'`);
      await queryRunner.query(`ALTER TABLE "${table}" DROP CONSTRAINT IF EXISTS "CHK_${table}_currency_iso4217"`);
      await queryRunner.query(`ALTER TABLE "${table}" ADD CONSTRAINT "CHK_${table}_currency_iso4217" CHECK (currency ~ '^[A-Z]{3}$')`);
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_${table}_currency" ON "${table}" (currency)`);
    }
  }

  /** Reverts the monetary storage migration without dropping business rows. */
  async down(queryRunner: QueryRunner): Promise<void> {
    for (const [table, fields] of Object.entries(MONEY_FIELDS)) {
      await queryRunner.query(`DROP INDEX IF EXISTS "IDX_${table}_currency"`);
      await queryRunner.query(`ALTER TABLE "${table}" DROP CONSTRAINT IF EXISTS "CHK_${table}_currency_iso4217"`);
      await queryRunner.query(`ALTER TABLE "${table}" DROP COLUMN IF EXISTS "currency"`);
      for (const field of fields) {
        const column = `${snake(field)}_minor`;
        await queryRunner.query(`ALTER TABLE "${table}" DROP CONSTRAINT IF EXISTS "CHK_${table}_${column}_nonnegative"`);
        await queryRunner.query(`ALTER TABLE "${table}" DROP COLUMN IF EXISTS "${column}"`);
      }
    }
  }
}
