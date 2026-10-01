/**
 * @description Canonical module-wide constants discovery entrypoint for superadmin_affiliates.
 * @contract Feature-specific static UI/business configuration is owned by this module boundary.
 * @note Existing feature-local registries are re-exported here to preserve the working baseline.
 */
export const SuperadminAffiliatesConstants = Object.freeze({}) as const;
export const SUPERADMIN_AFFILIATE_STATUS_CODES = Object.freeze({
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING: 'PENDING',

} as const);
export const SUPERADMIN_AFFILIATE_PAYOUT_STATUS_CODES = Object.freeze({
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
} as const);
export const SUPERADMIN_AFFILIATE_PAYOUT_METHOD_CODES = Object.freeze({
  BANK_TRANSFER: 'BANK_TRANSFER',
  PAYPAL: 'PAYPAL',
} as const);
export const SUPERADMIN_AFFILIATE_ALL_FILTER = 'ALL' as const;
