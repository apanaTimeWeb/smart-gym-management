// RESPONSIBILITY: Authorizes a Superadmin actor against an active tenant membership before tenant database selection.
// FLOW: JWT actor -> master tenant membership -> trusted tenant context.
import { ForbiddenException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class TenantAuthorizationService {
  constructor(private readonly dataSource: DataSource) {}

  /** Verifies that the actor is an active SUPERADMIN explicitly authorized for the tenant. */
  async authorize(actorId: string, tenantId: string): Promise<void> {
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
         AND p.role = 'SUPERADMIN'`,
      [tenantId, actorId],
    ) as Array<{ id: string }>;
    if (!rows[0]) throw new ForbiddenException('Tenant access denied');
  }
}
