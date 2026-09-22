// RESPONSIBILITY: Co-located behavioral unit proof for FinanceFetchPaymentsByMemberService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> FinanceFetchPaymentsByMemberService.fetchPaymentsByMember -> observable return/delegation.
import { FinanceFetchPaymentsByMemberService } from '@/modules/manager/finance/services/finance-fetch-payments-by-member.service.ts';

describe('FinanceFetchPaymentsByMemberService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'finance' } as const;
    const dependency = { fetchPaymentsByMember: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new FinanceFetchPaymentsByMemberService(dependency as never);
    const result = await service.fetchPaymentsByMember({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchPaymentsByMember as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
