// RESPONSIBILITY: Proves notification delivery is persist-first, commit-first, emit-second.
// FLOW: Jest → TrainerNotificationsDeliveryService → UnitOfWork → repository → gateway.

import { TrainerNotificationsDeliveryService } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_services/trainer-notifications-delivery.service';
import type { CoreUnitOfWorkService } from '@/backend_trainer/backend_core/core_database/core-unit-of-work.service';
import type { TrainerNotificationsRepository } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_repositories/trainer-notifications-repository';
import type { TrainerNotificationsRealtimeGateway } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/trainer-notifications-realtime.gateway';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';

describe('TrainerNotificationsDeliveryService', () => {
  it('does not emit until the unit-of-work promise has resolved', async () => {
    const order: string[] = [];
    const persisted = { id: 'n1', title: 'Test', message: 'Saved', isRead: false, createdAt: '2026-09-24T00:00:00.000Z', type: 'SYSTEM', actionUrl: null, relatedEntityId: null, relatedEntityType: null, metadata: null };
    const repository = { createNotification: jest.fn(async () => { order.push('persist'); return persisted; }) };
    const gateway = { emitPersistedNotification: jest.fn(() => { order.push('emit'); }) };
    const uow = { execute: jest.fn(async (callback: (context: unknown) => Promise<unknown>) => { const result = await callback({}); order.push('commit'); return result; }) };
    const service = new TrainerNotificationsDeliveryService(uow as unknown as CoreUnitOfWorkService, repository as unknown as TrainerNotificationsRepository, gateway as unknown as TrainerNotificationsRealtimeGateway);

    await CoreRequestContext.run({ userId: 'trainer-1', tenantId: 'tenant-1', requestId: 'req-1' }, () => service.deliver({ trainerId: 'trainer-1', title: 'Test', message: 'Saved' }));

    expect(order).toEqual(['persist', 'commit', 'emit']);
    expect(gateway.emitPersistedNotification).toHaveBeenCalledTimes(1);
  });
});
