// RESPONSIBILITY: Persists a Superadmin team alert event in the audit trail.
// FLOW: Controller -> SuperadminTeamAlertsService -> SuperadminAuditTrailService -> audit_logs.
import { Injectable } from '@nestjs/common';
import { SuperadminAuditTrailService } from '@/backend_superadmin/superadmin_core/observability/superadmin-core-audit-trail.service';
import { SuperadminTeamAlertActionDto } from '@/backend_superadmin/superadmin_modules/team/dtos/superadmin-team-alert-action.dto';

@Injectable()
export class SuperadminTeamAlertsService {
  constructor(private readonly auditTrail: SuperadminAuditTrailService) {}

  /** Records a team alert acknowledgement/action without inventing a second business store. */
  async recordTeamAlertAction(input: SuperadminTeamAlertActionDto): Promise<Record<string, unknown>> {
    const action = input.action;
    const entityId = input.id ?? 'team-alert';
    await this.auditTrail.record({ actorId: 'system', actorRole: 'SUPERADMIN', action, entityType: 'team_alert', entityId, oldValue: null, newValue: input, ipAddress: 'unknown', tenantId: null });
    return { id: entityId, action, recorded: true };
  }
}