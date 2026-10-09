import { describe, expect, it } from 'vitest';

import { TrainerScheduleFormatDate } from '@/app/frontend_trainer/trainer_schedule/trainer_schedule_utils/TrainerScheduleFormatDate';




describe('Trainer schedule display formatters', () => {
  it('formats schedule dates with a stable display contract', () => {
    expect(TrainerScheduleFormatDate('2026-02-03T00:00:00.000Z', 'en-IN')).toMatch(/^03 Feb 2026$/);
    expect(TrainerScheduleFormatDate('not-a-date', 'en-IN')).toBe('—');
  });
});
