import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import TrainerDashboardMain from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_components/trainer_dashboard_main/TrainerDashboardMain';






const refetch = vi.fn();
vi.mock('@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_hooks/useTrainerDashboardQuery', () => ({ useTrainerDashboardQuery: () => ({ isPending: false, isError: true, refetch }) }));
vi.mock('@/lib/usePermissions', () => ({ usePermissions: () => ({ can: () => true }) }));
vi.mock('@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_components/trainer_dashboard_kpis/TrainerDashboardKPIs', () => ({ default: () => <div /> }));
vi.mock('@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_components/trainer_dashboard_upcoming_sessions/TrainerDashboardUpcomingSessions', () => ({ default: () => <div /> }));
vi.mock('@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_components/trainer_dashboard_recent_progress/TrainerDashboardRecentProgress', () => ({ default: () => <div /> }));
vi.mock('@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_components/trainer_dashboard_quick_actions/TrainerDashboardQuickActions', () => ({ default: () => <div /> }));
vi.mock('@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_components/trainer_dashboard_goal_trend_chart/TrainerDashboardGoalTrendChart', () => ({ default: () => <div /> }));
vi.mock('@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_components/trainer_dashboard_membership_distribution/TrainerDashboardMembershipDistribution', () => ({ default: () => <div /> }));
vi.mock('@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_components/trainer_dashboard_date_filter_dropdown/TrainerDashboardDateFilterDropdown', () => ({ default: () => <div /> }));
describe('TrainerDashboardMain behavior', () => {
  it('exposes a retry action when the dashboard query fails', async () => {
    const user = userEvent.setup();
    render(<TrainerDashboardMain />);
    await user.click(screen.getByRole('button', { name: 'Retry' }));
    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
