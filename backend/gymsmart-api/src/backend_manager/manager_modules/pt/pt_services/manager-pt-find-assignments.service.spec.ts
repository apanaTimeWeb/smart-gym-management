// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { PtFindAssignmentsService } from '@/backend_manager/manager_modules/pt/pt_services/manager-pt-find-assignments.service';

describe('PtFindAssignmentsService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findPtList: jest.fn().mockResolvedValue(expected) };
    const service = new PtFindAssignmentsService(dependency as never);
    const result = await service.findAssignments({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findPtList).toHaveBeenCalledTimes(1);
    expect(dependency.findPtList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findPtList: jest.fn().mockRejectedValue(failure) };
    const service = new PtFindAssignmentsService(dependency as never);
    await expect(service.findAssignments({} as never)).rejects.toBe(failure);
    expect(dependency.findPtList).toHaveBeenCalledTimes(1);
  });
});
