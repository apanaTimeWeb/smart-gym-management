// RESPONSIBILITY: Centralized constants, Zod schema, and shared data for the Plans module. Single source of truth for tiers, pricing, and form defaults.
export const TIERS = ['BASIC', 'GOLD', 'PREMIUM'];


export const MANAGER_PLANS_MESSAGES = {
  CHANGE_REQUEST_SUCCESS: 'Change request sent to admin.',
  CHANGE_REQUEST_ERROR: 'Failed to send request. Try again.'
};
