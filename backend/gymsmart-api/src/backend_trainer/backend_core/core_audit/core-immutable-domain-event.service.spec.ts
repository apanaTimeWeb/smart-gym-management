// RESPONSIBILITY: Proves immutable attendance analytics events inherit the trusted actor context and transaction.
// FLOW: Jest → CoreImmutableDomainEventService → event repository → tenant transaction.

import { CoreImmutableDomainEventService } from '@/backend_trainer/backend_core/core_audit/core-immutable-domain-event.service';
import type { CoreImmutableDomainEventRepository } from '@/backend_trainer/backend_core/core_audit/core-immutable-domain-event.repository';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';

describe('CoreImmutableDomainEventService', () => {
  it('records the trusted actor and transaction-bound immutable event', async () => {
    const repository = { insert: jest.fn().mockResolvedValue(undefined) };
    const service = new CoreImmutableDomainEventService(repository as unknown as CoreImmutableDomainEventRepository);
    const transaction = {} as never;

    await CoreRequestContext.run({ userId: 'trainer-1', tenantId: 'tenant-1', requestId: 'req-1' }, () => service.record('ATTENDANCE.SESSION.CLOSED', 'ATTENDANCE_RECORD', 'attendance-1', { memberId: 'member-1' }, transaction));

    expect(repository.insert).toHaveBeenCalledWith(expect.objectContaining({ eventName: 'ATTENDANCE.SESSION.CLOSED', aggregateId: 'attendance-1', actorId: 'trainer-1', eventVersion: 1 }), transaction);
  });
});
