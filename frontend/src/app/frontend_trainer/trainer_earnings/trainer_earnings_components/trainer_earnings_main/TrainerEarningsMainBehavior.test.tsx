import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import TrainerEarningsMain from '@/app/frontend_trainer/trainer_earnings/trainer_earnings_components/trainer_earnings_main/TrainerEarningsMain';




const refetch = vi.fn();
vi.mock('@/app/frontend_trainer/trainer_earnings/trainer_earnings_hooks/useTrainerEarningsQuery', () => ({ useTrainerEarningsQuery: () => ({ isPending: false, isError: false, error: null, refetch }) }));
vi.mock('@/app/frontend_trainer/trainer_earnings/trainer_earnings_components/trainer_earnings_kpis/TrainerEarningsKPIs', () => ({ default: () => <div data-testid="kpis" /> }));
vi.mock('@/app/frontend_trainer/trainer_earnings/trainer_earnings_components/trainer_earnings_pending/TrainerEarningsPending', () => ({ default: () => <div data-testid="pending" /> }));
vi.mock('@/app/frontend_trainer/trainer_earnings/trainer_earnings_components/trainer_earnings_history/TrainerEarningsHistory', () => ({ default: () => <div data-testid="history" /> }));
vi.mock('@/app/frontend_trainer/trainer_earnings/trainer_earnings_components/trainer_earnings_date_filter_dropdown/TrainerEarningsDateFilterDropdown', () => ({ default: () => <div /> }));
describe('TrainerEarningsMain behavior', () => {
  it('renders the earnings sections from the query success state', () => {
    render(<TrainerEarningsMain />);
    expect(screen.getByRole('heading', { name: 'Earnings' })).toBeInTheDocument();
    expect(screen.getByTestId('kpis')).toBeInTheDocument();
    expect(screen.getByTestId('history')).toBeInTheDocument();
    expect(screen.getByTestId('pending')).toBeInTheDocument();
  });
});
