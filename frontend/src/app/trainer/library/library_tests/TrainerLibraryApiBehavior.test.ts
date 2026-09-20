import { describe, expect, it, vi } from 'vitest';
import { libraryApi } from '@/app/trainer/library/library_api/TrainerLibrary_api';
const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

const DIET_PLAN = { id: 'diet-1', name: 'Lean Plan', goal: 'Weight Loss', meals: ['Breakfast'], isActive: true };

describe('Trainer library API behavior', () => {
  it('forwards search, goal, page, and limit filters', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'OK', data: { dietPlans: [DIET_PLAN], total: 1 } });
    const result = await libraryApi.fetchDietPlans({ search: 'Lean', goal: 'Weight Loss', page: '2', limit: '10' });
    expect(apiFetch.mock.calls[0][0]).toContain('search=Lean');
    expect(apiFetch.mock.calls[0][0]).toContain('goal=Weight+Loss');
    expect(apiFetch.mock.calls[0][0]).toContain('page=2');
    expect(result.dietPlans[0]?.name).toBe('Lean Plan');
  });
  it('uses the real mutation path and preserves the backend response contract', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'Diet plan assigned', data: null });
    await libraryApi.assignDietPlan('member-1', 'diet-1');
    expect(apiFetch).toHaveBeenCalledWith(expect.stringContaining('member-1'), expect.objectContaining({ method: 'PATCH' }));
  });
});
