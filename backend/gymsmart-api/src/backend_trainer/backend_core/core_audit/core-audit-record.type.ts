// RESPONSIBILITY: Defines the persistence-neutral input contract for audit-log records.
// FLOW: Mutation audit call → CoreAuditRecordInput → audit repository.

export interface CoreAuditRecordInput {
  actorId: string;
  actorRole: string;
  action: string;
  entityType: string;
  entityId: string;
  oldValue: Record<string, unknown> | null;
  newValue: Record<string, unknown> | null;
  ipAddress: string | null;
}
