// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { WorkoutFetchWorkoutsService } from '@/backend_manager/modules/backend_manager/workout/services/workout-fetch-workouts.service';

describe('WorkoutFetchWorkoutsService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findWorkoutList: jest.fn().mockResolvedValue(expected) };
    const service = new WorkoutFetchWorkoutsService(dependency as never);
    const result = await service.fetchWorkouts({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findWorkoutList).toHaveBeenCalledTimes(1);
    expect(dependency.findWorkoutList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findWorkoutList: jest.fn().mockRejectedValue(failure) };
    const service = new WorkoutFetchWorkoutsService(dependency as never);
    await expect(service.fetchWorkouts({} as never)).rejects.toBe(failure);
    expect(dependency.findWorkoutList).toHaveBeenCalledTimes(1);
  });
});
