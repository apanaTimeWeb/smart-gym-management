// RESPONSIBILITY: Seeds deterministic development data for Admin campaigns; never used in production runtime.
// FLOW: CoreTenantSeeder -> AdminCampaignsSeeder -> TypeORM -> usage_snapshots.

import { DataSource } from 'typeorm';
import { AdminCampaignsEntity } from '@/backend_admin/modules/admin/campaigns/entities/admin-campaigns-entity';

export class AdminCampaignsSeeder {
  /** @description Inserts deterministic, idempotent seed records when the feature table is empty. @param dataSource Tenant database source. @returns Completion promise. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminCampaignsEntity);
    const count = await repository.count();
    if (count > 0) return;
    await repository.save([
      repository.create({ payload: {
  "audiences": [
    {
      "id": "AUD-1",
      "name": "All Members",
      "description": "All active members"
    },
    {
      "id": "AUD-2",
      "name": "Expiring",
      "description": "Members expiring within 7 days"
    }
  ],
  "templates": [
    {
      "id": "TPL-1",
      "title": "Fee reminder",
      "body": "Your membership fee is due.",
      "type": "FEE_REMINDER"
    },
    {
      "id": "TPL-2",
      "title": "Renewal reminder",
      "body": "Your membership is ready for renewal.",
      "type": "RENEWAL"
    }
  ],
  "recipients": [
    {
      "id": "00000000-0000-0000-0000-000000001001",
      "name": "Rahul Kumar",
      "phone": "9000000001",
      "branchName": "Buildronix Central"
    }
  ]
}, name: null, status: null, branchId: null })
    ]);
  }
}
