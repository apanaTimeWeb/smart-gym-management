// RESPONSIBILITY: Defines shared Superadmin infrastructure literals that must remain centralized.
// FLOW: Core response/filter infrastructure -> immutable message constants.
/**
 * Primary Intent: Documents the constant(s) SUPERADMIN_CORE_SUCCESS_MESSAGES contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export const SUPERADMIN_CORE_SUCCESS_MESSAGES = {
  REQUEST_SUCCESSFUL: 'Request successful',
} as const;

/**
 * Primary Intent: Documents the constant(s) SUPERADMIN_CORE_VALIDATION_MESSAGES contract and business meaning within the owning Superadmin backend boundary.
 * Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them.
 * AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
export const SUPERADMIN_CORE_VALIDATION_MESSAGES = {
  INVALID_VALUE: 'Invalid value',
} as const;
