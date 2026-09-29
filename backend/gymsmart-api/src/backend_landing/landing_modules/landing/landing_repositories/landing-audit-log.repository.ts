// RESPONSIBILITY: Persists immutable audit records for Landing mutations in the current tenant database.
// FLOW: Landing service -> LandingAuditLogRepository -> TypeORM repository -> audit_logs.
import { Injectable } from '@nestjs/common';

import { LandingRequestContextService } from '@/backend_landing/landing_core/landing_context/landing-request-context.service';
import { LandingOrmTransactionContextService } from '@/backend_landing/landing_core/landing_database/landing-orm-transaction-context.service';
import { LandingBaseRepository } from '@/backend_landing/landing_core/landing_database/landing-base.repository';

import { LandingAuditLogEntity } from '@/backend_landing/landing_modules/landing/landing_entities/landing-audit-log.entity';
import { LandingAuditActorRole } from '@/backend_landing/landing_modules/landing/landing_enums/landing-audit-actor-role.enum';

import type { Repository } from 'typeorm';

/**
 * Intent: Persist a sanitized immutable audit record for each meaningful Landing mutation in the tenant database.
 * Edge Cases: Audit persistence failure must fail the enclosing transaction so a successful mutation can never silently lose its required audit trail.
 * Side Effects: Inserts one row into the tenant audit_logs table; no external calls or cache invalidation occur here.
 * AI Notes: This repository owns audit persistence only and must not gain HTTP logic, business rules, or sibling-feature dependencies.
 */
@Injectable()
export class LandingAuditLogRepository extends LandingBaseRepository<LandingAuditLogEntity> {
  
  /**
   * Intent: Preserve the single responsibility of landing-audit-log.repository.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(
    private readonly requestContext: LandingRequestContextService,
    transactionContext: LandingOrmTransactionContextService,
  ) {
    super(LandingAuditLogEntity, transactionContext);
  }

  /**
   * Intent: Record the actor, action, target entity, previous value, new value, timestamp, and originating IP for a Landing mutation.
   * Edge Cases: The request context may represent an anonymous public actor, in which case actorId remains null while actorRole is PUBLIC.
   * Side Effects: Inserts the audit row using the caller's transaction context so the record commits or rolls back atomically with the business mutation.
   * AI Notes: Never log credentials or raw request bodies; only pass already-sanitized auditable fields.
   * @param action Stable mutation action code.
   * @param entityType Business entity type.
   * @param entityId Created or mutated entity UUID.
   * @param newValue Sanitized business fields safe for audit storage.
   */
  async recordCreate(
    action: string,
    entityType: string,
    entityId: string,
    newValue: Record<string, unknown>,
  ): Promise<void> {
    const repository: Repository<LandingAuditLogEntity> = this.repositoryFor();
    const request = this.requestContext.get();
    const entity = repository.create({
      actorId: request.userId,
      actorRole: LandingAuditActorRole.PUBLIC,
      action,
      entityType,
      entityId,
      oldValue: null,
      newValue,
      ipAddress: request.ipAddress,
    });
    await repository.save(entity);
  }
}
