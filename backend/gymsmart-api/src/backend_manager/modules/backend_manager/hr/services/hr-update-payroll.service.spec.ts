// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { HrUpdatePayrollService } from '@/backend_manager/modules/backend_manager/hr/services/hr-update-payroll.service';

describe('HrUpdatePayrollService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { updateHrById: jest.fn().mockResolvedValue(expected) };
    const service = new HrUpdatePayrollService(dependency as never);
    const result = await service.updatePayroll({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.updateHrById).toHaveBeenCalledTimes(1);
    expect(dependency.updateHrById).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { updateHrById: jest.fn().mockRejectedValue(failure) };
    const service = new HrUpdatePayrollService(dependency as never);
    await expect(service.updatePayroll({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.updateHrById).toHaveBeenCalledTimes(1);
  });
});
