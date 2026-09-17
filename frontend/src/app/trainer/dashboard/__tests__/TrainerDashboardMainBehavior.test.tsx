import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TrainerDashboardMain from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardMain/TrainerDashboardMain';

const refetch = vi.fn();
vi.mock('@/app/trainer/dashboard/dashboard_queries/useTrainerDashboardQuery', () => ({ useTrainerDashboardQuery: () => ({ isLoading: false, isError: true, refetch }) }));
vi.mock('@/lib/usePermissions', () => ({ usePermissions: () => ({ can: () => true }) }));
vi.mock('@/app/trainer/dashboard/dashboard_components/TrainerDashboardKPIs/TrainerDashboardKPIs', () => ({ default: () => <div /> }));
vi.mock('@/app/trainer/dashboard/dashboard_components/TrainerDashboardUpcomingSessions/TrainerDashboardUpcomingSessions', () => ({ default: () => <div /> }));
vi.mock('@/app/trainer/dashboard/dashboard_components/TrainerDashboardRecentProgress/TrainerDashboardRecentProgress', () => ({ default: () => <div /> }));
vi.mock('@/app/trainer/dashboard/dashboard_components/TrainerDashboardQuickActions/TrainerDashboardQuickActions', () => ({ default: () => <div /> }));
vi.mock('@/app/trainer/dashboard/dashboard_components/TrainerDashboardGoalTrendChart/TrainerDashboardGoalTrendChart', () => ({ default: () => <div /> }));
vi.mock('@/app/trainer/dashboard/dashboard_components/TrainerDashboardMembershipDistribution/TrainerDashboardMembershipDistribution', () => ({ default: () => <div /> }));
vi.mock('@/app/trainer/trainer_components/TrainerShared/TrainerDateFilterDropdown', () => ({ TrainerDateFilterDropdown: () => <div /> }));
describe('TrainerDashboardMain behavior', () => {
  it('exposes a retry action when the dashboard query fails', async () => {
    const user = userEvent.setup();
    render(<TrainerDashboardMain />);
    await user.click(screen.getByRole('button', { name: 'Retry' }));
    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
