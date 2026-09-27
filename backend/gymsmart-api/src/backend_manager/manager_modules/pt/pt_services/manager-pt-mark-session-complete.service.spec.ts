// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { PtMarkSessionCompleteService } from '@/backend_manager/manager_modules/pt/pt_services/manager-pt-mark-session-complete.service';

describe('PtMarkSessionCompleteService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { completeSession: jest.fn().mockResolvedValue(expected) };
    const service = new PtMarkSessionCompleteService(dependency as never);
    const result = await service.completeSession({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.completeSession).toHaveBeenCalledTimes(1);
    expect(dependency.completeSession).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { completeSession: jest.fn().mockRejectedValue(failure) };
    const service = new PtMarkSessionCompleteService(dependency as never);
    await expect(service.completeSession({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.completeSession).toHaveBeenCalledTimes(1);
  });
});
