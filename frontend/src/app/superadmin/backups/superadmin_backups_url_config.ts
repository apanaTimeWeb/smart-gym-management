export const BackupsUrlConfig = {
    PAGES: { MAIN: '/superadmin/backups' },
    BACKEND_API: { BASE: '/superadmin/backups', TRIGGER: '/superadmin/backups/trigger', DOWNLOAD: (id: string) => `/superadmin/backups/${encodeURIComponent(id)}/download`, RESTORE: (id: string) => `/superadmin/backups/${encodeURIComponent(id)}/restore` },
} as const;
