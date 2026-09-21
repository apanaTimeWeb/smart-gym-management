// RESPONSIBILITY: Seeds deterministic development data for Admin data-export; never used in production runtime.
// FLOW: CoreTenantSeeder -> AdminDataExportSeeder -> TypeORM -> usage_snapshots.

import { DataSource } from 'typeorm';
import { AdminDataExportEntity } from '@/modules/admin/data-export/entities/admin-data_export-entity';

export class AdminDataExportSeeder {
  /** @description Inserts deterministic, idempotent seed records when the feature table is empty. @param dataSource Tenant database source. @returns Completion promise. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminDataExportEntity);
    const count = await repository.count();
    if (count > 0) return;
    await repository.save([
      repository.create({ payload: {
  "dataType": "members",
  "format": "csv",
  "gymIds": [
    "00000000-0000-0000-0000-000000000101"
  ],
  "gymNames": [
    "Buildronix Central"
  ],
  "dateFrom": "2026-09-01T00:00:00Z",
  "dateTo": "2026-09-21T00:00:00Z",
  "status": "completed",
  "rowCount": 3,
  "fileSizeKb": 8,
  "createdAt": "2026-09-21T08:20:00Z",
  "completedAt": "2026-09-21T08:21:00Z",
  "createdBy": "admin@example.com"
}, name: null, status: "completed", branchId: null })
    ]);
  }
}
