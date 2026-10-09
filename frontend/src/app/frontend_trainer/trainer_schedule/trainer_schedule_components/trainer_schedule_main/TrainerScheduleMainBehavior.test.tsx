import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import TrainerScheduleMain from '@/app/frontend_trainer/trainer_schedule/trainer_schedule_components/trainer_schedule_main/TrainerScheduleMain';





const setActiveTab = vi.fn();
vi.mock('@/app/frontend_trainer/trainer_schedule/trainer_schedule_store/useTrainerScheduleStore', () => ({ useTrainerScheduleStore: () => ({ activeTab: 'availability', setActiveTab }) }));
vi.mock('@/app/frontend_trainer/trainer_schedule/trainer_schedule_components/trainer_schedule_weekly_availability/TrainerScheduleWeeklyAvailability', () => ({ default: () => <div data-testid="trainer_schedule-main-behavior-test-availability">Availability</div> }));
vi.mock('@/app/frontend_trainer/trainer_schedule/trainer_schedule_components/trainer_schedule_leave_requests/TrainerScheduleLeaveRequests', () => ({ default: () => <div data-testid="trainer_schedule-main-behavior-test-leaves">Leaves</div> }));
vi.mock('@/app/frontend_trainer/trainer_schedule/trainer_schedule_components/trainer_schedule_request_leave_modal/TrainerScheduleRequestLeaveModal', () => ({ default: () => null }));
describe('TrainerScheduleMain behavior', () => {
  it('changes the active schedule tab through the module store', async () => {
    const user = userEvent.setup();
    render(<TrainerScheduleMain />);
    await user.click(screen.getByRole('button', { name: 'Leave Requests' }));
    expect(setActiveTab).toHaveBeenCalledWith('leaves');
  });
});
