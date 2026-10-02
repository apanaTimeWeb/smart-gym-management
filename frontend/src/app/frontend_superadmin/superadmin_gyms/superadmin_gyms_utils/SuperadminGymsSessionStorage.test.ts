import { describe, expect, it } from 'vitest';

import { getSuperadminGymsSessionStorage } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_utils/SuperadminGymsSessionStorage';



describe('SuperadminGymsSessionStorage', () => {
  it('returns the browser session storage backend', () => {
    expect(getSuperadminGymsSessionStorage()).toBe(sessionStorage);
  });
});
