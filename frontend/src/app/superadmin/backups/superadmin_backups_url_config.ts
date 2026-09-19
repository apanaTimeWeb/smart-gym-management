export const BackupsUrlConfig = {
    PAGES: { MAIN: '/superadmin/backups' },
    BACKEND_API: { BASE: '/superadmin/backups', SCHEDULE: '/superadmin/backups/schedule', TRIGGER: '/superadmin/backups/trigger', DOWNLOAD: (id: string) => `/superadmin/backups/${encodeURIComponent(id)}/download`, RESTORE: (id: string) => `/superadmin/backups/${encodeURIComponent(id)}/restore` },
} as const;
