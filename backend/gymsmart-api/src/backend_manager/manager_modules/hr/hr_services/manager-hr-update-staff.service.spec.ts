// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { HrUpdateStaffService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-update-staff.service';

describe('HrUpdateStaffService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { updateStaff: jest.fn().mockResolvedValue(expected) };
    const service = new HrUpdateStaffService(dependency as never);
    const result = await service.updateStaff({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.updateStaff).toHaveBeenCalledTimes(1);
    expect(dependency.updateStaff).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { updateStaff: jest.fn().mockRejectedValue(failure) };
    const service = new HrUpdateStaffService(dependency as never);
    await expect(service.updateStaff({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.updateStaff).toHaveBeenCalledTimes(1);
  });
});
