// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for MembersAddMemberPaymentService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> MembersAddMemberPaymentService.addMemberPayment -> observable return/delegation.
import { MembersAddMemberPaymentService } from '@/backend_manager/modules/manager/members/services/members-add-member-payment.service';

describe('MembersAddMemberPaymentService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'members' } as const;
    const dependency = { addMemberPayment: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new MembersAddMemberPaymentService(dependency as never);
    const result = await service.addMemberPayment({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.addMemberPayment as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
