// RESPONSIBILITY: Resolves a trusted tenant database from request-scoped tenant context.
// FLOW: RequestContext → MasterTenantRepository → TenantContextService → TenantDataSourceManager.
import { ForbiddenException, Injectable } from '@nestjs/common';

import { RequestContextService } from '@/backend_landing/core/context/request-context.service';

import { MasterTenantRepository } from '@/backend_landing/core/tenant/master-tenant.repository';

import { TenantDataSourceManagerService } from '@/backend_landing/core/tenant/tenant-data-source-manager.service';

import type { DataSource } from 'typeorm';


@Injectable()
export class TenantContextService {
  constructor(
    private readonly requestContext: RequestContextService,
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
