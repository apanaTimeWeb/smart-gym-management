/**
 * @description Defines stable, non-localized tab identifiers for the Manager Plans module and their translation-key mapping.
 * @dependencies Only local module configuration.
 * @edge-case Tab identifiers remain stable across locales so URL state and business logic never depend on translated text.
 */
export const MANAGER_PLANS_TAB_IDS = [
  'VIEW_PLANS',
  'MEMBERSHIP_ACTIVATE',
  'MEMBERSHIP_RENEW',
  'MEMBERSHIP_FREEZE',
  'EXPIRY_CHECK',
] as const;

export type ManagerPlansTabId = typeof MANAGER_PLANS_TAB_IDS[number];

export const MANAGER_PLANS_TAB_LABEL_KEYS: Record<ManagerPlansTabId, string> = {
  VIEW_PLANS: 'TAB_VIEW_PLANS',
  MEMBERSHIP_ACTIVATE: 'TAB_MEMBERSHIP_ACTIVATE',
  MEMBERSHIP_RENEW: 'TAB_MEMBERSHIP_RENEW',
  MEMBERSHIP_FREEZE: 'TAB_MEMBERSHIP_FREEZE',
  EXPIRY_CHECK: 'TAB_EXPIRY_CHECK',
};
