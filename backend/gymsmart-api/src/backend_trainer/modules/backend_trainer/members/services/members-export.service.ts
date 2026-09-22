// RESPONSIBILITY: Produces a bounded CSV export for trainer-owned members.
// FLOW: MembersQueryController → MembersExportService → MembersRepository → tenant DB → CSV.

import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { MembersRepository } from '@/backend_trainer/modules/backend_trainer/members/repositories/members-repository';

@Injectable()
export class MembersExportService {
  constructor(private readonly repo: MembersRepository) {}

  /** Produces a deterministic, bounded CSV without exposing ORM entities. */
  async exportCsv(): Promise<string> {
    const trainerId = CoreRequestContext.get().userId ?? '';
    const result = await this.repo.findMany(trainerId, { page: 1, limit: 5000, sortBy: 'name', sortDirection: 'asc' });
    const escape = (value: unknown): string => `"${String(value ?? '').replaceAll('"', '""')}"`;
    const header = 'id,name,email,phone,status,plan,joinDate,expiryDate,progressStatus';
    const rows = result.rows.map((member) => [member.id, member.name, member.email, member.phone, member.status, member.planName, member.joinDate.toISOString(), member.expiryDate.toISOString(), member.progressStatus].map(escape).join(','));
    return [header, ...rows].join('\n');
  }
}
