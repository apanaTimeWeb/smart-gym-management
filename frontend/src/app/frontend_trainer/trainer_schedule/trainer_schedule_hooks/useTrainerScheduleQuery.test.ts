import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_trainer/trainer_schedule/trainer_schedule_hooks/useTrainerScheduleQuery';




describe('useTrainerScheduleQuery', () => {
  it('exposes the module hook contract for co-located verification', () => {
    expect(moduleUnderTest.useTrainerScheduleQuery).toBeTypeOf('function');
  });
});
