import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminGymHealthAlertsLogic } from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_hooks/useAdminGymHealthAlertsLogic';

const confirm = vi.fn();
const dismissMutation = { mutate: vi.fn(), isPending: false };
const getIntentKey = vi.fn((id: string) => `idem:${id}`);
const clearIntentKey = vi.fn();
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm', () => ({ useAdminLayoutConfirm: () => ({ confirm }) }));
vi.mock('@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_store/useAdminGymHealthAlertsStore', () => ({ useAdminGymHealthAlertsStore: () => ({ severityFilter: 'high', search: 'expired', setSeverityFilter: vi.fn(), setSearch: vi.fn() }) }));
vi.mock('@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_hooks/useAdminGymHealthAlertsMutations', () => ({ useAdminGymHealthAlertsMutations: () => ({ dismissMutation, getIntentKey, clearIntentKey }) }));

describe('useAdminGymHealthAlertsLogic', () => {
  beforeEach(() => {
    vi.mocked(useQuery).mockReset().mockReturnValueOnce({ data: { data: [{ id: 'a1' }] }, status: 'success' } as never).mockReturnValueOnce({ data: { data: { high: 1 } }, status: 'success' } as never);
    confirm.mockReset().mockResolvedValue(true);
    dismissMutation.mutate.mockReset();
    clearIntentKey.mockReset();
  });

  it('maps alert/summary state and confirms dismiss actions before mutation', async () => {
    const { result } = renderHook(() => useAdminGymHealthAlertsLogic());
    expect(result.current.alerts).toEqual([{ id: 'a1' }]);
    expect(result.current.kpis).toEqual({ high: 1 });
    await result.current.dismissAlert('a1', 'Expired member');
    expect(confirm).toHaveBeenCalledWith(expect.objectContaining({ type: 'warning' }));
    expect(dismissMutation.mutate).toHaveBeenCalledWith({ id: 'a1', idempotencyKey: 'idem:dismiss:a1' });
  });
});
