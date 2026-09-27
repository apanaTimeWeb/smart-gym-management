// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { HrGeneratePayrollsService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-generate-payrolls.service';

describe('HrGeneratePayrollsService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { generatePayrolls: jest.fn().mockResolvedValue(expected) };
    const service = new HrGeneratePayrollsService(dependency as never);
    const result = await service.generatePayrolls({} as never);
    expect(result).toEqual(expected);
    expect(dependency.generatePayrolls).toHaveBeenCalledTimes(1);
    expect(dependency.generatePayrolls).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { generatePayrolls: jest.fn().mockRejectedValue(failure) };
    const service = new HrGeneratePayrollsService(dependency as never);
    await expect(service.generatePayrolls({} as never)).rejects.toBe(failure);
    expect(dependency.generatePayrolls).toHaveBeenCalledTimes(1);
  });
});
