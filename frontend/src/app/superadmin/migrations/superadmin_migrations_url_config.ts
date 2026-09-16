// RESPONSIBILITY: Centralizes Superadmin migration route and API endpoint constants.
export const MigrationsUrlConfig = {
  PAGES: {
    MAIN: '/superadmin/migrations',
  },
  BACKEND_API: {
    BASE: '/superadmin/migrations',
    TRIGGER: '/superadmin/migrations/trigger',
  },
} as const;
