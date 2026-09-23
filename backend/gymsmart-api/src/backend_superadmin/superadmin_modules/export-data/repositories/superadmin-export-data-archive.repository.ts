// RESPONSIBILITY: Owns TypeORM QueryBuilder reads for denormalized Superadmin export rows; no file or business orchestration.
// FLOW: SuperadminExportDataArchiveService -> QueryBuilder resource projection -> bounded tenant filter -> CSV page.
import { Injectable } from '@nestjs/common';
import { DataSource, SelectQueryBuilder } from 'typeorm';
import type { ExportDataResource } from '@/backend_superadmin/superadmin_modules/export-data/dtos/superadmin-export-data-request.dto';

@Injectable()
export class SuperadminExportDataArchiveRepository {
  constructor(private readonly dataSource: DataSource) {}

  /** Reads one bounded page from the approved resource projection with resolved foreign-key labels. */
  async readPage(resource: ExportDataResource, tenantIds: string[], offset: number, limit: number): Promise<Record<string, unknown>[]> {
    const query = this.buildQuery(resource, tenantIds).offset(offset).limit(limit);
    return query.getRawMany<Record<string, unknown>>();
  }

  /** Builds a resource-specific QueryBuilder using only approved static tables and columns. */
  private buildQuery(resource: ExportDataResource, tenantIds: string[]): SelectQueryBuilder<any> {
    if (resource === 'gyms') return this.buildGymsQuery(tenantIds);
    if (resource === 'audit_logs') return this.buildAuditQuery(tenantIds);
    if (resource === 'invoices') return this.buildInvoiceQuery(tenantIds);
    if (resource === 'settings') return this.buildSettingsQuery();
    return this.buildReportsQuery();
  }

  /** Projects tenant data with subscription-plan names already resolved. */
  private buildGymsQuery(tenantIds: string[]): SelectQueryBuilder<any> {
    const query = this.dataSource.createQueryBuilder().select([
      't.id AS "tenantId"', 't.name AS "tenantName"', 't.owner_name AS "ownerName"', 't.admin_email AS "adminEmail"', 't.phone',
      't.status', 'COALESCE(p.name, t.plan) AS "planName"', 't.member_count AS "memberCount"', 't.monthly_revenue AS "monthlyRevenue"',
      't.database_version AS "databaseVersion"', 't.city', 't.state', 't.country', 't.gstin', 't.trial_ends_at AS "trialEndsAt"',
      't.last_login_at AS "lastLoginAt"', 't.last_active_at AS "lastActiveAt"', 't.staff_count AS "staffCount"',
      't.acquisition_source AS "acquisitionSource"', 't.acquisition_cost_minor AS "acquisitionCostMinor"', 't.tax_rate_basis_points AS "taxRateBasisPoints"',
    ]).from('tenants', 't').leftJoin('superadmin_subscription_plans', 'p', 'p.name = t.plan AND p.deleted_at IS NULL').where('t.deleted_at IS NULL').orderBy('t.id', 'ASC');
    return this.applyTenantFilter(query, 't.id', tenantIds);
  }

  /** Projects audit data with actor and tenant human-readable references resolved. */
  private buildAuditQuery(tenantIds: string[]): SelectQueryBuilder<any> {
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

  /** Projects invoice data with authoritative tenant and plan labels resolved through joins. */
  private buildInvoiceQuery(tenantIds: string[]): SelectQueryBuilder<any> {
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

  /** Projects platform settings without synthetic relationship identifiers. */
  private buildSettingsQuery(): SelectQueryBuilder<any> {
    return this.dataSource.createQueryBuilder().select([
      's.id', 's.key', 's.value', 's.description', 's.category', 's.data_type AS "dataType"', 's.created_at AS "createdAt"', 's.updated_at AS "updatedAt"',
    ]).from('superadmin_platform_settings', 's').where('s.deleted_at IS NULL').orderBy('s.key', 'ASC');
  }

  /** Projects persisted report snapshots because the reports entity has no foreign-key dependencies. */
  private buildReportsQuery(): SelectQueryBuilder<any> {
    return this.dataSource.createQueryBuilder().select(['r.id', 'r.kind', 'r.payload', 'r.created_at AS "createdAt"', 'r.updated_at AS "updatedAt"'])
      .from('superadmin_report_snapshots', 'r').where('r.deleted_at IS NULL').orderBy('r.created_at', 'ASC').addOrderBy('r.id', 'ASC');
  }

  /** Applies a trusted tenant identifier list without interpolating client data into SQL. */
  private applyTenantFilter(query: SelectQueryBuilder<any>, column: string, tenantIds: string[]): SelectQueryBuilder<any> {
    if (tenantIds.length) query.andWhere(`${column} IN (:...tenantIds)`, { tenantIds });
    return query;
  }
}
