import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TrainerEarningsMain from '@/app/trainer/earnings/earnings_components/TrainerEarningsMain/TrainerEarningsMain';
const refetch = vi.fn();
vi.mock('@/app/trainer/earnings/earnings_queries/useTrainerEarningsQuery', () => ({ useTrainerEarningsQuery: () => ({ isLoading: false, isError: false, error: null, refetch }) }));
vi.mock('@/app/trainer/earnings/earnings_components/TrainerEarningsKPIs/TrainerEarningsKPIs', () => ({ default: () => <div data-testid="kpis" /> }));
vi.mock('@/app/trainer/earnings/earnings_components/TrainerEarningsPending/TrainerEarningsPending', () => ({ default: () => <div data-testid="pending" /> }));
vi.mock('@/app/trainer/earnings/earnings_components/TrainerEarningsHistory/TrainerEarningsHistory', () => ({ default: () => <div data-testid="history" /> }));
vi.mock('@/app/trainer/trainer_components/TrainerShared/TrainerDateFilterDropdown', () => ({ TrainerDateFilterDropdown: () => <div /> }));
describe('TrainerEarningsMain behavior', () => {
  it('renders the earnings sections from the query success state', () => {
    render(<TrainerEarningsMain />);
    expect(screen.getByRole('heading', { name: 'Earnings' })).toBeInTheDocument();
    expect(screen.getByTestId('kpis')).toBeInTheDocument();
    expect(screen.getByTestId('history')).toBeInTheDocument();
    expect(screen.getByTestId('pending')).toBeInTheDocument();
  });
});
