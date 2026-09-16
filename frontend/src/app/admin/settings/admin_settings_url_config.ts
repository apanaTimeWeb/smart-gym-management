// RESPONSIBILITY: Single source of truth for all backend API endpoints used by the Settings module.
export const SettingsUrlConfig = {
  PAGES: {
    SETTINGS: '/admin/settings',
  },
  BACKEND_API: {
    BASE: '/admin/settings',
    TWO_FACTOR_STATUS: '/admin/settings/2fa/status',
    TWO_FACTOR_ENABLE: '/admin/settings/2fa/enable',
    TWO_FACTOR_DISABLE: '/admin/settings/2fa/disable',
    TWO_FACTOR_VERIFY: '/admin/settings/2fa/verify',
    NOTIFICATION_PREFERENCES: '/admin/settings/notifications',
  }
};
