// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { CommunicationsFindSegmentRecipientsService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-find-segment-recipients.service';

describe('CommunicationsFindSegmentRecipientsService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findCommunicationsList: jest.fn().mockResolvedValue(expected) };
    const service = new CommunicationsFindSegmentRecipientsService(dependency as never);
    const result = await service.findSegmentRecipients('test-id' as never, {} as never);
    expect(result).toEqual(expected);
    expect(dependency.findCommunicationsList).toHaveBeenCalledTimes(1);
    expect(dependency.findCommunicationsList).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findCommunicationsList: jest.fn().mockRejectedValue(failure) };
    const service = new CommunicationsFindSegmentRecipientsService(dependency as never);
    await expect(service.findSegmentRecipients('test-id' as never, {} as never)).rejects.toBe(failure);
    expect(dependency.findCommunicationsList).toHaveBeenCalledTimes(1);
  });
});
