// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { MembersAssignWorkoutService } from '@/backend_manager/modules/backend_manager/members/services/members-assign-workout.service';

describe('MembersAssignWorkoutService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { createMembers: jest.fn().mockResolvedValue(expected) };
    const service = new MembersAssignWorkoutService(dependency as never);
    const result = await service.assignMemberWorkout({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.createMembers).toHaveBeenCalledTimes(1);
    expect(dependency.createMembers).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { createMembers: jest.fn().mockRejectedValue(failure) };
    const service = new MembersAssignWorkoutService(dependency as never);
    await expect(service.assignMemberWorkout({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.createMembers).toHaveBeenCalledTimes(1);
  });
});
