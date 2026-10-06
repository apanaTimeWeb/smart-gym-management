import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useAdminPlansLogic } from '@/app/frontend_admin/admin_plans/admin_plans_hooks/useAdminPlansLogic';
import { useAdminPlansStore } from '@/app/frontend_admin/admin_plans/admin_plans_store/useAdminPlansStore';
import { useAdminPlansMutations } from '@/app/frontend_admin/admin_plans/admin_plans_hooks/useAdminPlansMutations';
import { useAdminLayoutConfirm } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm';
import { useAdminLayoutToastStore } from '@/app/frontend_admin/admin_layout/admin_layout_store/useAdminLayoutToastStore';
import { useQuery } from '@tanstack/react-query';

const push = vi.fn();

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => new URLSearchParams(''),
}));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_plans/admin_plans_store/useAdminPlansStore', () => ({ useAdminPlansStore: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_plans/admin_plans_hooks/useAdminPlansMutations', () => ({ useAdminPlansMutations: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm', () => ({ useAdminLayoutConfirm: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_layout/admin_layout_store/useAdminLayoutToastStore', () => ({ useAdminLayoutToastStore: vi.fn() }));

const createPlan = vi.fn();
const updatePlan = vi.fn();
const deletePlan = vi.fn();
const setShowModal = vi.fn();
const setEditId = vi.fn();
const setForm = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useQuery).mockReturnValue({
    data: { data: [{ id: 'p1', name: 'Gold', tier: 'PREMIUM', price1Month: 100, price3Month: 270, price6Month: 500, price12Month: 900, features: ['A'], isActive: true }], meta: { total: 1, totalPages: 1 } },
    status: 'success',
    refetch: vi.fn(),
  } as never);
  vi.mocked(useAdminPlansStore).mockReturnValue({ showModal: false, setShowModal, editId: null, setEditId, form: { name: '', tier: 'BASIC', price1Month: '', price3Month: '', price6Month: '', price12Month: '', priceCustom: '', features: '' }, setForm } as never);
  vi.mocked(useAdminPlansMutations).mockReturnValue({
    createMutation: { mutate: createPlan, isPending: false },
    updateMutation: { mutate: updatePlan, isPending: false },
    deleteMutation: { mutate: deletePlan, isPending: false },
    getIntentKey: (value: string) => `intent:${value}`,
    clearIntentKey: vi.fn(),
  } as never);
  vi.mocked(useAdminLayoutConfirm).mockReturnValue({ confirm: vi.fn().mockResolvedValue(true) } as never);
  vi.mocked(useAdminLayoutToastStore).mockReturnValue({ showToast: vi.fn() } as never);
});

describe('useAdminPlansLogic', () => {
  it('loads the list and opens a reset add-plan draft', () => {
    const { result } = renderHook(() => useAdminPlansLogic());

    expect(result.current.plans).toHaveLength(1);
    act(() => result.current.openAdd());

    expect(setEditId).toHaveBeenCalledWith(null);
    expect(setShowModal).toHaveBeenCalledWith(true);
  });

  it('maps a submitted form into the create mutation contract', async () => {
    const { result } = renderHook(() => useAdminPlansLogic());
    await act(async () => result.current.savePlan({ name: 'Gold', tier: 'PREMIUM', price1Month: '100', price3Month: '270', price6Month: '500', price12Month: '900', priceCustom: '1200', features: 'A\nB' }));

    expect(createPlan).toHaveBeenCalledWith({
      payload: {
        name: 'Gold', tier: 'PREMIUM', price1Month: 100, price3Month: 270, price6Month: 500, price12Month: 900, priceCustom: 1200, isActive: true, features: ['A', 'B'],
      },
      idempotencyKey: 'intent:create-plan',
    });
  });
});
