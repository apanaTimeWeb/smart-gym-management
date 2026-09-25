// RESPONSIBILITY: Renames tenant primary-key constraints to deterministic Rule 100 names.
// FLOW: Migration runner -> information_schema -> safe identifier quoting -> deterministic constraint names.
import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * @description Defines the AdminPrimaryKeyConstraintNames1742000000000 boundary for the admin_core_database backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPrimaryKeyConstraintNames1742000000000 implements MigrationInterface {
  /** @description Renames every Admin primary-key constraint to `PK_[table]` without changing table or column semantics. @param queryRunner Migration runner. @returns Completion promise. */
  async up(queryRunner: QueryRunner): Promise<void> {
    const rows = await queryRunner.query(`SELECT tc.table_name AS "tableName", tc.constraint_name AS "constraintName" FROM information_schema.table_constraints tc WHERE tc.constraint_type = 'PRIMARY KEY' AND tc.table_schema = current_schema() AND tc.table_name LIKE 'admin_%'`);
    for (const row of rows as Array<{ tableName: string; constraintName: string }>) {
      const expected = `PK_${row.tableName}`;
      if (row.constraintName === expected) continue;
      const quote = (value: string): string => `"${value.replace(/"/g, '""')}"`;
      await queryRunner.query(`ALTER TABLE ${quote(row.tableName)} RENAME CONSTRAINT ${quote(row.constraintName)} TO ${quote(expected)}`);
    }
  }

  /** @description Intentionally leaves deterministic constraint names in place on rollback. @param _queryRunner Migration runner. @returns Completion promise. */
  async down(_queryRunner: QueryRunner): Promise<void> {}
}
