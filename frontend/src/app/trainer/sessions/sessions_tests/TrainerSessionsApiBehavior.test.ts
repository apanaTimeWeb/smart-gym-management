import { describe, expect, it, vi } from 'vitest';
import { fetchTrainerSessions, createTrainerSession, cancelTrainerSession } from '@/app/trainer/sessions/sessions_api/TrainerSessionsApi';
import { MOCK_TRAINER_SESSIONS } from '@/app/trainer/sessions/sessions_fixtures/TrainerSessionsMockData';
const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

describe('Trainer sessions API behavior', () => {
  it('forwards the selected session date', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'OK', data: MOCK_TRAINER_SESSIONS });
    const result = await fetchTrainerSessions('2026-09-14');
    expect(apiFetch.mock.calls[0][0]).toContain('date=2026-09-14');
    expect(result[0]?.title).toBe('Morning HIIT');
  });
  it('preserves backend mutation messages for create and cancel', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'Session scheduled', data: MOCK_TRAINER_SESSIONS[0] });
    const created = await createTrainerSession({ date: '2026-09-14', time: '07:00 AM', duration: '60 min', type: 'Group' });
    expect(created.message).toBe('Session scheduled');
    apiFetch.mockResolvedValueOnce({ success: true, message: 'Session cancelled', data: null });
    const cancelled = await cancelTrainerSession('s1');
    expect(cancelled.message).toBe('Session cancelled');
  });
});
