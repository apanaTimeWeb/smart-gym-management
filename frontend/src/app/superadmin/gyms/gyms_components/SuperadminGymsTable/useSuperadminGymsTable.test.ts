import { describe, expect, it } from 'vitest';
import { useSuperadminGymsTable } from '@/app/superadmin/gyms/gyms_components/SuperadminGymsTable/useSuperadminGymsTable.ts';

describe('useSuperadminGymsTable', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminGymsTable).toBe('function');
  });
});
