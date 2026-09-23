// RESPONSIBILITY: Enforces tenant authorization before a tenant DataSource can be selected.
// FLOW: JWT actor + requested tenant -> TenantAuthorizationRepository -> trusted tenant decision.
import { ForbiddenException, Injectable } from '@nestjs/common';
import { TenantAuthorizationRepository } from '@/backend_superadmin/core/tenancy/tenant-authorization.repository';

@Injectable()
export class TenantAuthorizationService {
  constructor(private readonly repository: TenantAuthorizationRepository) {}

  /** Verifies that the actor is an active SUPERADMIN explicitly authorized for the tenant. */
  async authorize(actorId: string, tenantId: string): Promise<void> {
    const authorized = await this.repository.hasAuthorizedSuperadminMembership(actorId, tenantId);
    if (!authorized) throw new ForbiddenException({ error: 'FORBIDDEN', errorCode: 'TENANT.ACCESS.FORBIDDEN', message: { key: 'core.ERRORS.FORBIDDEN' } });
  }
}