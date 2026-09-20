export const BackupsUrlConfig = {
    PAGES: { MAIN: '/superadmin/system-ops/backups' },
    BACKEND_API: { BASE: '/superadmin/system-ops/backups', SCHEDULE: '/superadmin/system-ops/backups/schedule', TRIGGER: '/superadmin/system-ops/backups/trigger', DOWNLOAD: (id: string) => `/superadmin/system-ops/backups/${encodeURIComponent(id)}/download`, RESTORE: (id: string) => `/superadmin/system-ops/backups/${encodeURIComponent(id)}/restore` },
} as const;
