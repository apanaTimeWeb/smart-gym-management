import { beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchTrainerSessions, createTrainerSessionsTrainerSession, cancelTrainerSessionsTrainerSession, markTrainerSessionsTrainerSessionNoShow } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_api/TrainerSessionsApi';

import { TRAINER_SESSIONS_MOCK_TRAINER_SESSIONS } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_mocks/trainer_sessions_fixtures/TrainerSessionsMockData';

import { TRAINER_SESSIONS_URLS } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_url_config';

const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

beforeEach(() => {
  apiFetch.mockReset();
});

describe('Trainer sessions API behavior', () => {
  it('forwards the selected session date', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'OK', data: TRAINER_SESSIONS_MOCK_TRAINER_SESSIONS });
    const result = await fetchTrainerSessions('2026-09-14');
    expect(apiFetch.mock.calls[0][0]).toContain('date=2026-09-14');
    expect(result[0]?.title).toBe('Morning HIIT');
  });
  it('preserves backend mutation messages and keeps cancel separate from no-show', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'Session scheduled', data: TRAINER_SESSIONS_MOCK_TRAINER_SESSIONS[0] });
    const created = await createTrainerSessionsTrainerSession({ date: '2026-09-14', time: '07:00 AM', duration: '60 min', type: 'Group' }, 'sessions-create-test-key');
    expect(created.message).toBe('Session scheduled');
    apiFetch.mockResolvedValueOnce({ success: true, message: 'Session cancelled', data: null });
    const cancelled = await cancelTrainerSessionsTrainerSession('s1', 'sessions-cancel-test-key');
    expect(cancelled.message).toBe('Session cancelled');
    expect(apiFetch.mock.calls[1][0]).toBe(TRAINER_SESSIONS_URLS.API.CANCEL('s1'));
    expect(apiFetch.mock.calls[1][1]).toMatchObject({ method: 'DELETE', headers: { 'Idempotency-Key': 'sessions-cancel-test-key' } });

    apiFetch.mockResolvedValueOnce({ success: true, message: 'Marked no show', data: null });
    const noShow = await markTrainerSessionsTrainerSessionNoShow('s1', 'sessions-no-show-test-key');
    expect(noShow.message).toBe('Marked no show');
    expect(apiFetch.mock.calls[2][0]).toBe(TRAINER_SESSIONS_URLS.API.MARK_NO_SHOW('s1'));
    expect(apiFetch.mock.calls[2][1]).toMatchObject({ method: 'POST', headers: { 'Idempotency-Key': 'sessions-no-show-test-key' } });
  });
});
