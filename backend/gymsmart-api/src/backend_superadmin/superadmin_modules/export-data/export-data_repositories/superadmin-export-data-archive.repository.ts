// RESPONSIBILITY: Owns TypeORM QueryBuilder reads for denormalized Superadmin export rows; no file or business orchestration.
// FLOW: SuperadminExportDataArchiveService -> QueryBuilder resource projection -> bounded tenant filter -> CSV page.
import { Injectable } from '@nestjs/common';
import { DataSource, SelectQueryBuilder } from 'typeorm';

type SuperadminExportQueryRow = Record<string, unknown>;
import type { ExportDataResource } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data-request.constants';

/**
 * Primary Intent: Defines SuperadminExportDataArchiveRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminExportDataArchiveRepository {
  constructor(private readonly dataSource: DataSource) {}

  /**
 * Primary Intent: Executes the readPage use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async readPage(resource: ExportDataResource, tenantIds: string[], offset: number, limit: number): Promise<Record<string, unknown>[]> {
    const query = this.buildQuery(resource, tenantIds).offset(offset).limit(limit);
    return query.getRawMany<Record<string, unknown>>();
  }

  /**
 * Primary Intent: Executes the buildQuery use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private buildQuery(resource: ExportDataResource, tenantIds: string[]): SelectQueryBuilder<SuperadminExportQueryRow> {
    if (resource === 'gyms') return this.buildGymsQuery(tenantIds);
    if (resource === 'audit_logs') return this.buildAuditQuery(tenantIds);
    if (resource === 'invoices') return this.buildInvoiceQuery(tenantIds);
    if (resource === 'settings') return this.buildSettingsQuery();
    return this.buildReportsQuery();
  }

  /**
 * Primary Intent: Executes the buildGymsQuery use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private buildGymsQuery(tenantIds: string[]): SelectQueryBuilder<SuperadminExportQueryRow> {
    const query = this.dataSource.createQueryBuilder().select([
      't.id AS "tenantId"', 't.name AS "tenantName"', 't.owner_name AS "ownerName"', 't.admin_email AS "adminEmail"', 't.phone',
      't.status', 'COALESCE(p.name, t.plan) AS "planName"', 't.member_count AS "memberCount"', 't.monthly_revenue AS "monthlyRevenue"',
      't.database_version AS "databaseVersion"', 't.city', 't.state', 't.country', 't.gstin', 't.trial_ends_at AS "trialEndsAt"',
      't.last_login_at AS "lastLoginAt"', 't.last_active_at AS "lastActiveAt"', 't.staff_count AS "staffCount"',
      't.acquisition_source AS "acquisitionSource"', 't.acquisition_cost_minor AS "acquisitionCostMinor"', 't.tax_rate_basis_points AS "taxRateBasisPoints"',
    ]).from('tenants', 't').leftJoin('superadmin_subscription_plans', 'p', 'p.name = t.plan AND p.deleted_at IS NULL').where('t.deleted_at IS NULL').orderBy('t.id', 'ASC');
    return this.applyTenantFilter(query, 't.id', tenantIds);
  }

  /**
 * Primary Intent: Executes the buildAuditQuery use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private buildAuditQuery(tenantIds: string[]): SelectQueryBuilder<SuperadminExportQueryRow> {
    const query = this.dataSource.createQueryBuilder().select([
      'a.id', 'a.created_at AS "createdAt"', 'COALESCE(sp.email, ta.email, a.actor_id) AS "actorEmail"', 'a.actor_role AS "actorRole"',
      'a.action', 'a.entity_type AS "entityType"', 'a.entity_id AS "entityId"', 'a.old_value AS "oldValue"', 'a.new_value AS "newValue"',
      'a.ip_address AS "ipAddress"', 'a.tenant_id AS "tenantId"', 'COALESCE(t.name, \'GLOBAL\') AS "tenantName"',
    ]).from('audit_logs', 'a')
      .leftJoin('superadmin_profiles', 'sp', 'sp.id = a.actor_id AND sp.deleted_at IS NULL')
      .leftJoin('tenant_admin_accounts', 'ta', 'ta.id = a.actor_id AND ta.deleted_at IS NULL')
      .leftJoin('tenants', 't', 't.id = a.tenant_id')
      .where('a.deleted_at IS NULL').orderBy('a.created_at', 'ASC').addOrderBy('a.id', 'ASC');
    return this.applyTenantFilter(query, 'a.tenant_id', tenantIds);
  }

  /**
 * Primary Intent: Executes the buildInvoiceQuery use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private buildInvoiceQuery(tenantIds: string[]): SelectQueryBuilder<SuperadminExportQueryRow> {
    const query = this.dataSource.createQueryBuilder().select([
      'i.id', 'i.tenant_id AS "tenantId"', 'COALESCE(t.name, i.tenant_name) AS "tenantName"', 'COALESCE(p.name, i.plan_name) AS "planName"',
      'i.amount', 'i.currency', 'i.status', 'i.issued_at AS "issuedAt"', 'i.due_date AS "dueDate"', 'i.paid_at AS "paidAt"',
      'i.payment_method AS "paymentMethod"', 'i.invoice_type AS "invoiceType"', 'i.tax_id AS "taxId"',
    ]).from('superadmin_saas_invoices', 'i')
      .leftJoin('tenants', 't', 't.id = i.tenant_id AND t.deleted_at IS NULL')
      .leftJoin('superadmin_subscription_plans', 'p', 'p.name = i.plan_name AND p.deleted_at IS NULL')
      .where('i.deleted_at IS NULL').orderBy('i.issued_at', 'ASC').addOrderBy('i.id', 'ASC');
    return this.applyTenantFilter(query, 'i.tenant_id', tenantIds);
  }

  /**
 * Primary Intent: Executes the buildSettingsQuery use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private buildSettingsQuery(): SelectQueryBuilder<SuperadminExportQueryRow> {
    return this.dataSource.createQueryBuilder().select([
      's.id', 's.key', 's.value', 's.description', 's.category', 's.data_type AS "dataType"', 's.created_at AS "createdAt"', 's.updated_at AS "updatedAt"',
    ]).from('superadmin_platform_settings', 's').where('s.deleted_at IS NULL').orderBy('s.key', 'ASC');
  }

  /**
 * Primary Intent: Executes the buildReportsQuery use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private buildReportsQuery(): SelectQueryBuilder<SuperadminExportQueryRow> {
    return this.dataSource.createQueryBuilder().select(['r.id', 'r.kind', 'r.payload', 'r.created_at AS "createdAt"', 'r.updated_at AS "updatedAt"'])
      .from('superadmin_report_snapshots', 'r').where('r.deleted_at IS NULL').orderBy('r.created_at', 'ASC').addOrderBy('r.id', 'ASC');
  }

  /**
 * Primary Intent: Executes the applyTenantFilter use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private applyTenantFilter(query: SelectQueryBuilder<SuperadminExportQueryRow>, column: string, tenantIds: string[]): SelectQueryBuilder<SuperadminExportQueryRow> {
    if (tenantIds.length) query.andWhere(`${column} IN (:...tenantIds)`, { tenantIds });
    return query;
  }
}
