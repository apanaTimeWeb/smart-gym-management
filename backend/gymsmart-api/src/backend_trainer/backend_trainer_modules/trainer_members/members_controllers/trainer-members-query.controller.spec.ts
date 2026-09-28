// RESPONSIBILITY: Proves member resource authorization executes before the detail business query.
// FLOW: Jest → TrainerMembersQueryController.detail → authorization → query service.

import { TrainerMembersQueryController } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_controllers/trainer-members-query.controller';

describe('TrainerMembersQueryController authorization', () => {
  it('authorizes the member before invoking the query service', async () => {
    const order: string[] = [];
    const authorization = { assertMember: jest.fn(async () => { order.push('authorize'); }) };
    const service = { findById: jest.fn(async () => { order.push('query'); return { id: 'member-1' }; }) };
    const controller = new TrainerMembersQueryController(service as never, authorization as never);

    await expect(controller.detail('member-1')).resolves.toEqual({ id: 'member-1' });
    expect(order).toEqual(['authorize', 'query']);
  });
});
