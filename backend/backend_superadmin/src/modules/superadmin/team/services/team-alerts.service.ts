// RESPONSIBILITY: Persists a Superadmin team alert event in the audit trail.
// FLOW: Controller -> TeamAlertsService -> AuditTrailService -> audit_logs.
import { Injectable } from '@nestjs/common';
import { AuditTrailService } from '@/core/observability/audit-trail.service';

@Injectable()
export class TeamAlertsService {
  constructor(private readonly auditTrail: AuditTrailService) {}

  /** Records a team alert acknowledgement/action without inventing a second business store. */
  async recordTeamAlertAction(input: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
    const body = input.body as Record<string, unknown> | undefined;
    const action = typeof body?.action === 'string' ? body.action : 'ALERT_ACTION';
    const entityId = typeof body?.id === 'string' ? body.id : 'team-alert';
    await this.auditTrail.record(action, 'team_alert', entityId, null, body ?? {});
    return { id: entityId, action, recorded: true };
  }
}
