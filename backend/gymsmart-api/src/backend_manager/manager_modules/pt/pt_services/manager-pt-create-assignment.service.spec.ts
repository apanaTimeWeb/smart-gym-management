// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { PtCreateAssignmentService } from '@/backend_manager/manager_modules/pt/pt_services/manager-pt-create-assignment.service';

describe('PtCreateAssignmentService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { createAssignment: jest.fn().mockResolvedValue(expected) };
    const service = new PtCreateAssignmentService(dependency as never);
    const result = await service.createAssignment({} as never);
    expect(result).toEqual(expected);
    expect(dependency.createAssignment).toHaveBeenCalledTimes(1);
    expect(dependency.createAssignment).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { createAssignment: jest.fn().mockRejectedValue(failure) };
    const service = new PtCreateAssignmentService(dependency as never);
    await expect(service.createAssignment({} as never)).rejects.toBe(failure);
    expect(dependency.createAssignment).toHaveBeenCalledTimes(1);
  });
});
