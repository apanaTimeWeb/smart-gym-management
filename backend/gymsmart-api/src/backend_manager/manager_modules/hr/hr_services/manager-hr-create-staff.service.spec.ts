// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { HrCreateStaffService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-create-staff.service';

describe('HrCreateStaffService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { createStaff: jest.fn().mockResolvedValue(expected) };
    const service = new HrCreateStaffService(dependency as never);
    const result = await service.createStaff({} as never);
    expect(result).toEqual(expected);
    expect(dependency.createStaff).toHaveBeenCalledTimes(1);
    expect(dependency.createStaff).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { createStaff: jest.fn().mockRejectedValue(failure) };
    const service = new HrCreateStaffService(dependency as never);
    await expect(service.createStaff({} as never)).rejects.toBe(failure);
    expect(dependency.createStaff).toHaveBeenCalledTimes(1);
  });
});
