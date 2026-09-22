// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for CommunicationsFetchChurnedMembersService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> CommunicationsFetchChurnedMembersService.fetchChurnedMembers -> observable return/delegation.
import { CommunicationsFetchChurnedMembersService } from '@/backend_manager/modules/manager/communications/services/communications-fetch-churned-members.service';

describe('CommunicationsFetchChurnedMembersService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'communications' } as const;
    const dependency = { fetchChurnedMembers: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new CommunicationsFetchChurnedMembersService(dependency as never);
    const result = await service.fetchChurnedMembers({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchChurnedMembers as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
