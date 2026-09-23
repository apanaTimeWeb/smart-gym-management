// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { CommunicationsSendWinBackMessageService } from '@/backend_manager/modules/backend_manager/communications/services/communications-send-win-back-message.service';

describe('CommunicationsSendWinBackMessageService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { createCommunications: jest.fn().mockResolvedValue(expected) };
    const service = new CommunicationsSendWinBackMessageService(dependency as never);
    const result = await service.sendWinBackMessage({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.createCommunications).toHaveBeenCalledTimes(1);
    expect(dependency.createCommunications).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { createCommunications: jest.fn().mockRejectedValue(failure) };
    const service = new CommunicationsSendWinBackMessageService(dependency as never);
    await expect(service.sendWinBackMessage({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.createCommunications).toHaveBeenCalledTimes(1);
  });
});
