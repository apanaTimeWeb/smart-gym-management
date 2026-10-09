import { describe, expect, it, vi } from 'vitest';

import { TrainerWorkoutApi } from '@/app/frontend_trainer/trainer_workout/trainer_workout_api/TrainerWorkoutApi';

import { TRAINER_WORKOUT_MOCK_WORKOUTS } from '@/app/frontend_trainer/trainer_workout/trainer_workout_mocks/trainer_workout_fixtures/TrainerWorkoutMockData';




const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

describe('Trainer workout API behavior', () => {
  it('forwards workout list filters and returns filtered server data', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'OK', data: { workouts: [TRAINER_WORKOUT_MOCK_WORKOUTS[0]], total: 1 } });
    const result = await TrainerWorkoutApi.fetchWorkouts({ search: 'Full Body', page: '2', limit: '10', level: 'Beginner' });
    expect(apiFetch.mock.calls[0][0]).toContain('search=Full+Body');
    expect(apiFetch.mock.calls[0][0]).toContain('page=2');
    expect(result.data.workouts[0]?.name).toBe('Full Body Fundamentals');
  });
  it('returns the backend representation and message for a create mutation', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'TrainerWorkoutWorkout created', data: TRAINER_WORKOUT_MOCK_WORKOUTS[0] });
    const result = await TrainerWorkoutApi.createWorkout({ name: 'Full Body Fundamentals', level: 'Beginner', days: 3, exercises: 8, focus: 'General Fitness', duration: '45 mins' }, 'workout-create-test-key');
    expect(apiFetch.mock.calls[0][1]?.headers).toMatchObject({ 'Idempotency-Key': 'workout-create-test-key' });
    expect(result.message).toBe('TrainerWorkoutWorkout created');
    expect(result.data.id).toBe('wk-1');
  });
});
