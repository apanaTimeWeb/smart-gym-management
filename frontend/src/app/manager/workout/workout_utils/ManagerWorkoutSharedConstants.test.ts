import { describe, expect, it } from 'vitest';
import { EQUIPMENT_OPTIONS, EXERCISE_DIFFICULTY_OPTIONS, EXERCISE_TABLE_HEADERS, WORKOUT_LEVEL_OPTIONS, WORKOUT_TAB_OPTIONS } from '@/app/manager/workout/workout_utils/ManagerWorkoutSharedConstants';

describe('ManagerWorkoutSharedConstants', () => {
  it('keeps workout filters and table columns complete', () => {
    expect(WORKOUT_LEVEL_OPTIONS).toContain('Advanced');
    expect(EXERCISE_DIFFICULTY_OPTIONS).toEqual(['Beginner', 'Intermediate', 'Advanced']);
    expect(EQUIPMENT_OPTIONS).toContain('Bodyweight');
    expect(WORKOUT_TAB_OPTIONS).toEqual(['Workout Plans', 'Exercise Library']);
    expect(EXERCISE_TABLE_HEADERS).toHaveLength(5);
  });
});
