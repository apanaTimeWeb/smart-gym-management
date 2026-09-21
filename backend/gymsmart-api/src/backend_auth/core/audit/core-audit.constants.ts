// RESPONSIBILITY: Defines the finite actor-role vocabulary persisted by the core audit infrastructure.
// FLOW: CoreAuditLogInput -> CoreAuditLogEntity -> PostgreSQL enum -> audit_logs.

export enum CoreAuditActorRole {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  TRAINER = 'TRAINER',
}
