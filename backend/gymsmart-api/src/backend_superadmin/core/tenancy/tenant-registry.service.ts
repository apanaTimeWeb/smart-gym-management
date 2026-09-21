// RESPONSIBILITY: Orchestrates master tenant registry operations without owning HTTP concerns.
// FLOW: Controller/service -> registry service -> registry repository.
import { Injectable, NotFoundException } from '@nestjs/common';
import { TenantRegistryRepository } from '@/backend_superadmin/core/tenancy/tenant-registry.repository';
@Injectable()
export class TenantRegistryService {
  constructor(private readonly repository: TenantRegistryRepository) {}
  /** Returns tenant database metadata or throws. */
  async findTenantByIdOrThrow(id: string): Promise<{ id: string; databaseName: string }> { const tenant = await this.repository.findById(id); if (!tenant) throw new NotFoundException('Tenant not found'); return tenant; }
}
