// RESPONSIBILITY: Owns deterministic, idempotent Manager feature seed data for the tenant database.
// FLOW: Master seed runner -> feature seeder -> tenant DataSource -> stable UUID upsert.
import { DataSource } from 'typeorm';

import { ManagerInquiriesEntity } from '@/backend_manager/manager_modules/inquiries/manager-inquiries.entity';
import { InquiriesRecordStatus } from '@/backend_manager/manager_modules/inquiries/manager-inquiries.constants';

export class ManagerInquiriesSeeder {
  /** Seeds one stable Manager inquiries record and updates the same row on subsequent runs. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManagerInquiriesEntity);
    await (repository as any).upsert({ id: '00000000-0000-4000-8000-000000000007', payload: { seedKey: 'manager:inquiries:v1', name: 'Manager Inquiries Seed', status: 'ACTIVE' } , status: InquiriesRecordStatus.ACTIVE, currency: 'INR' }, ['id']);
  }
}

export { ManagerInquiriesSeeder as InquiriesSeeder };
