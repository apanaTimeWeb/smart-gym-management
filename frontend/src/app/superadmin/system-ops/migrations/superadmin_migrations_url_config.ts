// RESPONSIBILITY: Centralizes Superadmin migration route and API endpoint constants.
export const MigrationsUrlConfig = {
    PAGES: {
        MAIN: '/superadmin/system-ops/migrations',
    },
    BACKEND_API: {
        BASE: '/superadmin/system-ops/migrations',
        TRIGGER: '/superadmin/system-ops/migrations/trigger',
    },
} as const;
