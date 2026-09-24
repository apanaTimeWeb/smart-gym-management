// RESPONSIBILITY: Defines the immutable queue vocabulary for Superadmin export jobs.
// FLOW: SuperadminExportDataService -> export queue name -> SuperadminExportDataJobEntity / worker.
/**
 * Primary Intent: Documents the constant(s) EXPORT_DATA_QUEUE_NAME contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export const EXPORT_DATA_QUEUE_NAME = 'superadmin-export' as const;
/**
 * Primary Intent: Documents the constant(s) EXPORT_DATA_STATUS contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export const EXPORT_DATA_STATUS = 'QUEUED' as const;
