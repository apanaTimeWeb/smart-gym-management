import { describe, expect, it } from 'vitest';

import { getSuperadminComplianceStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_constants/SuperadminComplianceStatusBadgeConfig';



describe('getSuperadminComplianceStatusBadgeClasses', () => {
  it('maps the documented status to semantic design tokens', () => {
    expect(getSuperadminComplianceStatusBadgeClasses('COMPLIANT')).toContain('bg-success-bg');
  });
  it('falls back safely for an unknown status', () => {
    expect(getSuperadminComplianceStatusBadgeClasses('UNKNOWN_STATUS')).toContain('bg-input');
  });
});
