import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Primary Intent: Adds explicit ISO 4217 currency storage for fixed-amount coupon discounts.
 * Edge Cases: Existing fixed-amount coupons receive INR for backward compatibility; percentage coupons remain nullable.
 * Side-Effects: Adds a nullable currency column without destructive schema changes.
 * AI-Note: Keep this migration backward compatible and run it through the normal migration chain.
 */
export class SuperadminCoreCouponsCurrencyMigration implements MigrationInterface {
  /** Adds the schema elements required by this migration; safe to run once through the migration runner. */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE superadmin_coupons ADD COLUMN IF NOT EXISTS currency char(3)`);
    await queryRunner.query(`UPDATE superadmin_coupons SET currency='INR' WHERE currency IS NULL AND discount_type='FIXED_AMOUNT'`);
  }
  /** Reverts only the schema elements introduced by this migration. */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE superadmin_coupons DROP COLUMN IF EXISTS currency`);
  }
}
