// RESPONSIBILITY: Resolves a trusted tenant database from request-scoped tenant context.
// FLOW: RequestContext â†’ MasterTenantRepository â†’ TenantContextService â†’ TenantDataSourceManager.
import { ForbiddenException, Injectable } from '@nestjs/common';

import { AdminCoreRequestContextService as CoreRequestContextService } from '@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service';

import { MasterTenantRepository } from '@/backend_landing/landing_core/landing_tenant/master-tenant.repository';

import { TenantDataSourceManagerService } from '@/backend_landing/landing_core/landing_tenant/tenant-data-source-manager.service';

import { DataSource } from 'typeorm';


@Injectable()
export class TenantContextService {
  constructor(
    private readonly requestContext: CoreRequestContextService,
    private readonly tenantRepository: MasterTenantRepository,
    private readonly dataSourceManager: TenantDataSourceManagerService,
  ) {}

  /** @description Resolves the request's trusted tenant and returns its DataSource. @returns Initialized tenant DataSource. @throws ForbiddenException when tenant context is absent or unauthorized. */
  async resolveTenantDataSource(): Promise<DataSource> {
    const tenantId = this.requestContext.get().tenantId;
    if (!tenantId) throw new ForbiddenException('A trusted tenant context is required.');
    const tenant = await this.tenantRepository.findActiveById(tenantId);
    if (!tenant) throw new ForbiddenException('Tenant access is not authorized.');
    return this.dataSourceManager.getOrCreate(tenant);
  }
}
