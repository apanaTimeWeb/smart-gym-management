// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { HrDeleteStaffService } from '@/backend_manager/modules/backend_manager/hr/services/hr-delete-staff.service';

describe('HrDeleteStaffService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { softDeleteHrById: jest.fn().mockResolvedValue(expected) };
    const service = new HrDeleteStaffService(dependency as never);
    const result = await service.deleteStaff('test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.softDeleteHrById).toHaveBeenCalledTimes(1);
    expect(dependency.softDeleteHrById).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { softDeleteHrById: jest.fn().mockRejectedValue(failure) };
    const service = new HrDeleteStaffService(dependency as never);
    await expect(service.deleteStaff('test-id' as never)).rejects.toBe(failure);
    expect(dependency.softDeleteHrById).toHaveBeenCalledTimes(1);
  });
});
