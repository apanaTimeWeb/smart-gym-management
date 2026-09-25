// RESPONSIBILITY: Defines finite core audit severity values.
// FLOW: Audit producer → AdminCoreAuditTrailService → audit_logs.severity enum.

export enum AdminCoreAuditSeverity {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}
