// RESPONSIBILITY: Returns current tenant usage-meter rows from PostgreSQL.
// FLOW: Controller -> UsageMetersMainService -> UsageMetersRepository -> response.
import { Injectable } from '@nestjs/common';
import { UsageMetersRepository } from '@/backend_superadmin/modules/backend_superadmin/usage-meters/usage-meters.repository';
import type { UsageMetersListQuery } from '@/backend_superadmin/modules/backend_superadmin/usage-meters/types/usage-meters.interfaces';

@Injectable()
export class UsageMetersMainService {
  constructor(private readonly repository: UsageMetersRepository) {}

  /** Returns a paginated usage-meter dataset using allowlisted query fields. */
  async findUsageMetersData(input: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
    const raw = input.query as Record<string, string> | undefined;
    const query: UsageMetersListQuery = { page: Number(raw?.page ?? 1), limit: Math.min(Number(raw?.limit ?? 50), 100), search: raw?.search, tenantId: raw?.tenantId, sortBy: (raw?.sortBy ?? 'createdAt') as never, sortOrder: raw?.sortOrder === 'ASC' ? 'ASC' : 'DESC' };
    const result = await this.repository.findPage(query);
    return { data: result.items.map((item) => ({ id: item.id, tenantId: item.tenantId, tenantName: item.tenantName, smsSent: item.smsSent, smsLimit: item.smsLimit, whatsappMessagesSent: item.whatsappMessagesSent, whatsappLimit: item.whatsappLimit, emailsSent: item.emailsSent, emailLimit: item.emailLimit, apiCallsCount: item.apiCallsCount, apiCallsLimit: item.apiCallsLimit, databaseGb: item.databaseGb, mediaGb: item.mediaGb, storageLimitGb: item.storageLimitGb, activeMembers: item.activeMembers, totalMembers: item.totalMembers, memberLimit: item.memberLimit, staffCount: item.staffCount, staffLimit: item.staffLimit, billingCycleEnd: item.billingCycleEnd.toISOString() })), meta: { page: query.page, limit: query.limit, total: result.total, totalPages: Math.ceil(result.total / query.limit) } };
  }
}