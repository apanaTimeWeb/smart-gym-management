import { describe, expect, it } from 'vitest';

import { getSuperadminGlobalAuditStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_constants/SuperadminGlobalAuditStatusBadgeConfig';



describe('getSuperadminGlobalAuditStatusBadgeClasses', () => {
  it('maps the documented status to semantic design tokens', () => {
    expect(getSuperadminGlobalAuditStatusBadgeClasses('CRITICAL')).toContain('bg-danger-bg');
  });
  it('falls back safely for an unknown status', () => {
    expect(getSuperadminGlobalAuditStatusBadgeClasses('UNKNOWN_STATUS')).toContain('bg-input');
  });
});
