// RESPONSIBILITY: Owns master-database tenant lookup and idempotent tenant registry writes.
// FLOW: Tenant services → MasterTenantRepository → master tenants table.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MasterTenantEntity, MasterTenantStatus } from '@/core/tenant/master-tenant.entity';

@Injectable()
export class MasterTenantRepository {
  constructor(
    @InjectRepository(MasterTenantEntity)
    private readonly repository: Repository<MasterTenantEntity>,
  ) {}

  /** @description Finds an active tenant by UUID. @param tenantId - Trusted UUID from request resolution. @returns Active tenant or null. */
  async findActiveById(tenantId: string): Promise<MasterTenantEntity | null> {
    return this.repository.findOne({ where: { id: tenantId, status: MasterTenantStatus.ACTIVE } });
  }

  /** @description Finds an active tenant by slug. @param slug - Public tenant slug. @returns Active tenant or null. */
  async findActiveBySlug(slug: string): Promise<MasterTenantEntity | null> {
    return this.repository.findOne({ where: { slug, status: MasterTenantStatus.ACTIVE } });
  }

  /** @description Creates the deterministic tenant registry row. @param input - Tenant registration values. @returns Persisted tenant. */
  async createTenant(input: {
    id: string;
    slug: string;
    displayName: string;
    databaseName: string;
    status: MasterTenantStatus;
  }): Promise<MasterTenantEntity> {
    const entity = this.repository.create(input);
    return this.repository.save(entity);
  }
}
