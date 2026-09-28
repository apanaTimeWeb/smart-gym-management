// RESPONSIBILITY: Owns deterministic, idempotent Manager feature seed data for the tenant database.
// FLOW: Master seed runner -> feature seeder -> tenant DataSource -> stable UUID upsert.
import { DataSource } from 'typeorm';

import { ManagerLibraryEntity } from '@/backend_manager/manager_modules/library/manager-library.entity';
import { LibraryRecordStatus } from '@/backend_manager/manager_modules/library/manager-library.constants';

export class ManagerLibrarySeeder {
  /** Seeds one stable Manager library record and updates the same row on subsequent runs. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManagerLibraryEntity);
    await (repository as any).upsert({ id: '00000000-0000-4000-8000-000000000021', payload: { seedKey: 'manager:library:v1', name: 'Manager Library Seed', status: 'ACTIVE' } , status: LibraryRecordStatus.ACTIVE }, ['id']);
  }
}

export { ManagerLibrarySeeder as LibrarySeeder };
