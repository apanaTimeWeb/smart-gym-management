// RESPONSIBILITY: Persists a Superadmin team alert event in the audit trail.
// FLOW: Controller -> TeamAlertsService -> AuditTrailService -> audit_logs.
import { Injectable } from '@nestjs/common';
import { AuditTrailService } from '@/backend_superadmin/core/observability/audit-trail.service';
import { TeamAlertActionDto } from '@/backend_superadmin/modules/backend_superadmin/team/dtos/team-alert-action.dto';

@Injectable()
export class TeamAlertsService {
  constructor(private readonly auditTrail: AuditTrailService) {}

  /** Records a team alert acknowledgement/action without inventing a second business store. */
  async recordTeamAlertAction(input: TeamAlertActionDto): Promise<Record<string, unknown>> {
    const action = input.action;
    const entityId = input.id ?? 'team-alert';
    await this.auditTrail.record({ actorId: 'system', actorRole: 'SUPERADMIN', action, entityType: 'team_alert', entityId, oldValue: null, newValue: input, ipAddress: 'unknown', tenantId: null });
    return { id: entityId, action, recorded: true };
  }
}