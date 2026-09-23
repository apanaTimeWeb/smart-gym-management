// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { HrFetchStaffByIdService } from '@/backend_manager/modules/backend_manager/hr/services/hr-fetch-staff-by-id.service';

describe('HrFetchStaffByIdService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findHrByIdOrThrow: jest.fn().mockResolvedValue(expected) };
    const service = new HrFetchStaffByIdService(dependency as never);
    const result = await service.fetchStaffById('test-id' as never, {} as never);
    expect(result).toEqual(expected);
    expect(dependency.findHrByIdOrThrow).toHaveBeenCalledTimes(1);
    expect(dependency.findHrByIdOrThrow).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findHrByIdOrThrow: jest.fn().mockRejectedValue(failure) };
    const service = new HrFetchStaffByIdService(dependency as never);
    await expect(service.fetchStaffById('test-id' as never, {} as never)).rejects.toBe(failure);
    expect(dependency.findHrByIdOrThrow).toHaveBeenCalledTimes(1);
  });
});
