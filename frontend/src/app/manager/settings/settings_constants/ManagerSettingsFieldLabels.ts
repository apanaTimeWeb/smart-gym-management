// RESPONSIBILITY: Provides human-readable labels for editable Manager Settings fields; no business data is stored here.
export const MANAGER_SETTINGS_GYM_FIELD_LABELS = {
  gymName: 'Gym Name',
  phone: 'Phone',
  email: 'Email',
  address: 'Address',
  city: 'City',
  state: 'State',
  pincode: 'Pincode',
  website: 'Website',
  gstin: 'GSTIN',
} as const;

export const MANAGER_SETTINGS_MEMBERSHIP_FIELD_LABELS = {
  gracePeriodDays: 'Grace Period (Days)',
  maxFreezeDaysPerYear: 'Maximum Freeze Days / Year',
  autoSuspendAfterDays: 'Auto Suspend After (Days)',
  reminderDaysBefore: 'Reminder Before Expiry (Days)',
  autoSuspendOnExpiry: 'Auto Suspend on Expiry',
  allowFreeze: 'Allow Membership Freeze',
} as const;
