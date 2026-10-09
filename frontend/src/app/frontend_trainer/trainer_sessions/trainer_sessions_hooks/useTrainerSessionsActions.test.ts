import { act, renderHook } from '@testing-library/react';

import { beforeEach, describe, expect, it, vi } from 'vitest';

const createSession = vi.fn();
const cancelSession = vi.fn();
const markNoShowSession = vi.fn();
const markAttendance = vi.fn();
const confirm = vi.fn();
const showSuccess = vi.fn();
const showError = vi.fn();
const begin = vi.fn((actionId: string) => `key-${actionId}`);
const clear = vi.fn();

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_trainer/trainer_sessions/trainer_sessions_hooks/useTrainerSessionsMutations', () => ({
  useTrainerSessionsMutations: () => ({ createSession, createSessionPending: false, markNoShowSession, markNoShowSessionPending: false, cancelSession, cancelSessionPending: false, markAttendance, markAttendancePending: false, updateSessionPending: false }),
}));
vi.mock('@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_feedback/useTrainerInfrastructureConfirm', () => ({ useTrainerInfrastructureConfirm: () => ({ confirm }) }));
vi.mock('@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_feedback/useTrainerInfrastructureFeedback', () => ({ useTrainerInfrastructureFeedback: () => ({ showSuccess, showError }) }));
vi.mock('@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_hooks/useTrainerInfrastructureIdempotencyKey', () => ({ useTrainerInfrastructureIdempotencyKey: () => ({ begin, clear }) }));

describe('useTrainerSessionsActions', () => {
  const setters = { setShowScheduleModal: vi.fn(), setAttendanceSession: vi.fn(), setEditingSession: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
    confirm.mockResolvedValue(true);
    createSession.mockResolvedValue({ message: 'Session created' });
    cancelSession.mockResolvedValue({ message: 'Session cancelled' });
    markNoShowSession.mockResolvedValue({ message: 'Marked no-show' });
    markAttendance.mockResolvedValue({ message: 'Attendance saved' });
    begin.mockImplementation((actionId: string) => `key-${actionId}`);
  });

  it('requires typed confirmation and reuses the generated idempotency key for cancel', async () => {
    const { useTrainerSessionsActions } = await import('@/app/frontend_trainer/trainer_sessions/trainer_sessions_hooks/useTrainerSessionsActions');
    const { result } = renderHook(() => useTrainerSessionsActions(setters));
    await act(async () => { await result.current.handleCancelSession('session-1'); });
    expect(confirm).toHaveBeenCalledWith(expect.objectContaining({ requireTypedConfirmation: true }));
    expect(cancelSession).toHaveBeenCalledWith({ id: 'session-1', idempotencyKey: 'key-session-cancel-session-1' });
    expect(showSuccess).toHaveBeenCalledWith('Session cancelled', 'session-cancel-session-1');
  });

  it('preserves modal state on failed attendance mutation', async () => {
    markAttendance.mockRejectedValueOnce(new Error('Failed'));
    const { useTrainerSessionsActions } = await import('@/app/frontend_trainer/trainer_sessions/trainer_sessions_hooks/useTrainerSessionsActions');
    const { result } = renderHook(() => useTrainerSessionsActions(setters));
    await act(async () => { await result.current.handleAttendanceSubmit('session-1', ['member-1']); });
    expect(setters.setAttendanceSession).not.toHaveBeenCalledWith(null);
    expect(showError).toHaveBeenCalledWith(expect.any(Error), 'trainer-sessions-attendance-error');
    expect(clear).not.toHaveBeenCalledWith('session-attendance-session-1');
  });
});
