// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { HrPayStaffDueService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-pay-staff-due.service';

describe('HrPayStaffDueService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { payStaffDue: jest.fn().mockResolvedValue(expected) };
    const service = new HrPayStaffDueService(dependency as never);
    const result = await service.payStaffDue({} as never);
    expect(result).toEqual(expected);
    expect(dependency.payStaffDue).toHaveBeenCalledTimes(1);
    expect(dependency.payStaffDue).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { payStaffDue: jest.fn().mockRejectedValue(failure) };
    const service = new HrPayStaffDueService(dependency as never);
    await expect(service.payStaffDue({} as never)).rejects.toBe(failure);
    expect(dependency.payStaffDue).toHaveBeenCalledTimes(1);
  });
});
