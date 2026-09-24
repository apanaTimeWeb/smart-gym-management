// RESPONSIBILITY: Central registry of runtime event names used for cross-feature decoupling.
// FLOW: Feature service -> EventRegistry constant -> event transport/consumer.
/**
 * Primary Intent: Documents the constant(s) EVENT_REGISTRY contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export const EVENT_REGISTRY = {
  SUPERADMIN_GYM_CREATED: 'SUPERADMIN.GYM.CREATED',
  SUPERADMIN_GYM_STATUS_CHANGED: 'SUPERADMIN.GYM.STATUS_CHANGED',
  SUPERADMIN_MESSAGE_SENT: 'SUPERADMIN.MESSAGE.SENT',
  SUPERADMIN_BROADCAST_CREATED: 'SUPERADMIN.BROADCAST.CREATED',
  SUPERADMIN_INVOICE_PAID: 'SUPERADMIN.INVOICE.PAID',
  SUPERADMIN_JOB_FAILED: 'SUPERADMIN.JOB.FAILED',
  SUPERADMIN_TENANT_PROVISIONED: 'SUPERADMIN.TENANT.PROVISIONED',
  SUPERADMIN_EXPORT_COMPLETED: 'SUPERADMIN.EXPORT.COMPLETED',
} as const;
/**
 * Primary Intent: Defines EventName as the type-level contract for superadmin-core-event-registry.constants.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export type EventName = (typeof EVENT_REGISTRY)[keyof typeof EVENT_REGISTRY];
