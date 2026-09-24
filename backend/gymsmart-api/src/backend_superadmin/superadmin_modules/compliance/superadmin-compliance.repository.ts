// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for compliance; no business logic.
// FLOW: compliance service -> repository -> authoritative tenant compliance queries.
import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { SuperadminCoreBaseRepository } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.repository';
import { SuperadminCoreTransactionContext } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-transaction-context';
import { SuperadminComplianceEntity } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance.entity';
import type { SuperadminComplianceListQuery, SuperadminComplianceCreateInput, SuperadminComplianceUpdateInput, SuperadminComplianceSummaryRow, SuperadminComplianceRegionRow, SuperadminComplianceLivePayload } from '@/backend_superadmin/superadmin_modules/compliance/compliance_types/superadmin-compliance.interfaces';

import { ComplianceDocumentStatus } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance.constants';

/**
 * Primary Intent: Defines the ComplianceDocumentRow type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
interface ComplianceDocumentRow { tenant: string; document: string; status: string; expires: string | Date | null; }

/**
 * Primary Intent: Defines SuperadminComplianceRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminComplianceRepository extends SuperadminCoreBaseRepository<SuperadminComplianceEntity> {
  constructor(@InjectRepository(SuperadminComplianceEntity) repository: Repository<SuperadminComplianceEntity>, transactionContext: SuperadminCoreTransactionContext, @InjectDataSource() private readonly dataSource: DataSource) { super(repository, transactionContext); }
  /**
 * Primary Intent: Executes the findPage use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findPage(query: SuperadminComplianceListQuery): Promise<{ items: SuperadminComplianceEntity[]; total: number }> { const qb = this.createActiveQuery('item'); if (query.search?.trim()) qb.andWhere('item.kind ILIKE :search', { search: `%${query.search.trim()}%` }); const sortMap: Record<string, string> = { createdAt: 'item.created_at', updatedAt: 'item.updated_at', kind: 'item.kind' }; qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC').skip((query.page - 1) * query.limit).take(query.limit); const [items, total] = await qb.getManyAndCount(); return { items, total }; }
  /**
 * Primary Intent: Executes the findById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findById(id: string): Promise<SuperadminComplianceEntity | null> { return super.findById(id); }
  /**
 * Primary Intent: Executes the findByIdOrThrow use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findByIdOrThrow(id: string): Promise<SuperadminComplianceEntity> { return super.findByIdOrThrow(id, 'COMPLIANCE.RECORD.NOT_FOUND'); }
  /**
 * Primary Intent: Executes the createCompliance use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async createCompliance(input: SuperadminComplianceCreateInput): Promise<SuperadminComplianceEntity> { return this.activeRepository.save(this.activeRepository.create(input as {})); }
  /**
 * Primary Intent: Executes the updateComplianceById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updateComplianceById(id: string, input: SuperadminComplianceUpdateInput): Promise<SuperadminComplianceEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }
  /**
 * Primary Intent: Executes the deleteComplianceById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async deleteComplianceById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }
  /**
 * Primary Intent: Executes the getLiveCompliance use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async getLiveCompliance(currency = 'INR', _input: Record<string, unknown> = {}): Promise<SuperadminComplianceLivePayload> {
    const [summary] = await this.dataSource.query<SuperadminComplianceSummaryRow[]>(`SELECT COUNT(*)::int registered_tenants, COUNT(*) FILTER (WHERE COALESCE(gstin,'')='')::int missing_tax_details FROM tenants WHERE deleted_at IS NULL`);
    const regions = await this.dataSource.query<SuperadminComplianceRegionRow[]>(`SELECT COALESCE(state,'UNKNOWN') region, COUNT(*)::int registered, COUNT(*) FILTER (WHERE COALESCE(gstin,'')='')::int missing, ROUND(AVG(tax_rate_basis_points)::numeric / 100, 2)::float AS tax_rate FROM tenants WHERE deleted_at IS NULL GROUP BY COALESCE(state,'UNKNOWN') ORDER BY registered DESC`);
    const documents = await this.dataSource.query<ComplianceDocumentRow[]>(`SELECT t.name tenant, d.document_type document, d.status, d.expires_at expires FROM superadmin_compliance_documents d INNER JOIN tenants t ON t.id = d.tenant_id WHERE d.deleted_at IS NULL AND t.deleted_at IS NULL ORDER BY d.expires_at NULLS LAST, t.name LIMIT 500`);
    const documentsExpiring = documents.filter((row) => row.expires && new Date(row.expires).getTime() >= Date.now() && new Date(row.expires).getTime() <= Date.now() + 90 * 86_400_000).length;
    return {
      summary: { registeredTenants: Number(summary?.registered_tenants ?? 0), missingTaxDetails: Number(summary?.missing_tax_details ?? 0), documentsExpiring, openComplianceTasks: Number(summary?.missing_tax_details ?? 0) + documentsExpiring },
      regions: regions.map((row) => ({ region: row.region, registered: Number(row.registered), missing: Number(row.missing), taxRate: Number(row.tax_rate ?? 0), status: Number(row.missing) > 0 ? 'ATTENTION' : 'READY' })),
      documents: documents.map((row) => ({ tenant: row.tenant, document: row.document, status: row.status || ComplianceDocumentStatus.MISSING, expires: row.expires ? new Date(row.expires).toISOString() : null })),
      currency,
    };
  }

}
