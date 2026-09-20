import { describe, expect, it, vi } from 'vitest';
import { workoutApi } from '@/app/trainer/workout/workout_api/TrainerWorkout_api';
import { MOCK_WORKOUTS } from '@/app/trainer/workout/workout_fixtures/TrainerWorkoutMockData';
const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

describe('Trainer workout API behavior', () => {
  it('forwards workout list filters and returns filtered server data', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'OK', data: { workouts: [MOCK_WORKOUTS[0]], total: 1 } });
    const result = await workoutApi.fetchWorkouts({ search: 'Full Body', page: '2', limit: '10', level: 'Beginner' });
    expect(apiFetch.mock.calls[0][0]).toContain('search=Full+Body');
    expect(apiFetch.mock.calls[0][0]).toContain('page=2');
    expect(result.data.workouts[0]?.name).toBe('Full Body Fundamentals');
  });
  it('returns the backend representation and message for a create mutation', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'Workout created', data: MOCK_WORKOUTS[0] });
    const result = await workoutApi.createWorkout({ name: 'Full Body Fundamentals', level: 'Beginner', days: 3, exercises: 8, focus: 'General Fitness', duration: '45 mins' });
    expect(result.message).toBe('Workout created');
    expect(result.data.id).toBe('wk-1');
  });
});
