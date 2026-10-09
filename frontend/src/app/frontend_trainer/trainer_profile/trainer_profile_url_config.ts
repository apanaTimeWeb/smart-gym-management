// trainer_profile_url_config.ts
// RESPONSIBILITY: Canonical navigation and API endpoint contract owned only by trainer_profile.
// DATA FLOW: feature navigation/API consumers -> named URL constants -> MODULE_URLS.

export const TRAINER_PROFILE_PAGE_DASHBOARD = '/trainer/dashboard' as const;
export const TRAINER_PROFILE_PAGE_LIST = '/trainer/profile' as const;

export const TRAINER_PROFILE_API_PROFILE = '/trainer/profile' as const;
export const TRAINER_PROFILE_API_PASSWORD = '/trainer/trainer_profile/password' as const;

export const TRAINER_PROFILE_URLS = {
  ROUTES: {
    DASHBOARD: TRAINER_PROFILE_PAGE_DASHBOARD,
    LIST: TRAINER_PROFILE_PAGE_LIST,
  } as const,
  API: {
    PROFILE: TRAINER_PROFILE_API_PROFILE,
    PASSWORD: TRAINER_PROFILE_API_PASSWORD,
  } as const,
} as const;
