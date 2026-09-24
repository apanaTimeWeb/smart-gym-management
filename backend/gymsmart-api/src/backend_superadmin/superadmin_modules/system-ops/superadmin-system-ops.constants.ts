// RESPONSIBILITY: Defines the authoritative system-ops summary contract kind used by the system-ops container.
// FLOW: SuperadminSystemOpsSummaryService -> SystemOpsContractSnapshotRepository -> PostgreSQL.
/**
 * Primary Intent: Documents the constant(s) SYSTEM_OPS_SNAPSHOT_KINDS contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export const SYSTEM_OPS_SNAPSHOT_KINDS = Object.freeze({ SUMMARY: 'summary' } as const);
