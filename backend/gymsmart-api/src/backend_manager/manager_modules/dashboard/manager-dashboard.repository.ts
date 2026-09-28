// RESPONSIBILITY: Owns dashboard persistence queries and row-level filtering; it never shapes HTTP responses.
// FLOW: Trusted tenant DataSource -> parameterized TypeORM/SQL query -> feature mapper/domain projection.
import { HttpStatus, Injectable } from '@nestjs/common';

import { ManagerCoreBusinessException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-business.exception';
import { ManagerCoreTenantDatasourceService } from '@/backend_manager/manager_core/manager_core_database/manager-core-tenant-datasource.service';
import { CoreBaseRepository } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.repository';
import { ManagerCoreNotFoundException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-not-found.exception';
import { ManagerDashboardEntity } from '@/backend_manager/manager_modules/dashboard/manager-dashboard.entity';
import { ManagerDashboardMapper } from '@/backend_manager/manager_modules/dashboard/manager-dashboard.mapper';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerDashboardDomainData } from '@/backend_manager/manager_modules/dashboard/dashboard_types/manager-dashboard.types';

@Injectable()
export class ManagerDashboardRepository extends CoreBaseRepository<ManagerDashboardEntity> {
  constructor(tenants: ManagerCoreTenantDatasourceService) { super(tenants, ManagerDashboardEntity); }

  /** Returns the latest active dashboard snapshot for the trusted tenant. */
  async findLatestSnapshot(): Promise<ManagerDashboardDomainData> {
    const repository = await this.getRepository();
    const row = await repository.createQueryBuilder('record')
      .where('record.deleted_at IS NULL')
      .andWhere('record.status = :status', { status: 'ACTIVE' })
      .orderBy('record.created_at', 'DESC')
      .addOrderBy('record.id', 'DESC')
      .getOne();
    if (!row) throw new ManagerCoreNotFoundException('dashboard', 'latest');
    return ManagerDashboardMapper.toDomain(row);
  }

  /** Returns recent members after applying the frontend search server-side and stable pagination. */
  async findRecentMembers(search: string | undefined, page: number, limit: number): Promise<{ rows: ManagerCoreJsonObject[]; total: number }> {
    const repository = await this.getRepository();
    const offset = (Math.max(1, page) - 1) * Math.max(1, limit);
    const normalized = search?.trim() || null;
    const countRows = await repository.query(
      `SELECT COUNT(*)::int AS total
         FROM manager_dashboards d,
              jsonb_array_elements(COALESCE(d.payload->'recentMembers', '[]'::jsonb)) AS item
        WHERE d.deleted_at IS NULL
          AND d.status = 'ACTIVE'
          AND ($1::text IS NULL OR item->>'name' ILIKE '%' || $1 || '%')`,
      [normalized],
    ) as Array<{ total: number }>;
    const rows = await repository.query(
      `SELECT item
         FROM manager_dashboards d,
              jsonb_array_elements(COALESCE(d.payload->'recentMembers', '[]'::jsonb)) AS item
        WHERE d.deleted_at IS NULL
          AND d.status = 'ACTIVE'
          AND ($1::text IS NULL OR item->>'name' ILIKE '%' || $1 || '%')
        ORDER BY item->>'joinDate' DESC NULLS LAST, item->>'id' ASC
        LIMIT $2 OFFSET $3`,
      [normalized, Math.max(1, limit), offset],
    ) as Array<{ item: ManagerCoreJsonObject }>;
    return { rows: rows.map((row: any) => row.item), total: Number(countRows[0]?.total ?? 0) };
  }

  /** Returns pending payments after applying the frontend search server-side and stable pagination. */
  async findPendingPayments(search: string | undefined, page: number, limit: number): Promise<{ rows: ManagerCoreJsonObject[]; total: number }> {
    return this.findArrayWidget('pendingPaymentsList', search, page, limit, 'pendingAmount');
  }

  /** Returns expiring memberships after applying the frontend search server-side and stable pagination. */
  async findExpiringMemberships(search: string | undefined, page: number, limit: number): Promise<{ rows: ManagerCoreJsonObject[]; total: number }> {
    return this.findArrayWidget('expiringMemberships', search, page, limit, 'expiryDate');
  }

  /** Performs a parameterized JSONB-array lookup for a list widget. */
  private async findArrayWidget(field: string, search: string | undefined, page: number, limit: number, orderField: string): Promise<{ rows: ManagerCoreJsonObject[]; total: number }> {
    const safeFields = new Set(['pendingPaymentsList', 'expiringMemberships']);
    const safeOrders = new Set(['pendingAmount', 'expiryDate']);
    if (!safeFields.has(field) || !safeOrders.has(orderField)) throw new ManagerCoreBusinessException('core.ERRORS.UNSUPPORTED_QUERY', 'CORE.QUERY.UNSUPPORTED', HttpStatus.BAD_REQUEST);
    const repository = await this.getRepository();
    const offset = (Math.max(1, page) - 1) * Math.max(1, limit);
    const normalized = search?.trim() || null;
    const countRows = await repository.query(
      `SELECT COUNT(*)::int AS total
         FROM manager_dashboards d,
              jsonb_array_elements(COALESCE(d.payload->'${field}', '[]'::jsonb)) AS item
        WHERE d.deleted_at IS NULL
          AND d.status = 'ACTIVE'
          AND ($1::text IS NULL OR item->>'name' ILIKE '%' || $1 || '%')`,
      [normalized],
    ) as Array<{ total: number }>;
    const rows = await repository.query(
      `SELECT item
         FROM manager_dashboards d,
              jsonb_array_elements(COALESCE(d.payload->'${field}', '[]'::jsonb)) AS item
        WHERE d.deleted_at IS NULL
          AND d.status = 'ACTIVE'
          AND ($1::text IS NULL OR item->>'name' ILIKE '%' || $1 || '%')
        ORDER BY item->>'${orderField}' DESC NULLS LAST, item->>'id' ASC
        LIMIT $2 OFFSET $3`,
      [normalized, Math.max(1, limit), offset],
    ) as Array<{ item: ManagerCoreJsonObject }>;
    return { rows: rows.map((row: any) => row.item), total: Number(countRows[0]?.total ?? 0) };
  }

  /** Returns the complete persisted snapshot payload for chart/KPI projections. */
  async findSnapshotPayload(): Promise<ManagerDashboardDomainData['payload']> { return (await this.findLatestSnapshot()).payload; }
}

export { ManagerDashboardRepository as DashboardRepository };
