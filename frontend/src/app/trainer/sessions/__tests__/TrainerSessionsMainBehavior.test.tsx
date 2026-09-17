import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TrainerSessionsMain from '@/app/trainer/sessions/sessions_components/TrainerSessionsMain';

const confirm = vi.fn().mockResolvedValue(true);
const showSuccess = vi.fn();
const showError = vi.fn();
const cancelMutate = vi.fn().mockResolvedValue({ message: 'Session cancelled' });

vi.mock('@/app/trainer/sessions/sessions_utils/useTrainerSessionsFilters', () => ({ useTrainerSessionsFilters: () => ({ filter: 'All', setFilter: vi.fn(), date: '2026-09-17', setDate: vi.fn() }) }));
vi.mock('@/app/trainer/sessions/sessions_queries/useTrainerSessionsQuery', () => ({
  useTrainerSessionsQuery: () => ({ data: [{ id: 's1', title: 'Morning HIIT', type: 'Group', status: 'Upcoming', time: '07:00 AM', duration: '60 min', attendees: 4, maxAttendees: 10 }], isLoading: false, isError: false }),
  useMembersBasicQuery: () => ({ data: [] }),
}));
vi.mock('@/app/trainer/sessions/sessions_queries/useTrainerSessionMutations', () => ({ useTrainerSessionMutations: () => ({ createSession: { mutateAsync: vi.fn() }, cancelSession: { mutateAsync: cancelMutate }, markAttendance: { mutateAsync: vi.fn() } }) }));
vi.mock('@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider', () => ({ useConfirm: () => ({ confirm }) }));
vi.mock('@/app/trainer/trainer_components/TrainerFeedback/useTrainerFeedback', () => ({ useTrainerFeedback: () => ({ showSuccess, showError }) }));
vi.mock('@/app/trainer/sessions/sessions_components/TrainerSessionAttendanceModal/TrainerSessionAttendanceModal', () => ({ default: () => null }));
vi.mock('@/app/trainer/sessions/sessions_components/TrainerSessionsEditModal/TrainerSessionsEditModal', () => ({ default: () => null }));
vi.mock('@/app/trainer/sessions/sessions_components/TrainerSessionsKPIs/TrainerSessionsKPIs', () => ({ default: () => <div /> }));
vi.mock('@/app/trainer/sessions/sessions_components/TrainerSessionsScheduleModal/TrainerSessionsScheduleModal', () => ({ default: () => null }));

describe('TrainerSessionsMain behavior', () => {
  it('requires confirmation before cancelling a session and emits the backend message', async () => {
    const user = userEvent.setup();
    render(<TrainerSessionsMain />);
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(confirm).toHaveBeenCalledTimes(1);
    expect(cancelMutate).toHaveBeenCalledWith('s1');
    await vi.waitFor(() => expect(showSuccess).toHaveBeenCalledWith('Session cancelled', 'trainer-sessions-cancel-success'));
  });
});
