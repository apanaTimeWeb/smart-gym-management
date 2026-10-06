import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminSettingsData } from '@/app/frontend_admin/admin_settings/admin_settings_hooks/useAdminSettingsData';

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));

describe('useAdminSettingsData', () => {
  it('delegates settings server state to TanStack Query with the module key', () => {
    const queryResult = { data: { data: { general: {} } }, status: 'success' };
    vi.mocked(useQuery).mockReturnValue(queryResult as never);
    const { result } = renderHook(() => useAdminSettingsData());
    expect(result.current).toBe(queryResult);
    expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({ queryKey: expect.any(Array), queryFn: expect.any(Function), staleTime: 300000 }));
  });
});
