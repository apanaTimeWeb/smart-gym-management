// RESPONSIBILITY: Co-located behavioral unit proof for MembersFetchMemberPaymentsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> MembersFetchMemberPaymentsService.fetchMemberPayments -> observable return/delegation.
import { MembersFetchMemberPaymentsService } from '@/modules/manager/members/services/members-fetch-member-payments.service.ts';

describe('MembersFetchMemberPaymentsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'members' } as const;
    const dependency = { fetchMemberPayments: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new MembersFetchMemberPaymentsService(dependency as never);
    const result = await service.fetchMemberPayments({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchMemberPayments as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
