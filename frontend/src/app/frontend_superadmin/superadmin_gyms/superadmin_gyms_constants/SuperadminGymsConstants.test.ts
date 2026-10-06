// RESPONSIBILITY: Verifies the canonical Gyms pagination, search, and status presentation contract.
import { describe, expect, it } from 'vitest';

import { GYMS_TABLE_PAGE_SIZE, GYMS_SEARCH_MIN_LENGTH, GYMS_STATUS_LABELS, SUPERADMIN_GYM_STATUS_CODES, getSuperadminGymStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_constants/SuperadminGymsConstants';



describe('SuperadminGymsConstants', () => {
  it('uses a bounded page size and positive search threshold', () => {
    expect(GYMS_TABLE_PAGE_SIZE).toBe(10);
    expect(GYMS_SEARCH_MIN_LENGTH).toBeGreaterThan(0);
  });
  it('defines labels for every supported gym status', () => {
    expect(Object.keys(GYMS_STATUS_LABELS)).toEqual(['ACTIVE', 'SUSPENDED', 'TRIAL', 'EXPIRED']);
  });
  it('maps canonical statuses to semantic badge tokens', () => {
    expect(getSuperadminGymStatusBadgeClasses(SUPERADMIN_GYM_STATUS_CODES.ACTIVE)).toContain('bg-success-bg');
    expect(getSuperadminGymStatusBadgeClasses(SUPERADMIN_GYM_STATUS_CODES.SUSPENDED)).toContain('bg-danger-bg');
  });
});
