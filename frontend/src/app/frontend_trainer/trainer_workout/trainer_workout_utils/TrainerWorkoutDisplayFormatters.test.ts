import { describe, expect, it } from 'vitest';

import { TrainerWorkoutDisplayValue, TrainerWorkoutFormatNumber } from '@/app/frontend_trainer/trainer_workout/trainer_workout_utils/TrainerWorkoutDisplayFormatters';




describe('Trainer workout display formatters', () => {
  it('uses an en-dash only for absent values', () => {
    expect(TrainerWorkoutDisplayValue(null)).toBe('—');
    expect(TrainerWorkoutDisplayValue('')).toBe('—');
    expect(TrainerWorkoutDisplayValue(0)).toBe(0);
    expect(TrainerWorkoutDisplayValue(false)).toBe(false);
  });
  it('formats numeric metrics with locale grouping', () => {
    expect(TrainerWorkoutFormatNumber(123456.7, 'en-IN')).toBe('1,23,456.7');
  });
});
