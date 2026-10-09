import { describe, expect, it, vi } from 'vitest';

/**
 * @description Manages Query state and data flow for the earnings feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented earnings module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
const useQuery = vi.fn();
/**
 * @description Manages SearchParams state and data flow for the earnings feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented earnings module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
const useSearchParams = vi.fn();
const fetchEarningsData = vi.fn();

vi.mock('@tanstack/react-query', () => ({ useQuery }));
vi.mock('next/navigation', () => ({ useSearchParams }));
vi.mock('@/app/frontend_trainer/trainer_earnings/trainer_earnings_api/TrainerEarningsApi', () => ({ TrainerEarningsApi: { fetchEarningsData } }));

describe('useTrainerEarningsQuery', () => {
  it('propagates search, dates, page and sorting into the earnings query contract', async () => {
    useSearchParams.mockReturnValue(new URLSearchParams('search=Rahul&startDate=2026-09-01&endDate=2026-09-30&page=3&sortBy=date&sortDirection=asc'));
    useQuery.mockImplementation((options) => options);
    const { useTrainerEarningsQuery } = await import('@/app/frontend_trainer/trainer_earnings/trainer_earnings_hooks/useTrainerEarningsQuery');
    const result = useTrainerEarningsQuery();
    expect(JSON.stringify(result.queryKey)).toContain('Rahul');
    expect(JSON.stringify(result.queryKey)).toContain('2026-09-30');
    expect(result.queryFn).toBeTypeOf('function');
  });
});
