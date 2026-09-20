import { describe, expect, it } from 'vitest';
import { useSuperadminUsageMetersPage } from '@/app/superadmin/usage-meters/usage-meters_utils/useSuperadminUsageMetersPage.ts';

describe('useSuperadminUsageMetersPage', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminUsageMetersPage).toBe('function');
  });
});
