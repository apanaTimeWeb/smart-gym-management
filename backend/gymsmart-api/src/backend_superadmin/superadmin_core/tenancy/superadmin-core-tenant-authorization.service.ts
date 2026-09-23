// RESPONSIBILITY: Enforces tenant authorization before a tenant DataSource can be selected.
// FLOW: JWT actor + requested tenant -> SuperadminTenantAuthorizationRepository -> trusted tenant decision.
import { ForbiddenException, Injectable } from '@nestjs/common';
import { SuperadminTenantAuthorizationRepository } from '@/backend_superadmin/superadmin_core/tenancy/superadmin-core-tenant-authorization.repository';

@Injectable()
export class SuperadminTenantAuthorizationService {
  constructor(private readonly repository: SuperadminTenantAuthorizationRepository) {}

  /** Verifies that the actor is an active SUPERADMIN explicitly authorized for the tenant. */
  async authorize(actorId: string, tenantId: string): Promise<void> {
    const authorized = await this.repository.hasAuthorizedSuperadminMembership(actorId, tenantId);
    if (!authorized) throw new ForbiddenException({ error: 'FORBIDDEN', errorCode: 'TENANT.ACCESS.FORBIDDEN', message: { key: 'core.ERRORS.FORBIDDEN' } });
  }
}