// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { HrGiveStaffAdvanceService } from '@/backend_manager/modules/backend_manager/hr/services/hr-give-staff-advance.service';

describe('HrGiveStaffAdvanceService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { createHr: jest.fn().mockResolvedValue(expected) };
    const service = new HrGiveStaffAdvanceService(dependency as never);
    const result = await service.createStaffAdvance({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.createHr).toHaveBeenCalledTimes(1);
    expect(dependency.createHr).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { createHr: jest.fn().mockRejectedValue(failure) };
    const service = new HrGiveStaffAdvanceService(dependency as never);
    await expect(service.createStaffAdvance({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.createHr).toHaveBeenCalledTimes(1);
  });
});
