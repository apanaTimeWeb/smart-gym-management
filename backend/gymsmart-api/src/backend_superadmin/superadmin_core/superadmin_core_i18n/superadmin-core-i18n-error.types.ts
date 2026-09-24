// RESPONSIBILITY: Defines the stable translation-key error payload accepted by the canonical error filters.
// FLOW: Service/guard -> NestJS HttpException response -> SuperadminI18nMessageKey -> localized ApiResponse.
/**
 * Primary Intent: Defines SuperadminI18nMessageKey as the interface-level contract for superadmin-core-i18n-error.types.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminI18nMessageKey { key: string; args?: Record<string, string | number>; }
