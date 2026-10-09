import { describe, expect, it, vi } from 'vitest';

/**
 * @description Manages Query state and data flow for the dashboard feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented dashboard module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
const useQuery = vi.fn();
/**
 * @description Manages SearchParams state and data flow for the dashboard feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented dashboard module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
const useSearchParams = vi.fn();

vi.mock('@tanstack/react-query', () => ({ useQuery }));
vi.mock('next/navigation', () => ({ useSearchParams }));
vi.mock('@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_api/TrainerDashboardApi', () => ({ TrainerDashboardApi: { fetchDashboardStats: vi.fn() } }));

describe('useTrainerDashboardQuery', () => {
  it('builds a query key from the URL date-range contract', async () => {
    useSearchParams.mockReturnValue(new URLSearchParams('range=last_30_days&startDate=2026-09-01&endDate=2026-09-30'));
    useQuery.mockImplementation((options) => options);
    const { useTrainerDashboardQuery } = await import('@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_hooks/useTrainerDashboardQuery');
    const result = useTrainerDashboardQuery();
    expect(JSON.stringify(result.queryKey)).toContain('last_30_days');
    expect(JSON.stringify(result.queryKey)).toContain('2026-09-01');
    expect(JSON.stringify(result.queryKey)).toContain('2026-09-30');
  });
});
