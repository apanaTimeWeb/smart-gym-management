// RESPONSIBILITY: Orchestrates master tenant registry operations without owning HTTP concerns.
// FLOW: Controller/service -> registry service -> registry repository.
import { Injectable } from '@nestjs/common';
import { SuperadminTenantRegistryRepository } from '@/backend_superadmin/superadmin_core/tenancy/superadmin-core-tenant-registry.repository';

@Injectable()
export class SuperadminTenantRegistryService {
  constructor(private readonly repository: SuperadminTenantRegistryRepository) {}

  /** Returns tenant database metadata or fails with a machine-readable domain code. */
  async findTenantByIdOrThrow(id: string): Promise<{ id: string; databaseName: string }> {
    return this.repository.findByIdOrThrow(id);
  }
}
