import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminGlobalAuditMain } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_hooks/useSuperadminGlobalAuditMain';



const setParam = vi.fn();
vi.mock('@/hooks/useUrlState', () => ({ useUrlState: () => ({ getParam: (key: string, fallback: string) => ({ search: 'abc', page: '2' }[key] ?? fallback), setParam }) }));
vi.mock('@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_hooks/useSuperadminGlobalAuditData', () => ({ useSuperadminGlobalAuditData: () => ({ logs: [], totalPages: 3, isPending: false, isFetching: false, error: null, refetch: vi.fn() }) }));
vi.mock('@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_hooks/useSuperadminGlobalAuditExportMutation', () => ({ useSuperadminGlobalAuditExportMutation: () => ({ requestExport: vi.fn(), isRequesting: false }) }));

describe('useSuperadminGlobalAuditMain', () => {
  it('reads filter and pagination state from the URL contract', () => {
    const { result } = renderHook(() => useSuperadminGlobalAuditMain());
    expect(result.current.search).toBe('abc');
    expect(result.current.currentPage).toBe(2);
    expect(result.current.totalPages).toBe(3);
  });
});
