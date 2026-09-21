// RESPONSIBILITY: Defines stable contract-state and business constants for the messaging feature.
// FLOW: Feature services -> constants -> repository/query behavior.

export const MESSAGING_SNAPSHOT_KINDS = Object.freeze({
  TEMPLATE_INSIGHTS: 'template-insights',
  WHATSAPP_BULK_CENTER: 'whatsapp-bulk-center',
} as const);
