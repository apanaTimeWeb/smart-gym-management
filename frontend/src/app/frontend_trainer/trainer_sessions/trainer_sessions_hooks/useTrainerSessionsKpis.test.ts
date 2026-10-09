import { describe, expect, it, vi } from 'vitest';

import { TRAINER_SESSIONS_SESSION_STATUS } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_constants/TrainerSessionsConstants';

import { useTrainerSessionsKpis } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_hooks/useTrainerSessionsKpis';

import type { TrainerSessionsTrainerSession } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_types/TrainerSessionsTypes';






vi.mock('date-fns', () => ({ format: vi.fn(() => '2026-10-04') }));

describe('useTrainerSessionsKpis', () => {
  it('derives today, completed, no-show and average-attendance KPIs', () => {
    const sessions = [
      { id: 's1', sessionDate: '2026-10-04', status: TRAINER_SESSIONS_SESSION_STATUS.COMPLETED, attendees: 8, maxAttendees: 10 },
      { id: 's2', sessionDate: '2026-10-04', status: TRAINER_SESSIONS_SESSION_STATUS.NO_SHOW, attendees: 0, maxAttendees: 10 },
      { id: 's3', sessionDate: '2026-09-20', status: TRAINER_SESSIONS_SESSION_STATUS.COMPLETED, attendees: 5, maxAttendees: 10 },
    ] as TrainerSessionsTrainerSession[];

    expect(useTrainerSessionsKpis(sessions)).toEqual({
      todayCount: 2,
      completedThisWeek: 2,
      noShowsThisMonth: 1,
      avgAttendanceRate: 43.3,
    });
  });

  it('returns zero average attendance when no sessions have capacity data', () => {
    const sessions = [
      { id: 's1', sessionDate: '2026-10-04', status: TRAINER_SESSIONS_SESSION_STATUS.COMPLETED, attendees: 0, maxAttendees: 0 },
    ] as TrainerSessionsTrainerSession[];

    expect(useTrainerSessionsKpis(sessions).avgAttendanceRate).toBe(0);
  });
});
