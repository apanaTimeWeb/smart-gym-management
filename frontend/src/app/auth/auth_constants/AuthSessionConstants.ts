/**
 * RESPONSIBILITY: Owns authentication cookie names and session lifetime configuration for the Auth module.
 * DATA FLOW: Auth routes consume these constants when reading, setting, refreshing, and clearing session cookies.
 */
export const AuthSessionConstants = {
  COOKIES: {
    ACCESS_TOKEN: 'gymsmart_token',
    REFRESH_TOKEN: 'gymsmart_refresh_token',
    USER: 'gymsmart_user',
    GHOST_ORIGINAL_ACCESS_TOKEN: 'gymsmart_ghost_original_access_token',
    GHOST_ORIGINAL_REFRESH_TOKEN: 'gymsmart_ghost_original_refresh_token',
    GHOST_ORIGINAL_USER: 'gymsmart_ghost_original_user',
  },
  MAX_AGE_SECONDS: {
    ACCESS_TOKEN: 15 * 60,
    REFRESH_TOKEN: 7 * 24 * 60 * 60,
  },
} as const;
