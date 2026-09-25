// RESPONSIBILITY: Adds immutable request user-agent metadata to tenant audit records without rewriting prior audit history.
// FLOW: Existing audit_logs -> nullable user_agent column -> AdminCoreAuditTrailService persistence.
import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * @description Defines the AdminTenantAuditUserAgent1750000000001 boundary for the admin_core_database backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminTenantAuditUserAgent1750000000001 implements MigrationInterface {
  name = 'AdminTenantAuditUserAgent1750000000001';

  /** @description Adds the optional user-agent column to tenant audit records. @param queryRunner Migration runner. @returns Completion promise. @remarks The nullable additive change preserves backward compatibility. */
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "audit_logs" ADD COLUMN IF NOT EXISTS "user_agent" varchar(512)`);
  }

  /** @description Removes the additive user-agent audit field during rollback. @param queryRunner Migration runner. @returns Completion promise. */
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "audit_logs" DROP COLUMN IF EXISTS "user_agent"`);
  }
}
