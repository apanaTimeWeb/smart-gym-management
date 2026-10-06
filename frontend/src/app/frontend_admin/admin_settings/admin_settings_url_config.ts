// admin_settings_url_config.ts
// Owned by: frontend_admin/admin_settings feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_SETTINGS_ROUTES = {
  root: '/frontend_admin/admin_settings' as const,
  dashboard: '/frontend_admin/admin_dashboard' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_SETTINGS_BASE_URL = '/frontend_admin/admin_settings' as const;
export const ADMIN_SETTINGS_FETCH_SETTINGS_URL = '/admin/settings/fetchSettings' as const;
export const ADMIN_SETTINGS_UPDATE_SETTINGS_URL = '/admin/settings/updateSettings' as const;
export const ADMIN_SETTINGS_TWO_FACTOR_STATUS_URL = '/admin/settings/2fa/status' as const;
export const ADMIN_SETTINGS_TWO_FACTOR_ENABLE_URL = '/admin/settings/2fa/enable' as const;
export const ADMIN_SETTINGS_TWO_FACTOR_DISABLE_URL = '/admin/settings/2fa/disable' as const;
export const ADMIN_SETTINGS_TWO_FACTOR_VERIFY_URL = '/admin/settings/2fa/verify' as const;
export const ADMIN_SETTINGS_NOTIFICATION_PREFERENCES_URL = '/admin/settings/notifications' as const;
export const ADMIN_SETTINGS_PERMISSIONS_REFERENCE_URL = '/admin/permissions/fetchPermissions' as const;

export const ADMIN_SETTINGS_URLS = {
  base: ADMIN_SETTINGS_BASE_URL,
  fetchSettings: ADMIN_SETTINGS_FETCH_SETTINGS_URL,
  updateSettings: ADMIN_SETTINGS_UPDATE_SETTINGS_URL,
  twoFactorStatus: ADMIN_SETTINGS_TWO_FACTOR_STATUS_URL,
  twoFactorEnable: ADMIN_SETTINGS_TWO_FACTOR_ENABLE_URL,
  twoFactorDisable: ADMIN_SETTINGS_TWO_FACTOR_DISABLE_URL,
  twoFactorVerify: ADMIN_SETTINGS_TWO_FACTOR_VERIFY_URL,
  notificationPreferences: ADMIN_SETTINGS_NOTIFICATION_PREFERENCES_URL,
  permissionsReference: ADMIN_SETTINGS_PERMISSIONS_REFERENCE_URL,
} as const;

export const ADMIN_SETTINGS_API = ADMIN_SETTINGS_URLS;

export const ADMIN_SETTINGS_WHATSAPP_WEB_URL = 'https://wa.me' as const;
export const ADMIN_SETTINGS_TELEPHONE_URL = 'tel:' as const;
export const ADMIN_SETTINGS_EXTERNAL_URLS = { whatsappWeb: ADMIN_SETTINGS_WHATSAPP_WEB_URL, telephone: ADMIN_SETTINGS_TELEPHONE_URL } as const;
