// RESPONSIBILITY: Adds immutable request user-agent metadata to master audit records without rewriting prior audit history.
// FLOW: Existing audit_logs -> nullable user_agent column -> AdminCoreAuditTrailService persistence.
import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * @description Defines the AdminAuditUserAgent1750000000000 boundary for the admin_core_database backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAuditUserAgent1750000000000 implements MigrationInterface {
  name = 'AdminAuditUserAgent1750000000000';

  /** @description Adds the optional user-agent audit column with a backward-compatible nullable migration. @param queryRunner Migration runner. @returns Completion promise. @remarks Existing clients continue to work because the new field is nullable. */
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "audit_logs" ADD COLUMN IF NOT EXISTS "user_agent" varchar(512)`);
  }

  /** @description Removes only the additive audit column when rolling back this migration. @param queryRunner Migration runner. @returns Completion promise. */
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "audit_logs" DROP COLUMN IF EXISTS "user_agent"`);
  }
}
