// RESPONSIBILITY: Defines audit actor roles used by the public Landing module.
// FLOW: Request context → audit repository → audit_logs.actor_role.
export enum LandingAuditActorRole {
  PUBLIC = 'PUBLIC',
}
