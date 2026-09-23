// RESPONSIBILITY: Orchestrates master tenant registry operations without owning HTTP concerns.
// FLOW: Controller/service -> registry service -> registry repository.
import { Injectable } from '@nestjs/common';
import { TenantRegistryRepository } from '@/backend_superadmin/core/tenancy/tenant-registry.repository';

@Injectable()
export class TenantRegistryService {
  constructor(private readonly repository: TenantRegistryRepository) {}

  /** Returns tenant database metadata or fails with a machine-readable domain code. */
  async findTenantByIdOrThrow(id: string): Promise<{ id: string; databaseName: string }> {
    return this.repository.findByIdOrThrow(id);
  }
}
