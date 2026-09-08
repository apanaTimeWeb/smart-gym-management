// RESPONSIBILITY: Centralized URL config for the Admin Audit Logs module.
export const AdminAuditLogsUrlConfig = {
  PAGES: { LIST: '/admin/audit_logs' },
  BACKEND_API: {
    BASE: '/admin/audit-logs',
    EXPORT: '/admin/audit-logs/export',
  },
} as const;
