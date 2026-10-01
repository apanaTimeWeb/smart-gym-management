// RESPONSIBILITY: Centralizes all route and API paths owned by the System Ops summary feature.
export const SuperadminSystemOpsUrlConfig = {
  PAGES: {
    MAIN: '/superadmin/system-ops',
    INFRASTRUCTURE: '/superadmin/system-ops/infrastructure',
    JOBS: '/superadmin/system-ops/jobs',
    BACKUPS: '/superadmin/system-ops/backups',
    MIGRATIONS: '/superadmin/system-ops/migrations',
  },
  API: { SUMMARY: '/superadmin/system-ops/summary' },
} as const;

