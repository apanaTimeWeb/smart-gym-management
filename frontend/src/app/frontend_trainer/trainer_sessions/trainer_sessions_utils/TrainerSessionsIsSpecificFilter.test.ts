import { describe, expect, it } from 'vitest';

import { TRAINER_SESSIONS_ALL_SESSION_FILTER } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_constants/TrainerSessionsConstants';

import { TrainerSessionsIsSpecificFilter } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_utils/TrainerSessionsIsSpecificFilter';

import type { TrainerSessionsSessionFilter } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_types/TrainerSessionsTypes';

describe('TrainerSessionsIsSpecificFilter', () => {
  it('rejects the synthetic All filter', () => {
    expect(TrainerSessionsIsSpecificFilter(TRAINER_SESSIONS_ALL_SESSION_FILTER)).toBe(false);
  });

  it('accepts documented specific session types', () => {
    expect(TrainerSessionsIsSpecificFilter('PT' as TrainerSessionsSessionFilter)).toBe(true);
    expect(TrainerSessionsIsSpecificFilter('Group' as TrainerSessionsSessionFilter)).toBe(true);
  });
});
