import { describe, expect, it } from 'vitest';
import { formatDateTime } from '@/app/frontend_admin/admin_audit_logs/admin_audit_logs_utils/AdminAuditLogsFormatters';

describe('AdminAuditLogsFormatters', () => {
  it('formats timestamps using the requested locale', () => {
    expect(formatDateTime('2026-01-05T13:04:05Z', 'en-IN', true)).toMatch(/05 Jan 2026|5 Jan 2026/);
  });
});
