// RESPONSIBILITY: Owns deterministic, idempotent Manager feature seed data for the tenant database.
// FLOW: Master seed runner -> feature seeder -> tenant DataSource -> stable UUID upsert.
import { DataSource } from 'typeorm';

import { ManagerNotificationsEntity } from '@/backend_manager/manager_modules/notifications/manager-notifications.entity';
import { NotificationsRecordStatus } from '@/backend_manager/manager_modules/notifications/manager-notifications.constants';

export class ManagerNotificationsSeeder {
  /** Seeds one stable Manager notifications record and updates the same row on subsequent runs. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManagerNotificationsEntity);
    await (repository as any).upsert({ id: '00000000-0000-4000-8000-000000000006', payload: { seedKey: 'manager:notifications:v1', name: 'Manager Notifications Seed', status: 'ACTIVE' } , status: NotificationsRecordStatus.ACTIVE }, ['id']);
  }
}

export { ManagerNotificationsSeeder as NotificationsSeeder };
