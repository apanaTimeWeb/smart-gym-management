// RESPONSIBILITY: Produces a bounded CSV earnings export for the authenticated Trainer.
// FLOW: Earnings command controller → EarningsExportService → EarningsRepository → tenant DB.

import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { EarningsRepository } from '@/backend_trainer/modules/backend_trainer/earnings/repositories/earnings-repository';

@Injectable()
export class EarningsExportService {
  constructor(private readonly repo: EarningsRepository) {}

  /** Produces a bounded CSV export using repository-owned queries and no ORM access in the service. */
  async exportCsv(): Promise<string> {
    const trainerId = CoreRequestContext.get().userId ?? '';
    const rows = await this.repo.findExportRows(trainerId);
    const escape = (value: unknown): string => `"${String(value ?? '').replaceAll('"', '""')}"`;
    return ['id,date,type,description,amount,status', ...rows.map((row) => [row.id, row.date, row.type, row.description, row.amount, row.status].map(escape).join(','))].join('\n');
  }
}
