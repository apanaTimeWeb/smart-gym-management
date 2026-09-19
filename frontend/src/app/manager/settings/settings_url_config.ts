// RESPONSIBILITY: Owns every Manager Settings route and API path used by this feature.
export const ManagerSettingsUrlConfig = {
  PAGES: { SETTINGS: '/manager/settings' },
  BACKEND_API: {
    BASE: '/manager/settings',
  },
} as const;
