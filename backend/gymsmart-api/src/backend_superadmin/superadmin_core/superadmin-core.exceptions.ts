// RESPONSIBILITY: Defines typed infrastructure exceptions for core configuration, encryption, and realtime boundaries.
// FLOW: Core provider -> typed exception -> startup/transport boundary -> controlled failure.
/**
 * Primary Intent: Defines SuperadminCoreConfigurationException as the class-level contract for superadmin-core.exceptions.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminCoreConfigurationException extends Error {
  constructor(message: string) { super(message); this.name = 'SuperadminCoreConfigurationException'; }
}
/**
 * Primary Intent: Defines SuperadminCoreEncryptionConfigurationException as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */

export class SuperadminCoreEncryptionConfigurationException extends Error {
  constructor(message: string) { super(message); this.name = 'SuperadminCoreEncryptionConfigurationException'; }
}
/**
 * Primary Intent: Defines SuperadminCoreRealtimeAuthenticationException as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */

export class SuperadminCoreRealtimeAuthenticationException extends Error {
  constructor(message: string) { super(message); this.name = 'SuperadminCoreRealtimeAuthenticationException'; }
}
