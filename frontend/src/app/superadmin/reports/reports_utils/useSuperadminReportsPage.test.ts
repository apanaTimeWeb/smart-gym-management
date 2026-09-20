import { describe, expect, it } from 'vitest';
import { useSuperadminReportsPage } from '@/app/superadmin/reports/reports_utils/useSuperadminReportsPage.ts';

describe('useSuperadminReportsPage', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminReportsPage).toBe('function');
  });
});
