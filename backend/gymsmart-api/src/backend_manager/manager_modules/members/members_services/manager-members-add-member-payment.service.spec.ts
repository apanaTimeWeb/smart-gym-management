// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { MembersAddMemberPaymentService } from '@/backend_manager/manager_modules/members/members_services/manager-members-add-member-payment.service';

describe('MembersAddMemberPaymentService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { createMember: jest.fn().mockResolvedValue(expected) };
    const service = new MembersAddMemberPaymentService(dependency as never);
    const result = await service.createMemberPayment({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.createMember).toHaveBeenCalledTimes(1);
    expect(dependency.createMember).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { createMember: jest.fn().mockRejectedValue(failure) };
    const service = new MembersAddMemberPaymentService(dependency as never);
    await expect(service.createMemberPayment({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.createMember).toHaveBeenCalledTimes(1);
  });
});
