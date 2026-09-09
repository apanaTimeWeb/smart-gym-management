// RESPONSIBILITY: Centralized URL config for the Superadmin Profile module.

export const SuperadminProfileUrlConfig = {
  PAGES: {
    PROFILE: '/superadmin/profile',
  },
  BACKEND_API: {
    BASE: '/superadmin/profile',
    PASSWORD: '/superadmin/profile/password',
    CHANGE_CREDENTIALS: '/superadmin/profile/password',
    TWO_FACTOR: '/superadmin/profile/2fa',
  },
} as const;
