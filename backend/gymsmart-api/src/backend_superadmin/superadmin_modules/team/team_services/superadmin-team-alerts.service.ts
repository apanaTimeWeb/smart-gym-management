// RESPONSIBILITY: Persists a Superadmin team alert event in the audit trail.
// FLOW: Controller -> SuperadminTeamAlertsService -> SuperadminCoreAuditTrailService -> audit_logs.
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SuperadminCoreAuditTrailService } from '@/backend_superadmin/superadmin_core/superadmin_core_observability/superadmin-core-audit-trail.service';
import { SuperadminTeamAlertActionDto } from '@/backend_superadmin/superadmin_modules/team/team_dtos/superadmin-team-alert-action.dto';
import { getRequestContext } from '@/backend_superadmin/superadmin_core/superadmin_core_observability/superadmin-core-request-context';

/**
 * Primary Intent: Defines SuperadminTeamAlertsService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminTeamAlertsService {
  constructor(private readonly auditTrail: SuperadminCoreAuditTrailService) {}

  /**
   * @description Records a team-alert action with the authenticated request identity for the audit trail.
   * @param input - Validated team-alert action payload.
   * @returns Null because the frontend mutation contract has no response payload.
   * @throws UnauthorizedException when the authenticated request context is unavailable.
   */
  /**
   * Primary Intent: Executes the `recordTeamAlertAction` responsibility owned by this feature-local superadmin-team-alerts.service construct.
   * Edge Cases: Missing records, invalid inputs, and downstream failures must fail fast and preserve the owning feature's error contract.
   * Side-Effects: Only the documented persistence, cache, queue, event, or adapter effects of this method are allowed.
   * AI-Note: Preserve the explicit return type, single responsibility, dependency boundary, and repository/service separation when repairing this method.
   */
  /**
   * Primary Intent: Executes the recordTeamAlertAction use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async recordTeamAlertAction(input: SuperadminTeamAlertActionDto): Promise<null> {
    const context = getRequestContext();
    if (!context?.userId || !context.userRole) throw new UnauthorizedException('Authenticated request context is required');
    const action = input.action;
    const entityId = input.id ?? 'team-alert';
    await this.auditTrail.record({ actorId: context.userId, actorRole: context.userRole, action, entityType: 'team_alert', entityId, oldValue: null, newValue: input, ipAddress: context.ipAddress, tenantId: context.tenantId });
    return null;
  }
}
