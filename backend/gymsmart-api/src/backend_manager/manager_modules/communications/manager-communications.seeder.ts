// RESPONSIBILITY: Owns deterministic, idempotent Manager feature seed data for the tenant database.
// FLOW: Master seed runner -> feature seeder -> tenant DataSource -> stable UUID upsert.
import { DataSource } from 'typeorm';

import { ManagerCommunicationsEntity } from '@/backend_manager/manager_modules/communications/manager-communications.entity';
import { CommunicationsRecordStatus } from '@/backend_manager/manager_modules/communications/manager-communications.constants';

export class ManagerCommunicationsSeeder {
  /** Seeds one stable Manager communications record and updates the same row on subsequent runs. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManagerCommunicationsEntity);
    await (repository as any).upsert({ id: '00000000-0000-4000-8000-000000000014', payload: { seedKey: 'manager:communications:v1', name: 'Manager Communications Seed', status: 'ACTIVE' } , status: CommunicationsRecordStatus.ACTIVE }, ['id']);
  }
}

export { ManagerCommunicationsSeeder as CommunicationsSeeder };
