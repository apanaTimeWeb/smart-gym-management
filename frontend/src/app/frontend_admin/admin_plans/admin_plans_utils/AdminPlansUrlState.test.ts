import { describe, expect, it } from 'vitest';
import { buildAdminPlansQueryString } from '@/app/frontend_admin/admin_plans/admin_plans_utils/AdminPlansUrlState';
import type { ReadonlyURLSearchParams } from 'next/navigation';

describe('buildAdminPlansQueryString', () => {
  it('updates search and resets pagination', () => {
    const params = new URLSearchParams('tier=Premium&page=4');
    const result = buildAdminPlansQueryString(params as unknown as ReadonlyURLSearchParams, { search: 'pro' });
    expect(result).toBe('?tier=Premium&page=1&search=pro');
  });

  it('removes a cleared tier and keeps explicit page updates', () => {
    const params = new URLSearchParams('tier=Premium&page=2');
    const result = buildAdminPlansQueryString(params as unknown as ReadonlyURLSearchParams, { tier: 'All', page: 3 });
    expect(result).toBe('?page=3');
  });
});
