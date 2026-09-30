// RESPONSIBILITY: Adds database-level business invariants for public Landing inputs.
// FLOW: Tenant migration runner -> landing tables -> named CHECK constraints.
import type { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Intent: Add last-line database validation for empty visitor names/messages that must never persist even if application validation is bypassed.
 * Edge Cases: Existing invalid rows would cause migration failure; the migration therefore uses constraints that reflect current DTO limits.
 * Side Effects: Adds named PostgreSQL CHECK constraints only.
 * AI Notes: Application validation remains the first line; these constraints are the final persistence guard.
 */
export class HardenLandingChecks20260928221500 implements MigrationInterface {
  name = 'HardenLandingChecks20260928221500';

  /** @description Adds deterministic named CHECK constraints for non-empty normalized Landing fields. @param queryRunner - TypeORM tenant database query runner. @returns Resolves after constraints are created. */
  /** @description Applies this migration's schema changes. @param queryRunner - Active TypeORM migration runner. @returns Resolves after all schema operations complete. @throws Error when PostgreSQL rejects a schema operation. */
  
  /**
   * Intent: Preserve the single responsibility of 20260928221500-harden-landing-checks.up at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "landing_bookings" ADD CONSTRAINT "CHK_landing_bookings_name_nonempty" CHECK (char_length(btrim("name")) >= 1)`);
    await queryRunner.query(`ALTER TABLE "landing_contacts" ADD CONSTRAINT "CHK_landing_contacts_name_nonempty" CHECK (char_length(btrim("name")) >= 1)`);
    await queryRunner.query(`ALTER TABLE "landing_contacts" ADD CONSTRAINT "CHK_landing_contacts_message_nonempty" CHECK (char_length(btrim("message")) >= 1)`);
  }

  /** @description Removes only the constraints introduced by this migration. @param queryRunner - TypeORM tenant database query runner. @returns Resolves after rollback. */
  /** @description Reverts only the schema objects created by this migration. @param queryRunner - Active TypeORM migration runner. @returns Resolves after rollback operations complete. @throws Error when PostgreSQL rejects a rollback operation. */
  
  /**
   * Intent: Preserve the single responsibility of 20260928221500-harden-landing-checks.down at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "landing_contacts" DROP CONSTRAINT "CHK_landing_contacts_message_nonempty"`);
    await queryRunner.query(`ALTER TABLE "landing_contacts" DROP CONSTRAINT "CHK_landing_contacts_name_nonempty"`);
    await queryRunner.query(`ALTER TABLE "landing_bookings" DROP CONSTRAINT "CHK_landing_bookings_name_nonempty"`);
  }
}
