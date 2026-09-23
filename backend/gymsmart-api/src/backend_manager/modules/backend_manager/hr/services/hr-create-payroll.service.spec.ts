// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { HrCreatePayrollService } from '@/backend_manager/modules/backend_manager/hr/services/hr-create-payroll.service';

describe('HrCreatePayrollService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { createHr: jest.fn().mockResolvedValue(expected) };
    const service = new HrCreatePayrollService(dependency as never);
    const result = await service.createPayroll({} as never);
    expect(result).toEqual(expected);
    expect(dependency.createHr).toHaveBeenCalledTimes(1);
    expect(dependency.createHr).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { createHr: jest.fn().mockRejectedValue(failure) };
    const service = new HrCreatePayrollService(dependency as never);
    await expect(service.createPayroll({} as never)).rejects.toBe(failure);
    expect(dependency.createHr).toHaveBeenCalledTimes(1);
  });
});
