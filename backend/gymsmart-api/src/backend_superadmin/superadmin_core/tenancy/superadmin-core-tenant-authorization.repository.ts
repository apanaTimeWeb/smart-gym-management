// RESPONSIBILITY: Owns master-database tenant membership queries used by the tenant authorization boundary.
// FLOW: SuperadminTenantAuthorizationService -> SuperadminTenantAuthorizationRepository -> master PostgreSQL -> authorized tenant result.
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';

@Injectable()
export class SuperadminTenantAuthorizationRepository {
  constructor(private readonly dataSource: DataSource) {}

  /** Returns whether an actor has active SUPERADMIN membership for the requested tenant. */
  async hasAuthorizedSuperadminMembership(actorId: string, tenantId: string): Promise<boolean> {
    const rows = await this.dataSource.query(
      `SELECT t.id
       FROM tenants t
       INNER JOIN superadmin_tenant_memberships m ON m.tenant_id = t.id
       INNER JOIN superadmin_profiles p ON p.id = m.actor_id
       WHERE t.id = $1
         AND t.deleted_at IS NULL
         AND m.actor_id = $2
         AND m.deleted_at IS NULL
         AND p.deleted_at IS NULL
         AND p.role = $3
       LIMIT 1`,
      [tenantId, actorId, SuperadminRole.SUPERADMIN],
    ) as Array<{ id: string }>;
    return rows.length > 0;
  }
}