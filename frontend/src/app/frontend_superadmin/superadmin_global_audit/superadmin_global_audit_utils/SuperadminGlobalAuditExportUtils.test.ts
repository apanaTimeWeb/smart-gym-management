import { describe, expect, it } from 'vitest';

import { getSuperadminGlobalAuditExportDate, serializeSuperadminGlobalAuditTimestamp } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_utils/SuperadminGlobalAuditExportUtils';



describe('SuperadminGlobalAuditExportUtils', () => {
  it('serializes export dates deterministically', () => {
    const day = getSuperadminGlobalAuditExportDate();
    expect(day).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(serializeSuperadminGlobalAuditTimestamp('2025-01-02T03:04:05.000Z')).toBe('2025-01-02T03:04:05.000Z');
  });
});
