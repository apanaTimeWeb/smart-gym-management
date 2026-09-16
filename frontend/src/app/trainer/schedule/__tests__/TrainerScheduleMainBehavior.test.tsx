import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TrainerScheduleMain from '@/app/trainer/schedule/schedule_components/TrainerScheduleMain/TrainerScheduleMain';
const setActiveTab = vi.fn();
vi.mock('@/app/trainer/schedule/schedule_store/useTrainerScheduleStore', () => ({ useTrainerScheduleStore: () => ({ activeTab: 'availability', setActiveTab }) }));
vi.mock('@/app/trainer/schedule/schedule_components/TrainerWeeklyAvailability/TrainerWeeklyAvailability', () => ({ default: () => <div data-testid="availability">Availability</div> }));
vi.mock('@/app/trainer/schedule/schedule_components/TrainerLeaveRequests/TrainerLeaveRequests', () => ({ default: () => <div data-testid="leaves">Leaves</div> }));
vi.mock('@/app/trainer/schedule/schedule_components/TrainerRequestLeaveModal/TrainerRequestLeaveModal', () => ({ default: () => null }));
describe('TrainerScheduleMain behavior', () => {
  it('changes the active schedule tab through the module store', async () => {
    const user = userEvent.setup();
    render(<TrainerScheduleMain />);
    await user.click(screen.getByRole('button', { name: 'Leave Requests' }));
    expect(setActiveTab).toHaveBeenCalledWith('leaves');
  });
});
