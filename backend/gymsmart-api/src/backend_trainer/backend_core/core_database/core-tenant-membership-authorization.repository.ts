// RESPONSIBILITY: Reads active tenant memberships from the master database before tenant DataSource selection.
// FLOW: CoreTenantAuthorizationGuard → master membership query → trusted tenant context.

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import type { DataSource } from 'typeorm';
import { CoreTenantMembershipEntity } from '@/backend_trainer/backend_core/core_database/core-tenant-membership.entity';


/**
 * Intent: Defines the CoreTenantMembershipAuthorizationRepository boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class CoreTenantMembershipAuthorizationRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  /** Returns an active membership linked to an active, non-deleted tenant. */
  /**
 * @description Executes findActiveMembership inside the owning backend service/repository boundary without exposing ORM details.
 * @param userId - Input for findActiveMembership.
 * @param tenantId - Input for findActiveMembership.
 * @returns {Promise<CoreTenantMembershipEntity | null>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findActiveMembership(userId: string, tenantId: string): Promise<CoreTenantMembershipEntity | null> {
    return this.dataSource
      .getRepository(CoreTenantMembershipEntity)
      .createQueryBuilder('membership')
      .innerJoin('core_tenants', 'tenant', 'tenant.id = membership.tenant_id')
      .where('membership.user_id = :userId', { userId })
      .andWhere('membership.tenant_id = :tenantId', { tenantId })
      .andWhere('membership.deleted_at IS NULL')
      .andWhere('tenant.is_active = true')
      .andWhere('tenant.deleted_at IS NULL')
      .getOne();
  }
  /** Returns the sole active tenant membership when the actor belongs to exactly one tenant. */
  /**
 * @description Executes findSingleActiveMembership inside the owning backend service/repository boundary without exposing ORM details.
 * @param userId - Input for findSingleActiveMembership.
 * @returns {Promise<CoreTenantMembershipEntity | null>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findSingleActiveMembership(userId: string): Promise<CoreTenantMembershipEntity | null> {
    const rows = await this.dataSource
      .getRepository(CoreTenantMembershipEntity)
      .createQueryBuilder('membership')
      .innerJoin('core_tenants', 'tenant', 'tenant.id = membership.tenant_id')
      .where('membership.user_id = :userId', { userId })
      .andWhere('membership.deleted_at IS NULL')
      .andWhere('tenant.is_active = true')
      .andWhere('tenant.deleted_at IS NULL')
      .limit(2)
      .getMany();
    return rows.length === 1 ? rows[0]! : null;
  }

}
