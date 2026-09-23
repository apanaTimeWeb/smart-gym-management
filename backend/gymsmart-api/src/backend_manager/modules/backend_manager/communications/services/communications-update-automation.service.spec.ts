// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { CommunicationsUpdateAutomationService } from '@/backend_manager/modules/backend_manager/communications/services/communications-update-automation.service';

describe('CommunicationsUpdateAutomationService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { updateCommunicationsById: jest.fn().mockResolvedValue(expected) };
    const service = new CommunicationsUpdateAutomationService(dependency as never);
    const result = await service.updateAutomation({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.updateCommunicationsById).toHaveBeenCalledTimes(1);
    expect(dependency.updateCommunicationsById).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { updateCommunicationsById: jest.fn().mockRejectedValue(failure) };
    const service = new CommunicationsUpdateAutomationService(dependency as never);
    await expect(service.updateAutomation({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.updateCommunicationsById).toHaveBeenCalledTimes(1);
  });
});
