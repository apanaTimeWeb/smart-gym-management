// RESPONSIBILITY: Defines audit actor roles used by the public Landing module.
// FLOW: Request context â†’ audit repository â†’ audit_logs.actor_role.
export enum LandingAuditActorRole {
  PUBLIC = 'PUBLIC',
}
