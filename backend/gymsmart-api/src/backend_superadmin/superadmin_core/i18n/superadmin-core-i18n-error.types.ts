// RESPONSIBILITY: Defines the stable translation-key error payload accepted by the canonical error filters.
// FLOW: Service/guard -> NestJS HttpException response -> SuperadminI18nMessageKey -> localized ApiResponse.
export interface SuperadminI18nMessageKey { key: string; args?: Record<string, string | number>; }
