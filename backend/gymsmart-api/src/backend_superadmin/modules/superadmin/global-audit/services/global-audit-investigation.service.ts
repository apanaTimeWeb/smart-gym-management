// RESPONSIBILITY: Builds investigation data from the authoritative audit_logs table; no seeded snapshot is used.
// FLOW: Controller -> GlobalAuditInvestigationService -> GlobalAuditRepository -> PostgreSQL audit_logs.
import { Injectable } from '@nestjs/common';
import { GlobalAuditInvestigationResponseDto } from '@/backend_superadmin/modules/backend_superadmin/global-audit/global-audit-investigation-response.dto';
import { GlobalAuditRepository } from '@/backend_superadmin/modules/backend_superadmin/global-audit/global-audit.repository';

@Injectable()
export class GlobalAuditInvestigationService {
  constructor(private readonly repository: GlobalAuditRepository) {}

  /** Builds the investigation view from the most recent audit entries. */
  async findGlobalAuditInvestigation(input: { query?: { page?: number; limit?: number }; page?: number; limit?: number } = {}): Promise<GlobalAuditInvestigationResponseDto> {
    const page = await this.repository.findPage({ page: input.query?.page ?? input.page ?? 1, limit: Math.min(input.query?.limit ?? input.limit ?? 100, 200), sortBy: 'createdAt', sortOrder: 'DESC' });
    const filters = [...new Set(page.items.flatMap((row) => [row.actorRole, row.action, row.entityType]))].slice(0, 50);
    const changes = page.items.slice(0, 100).map((row) => ({ time: row.createdAt.toISOString(), actor: row.actorId, action: row.action, resource: row.entityType, before: JSON.stringify(row.oldValue ?? null), after: JSON.stringify(row.newValue ?? null), risk: 'UNCLASSIFIED' }));
    return { changes, anomalies: [], filters };
  }
}
