// RESPONSIBILITY: Owns master-database tenant lookup, provisioning, and test-tenant lifecycle persistence.
// FLOW: Tenant infrastructure â†’ LandingMasterTenantRepository â†’ master tenants table.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IsNull, Repository } from 'typeorm';

import { LandingMasterTenantEntity, LandingMasterTenantStatus } from '@/backend_landing/landing_core/landing_tenant/landing-master-tenant.entity';


/**
 * Intent: Defines the LandingMasterTenantRepository class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Injectable()
/**
 * Intent: Defines the landing master tenant repository boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingMasterTenantRepository {
  
  /**
   * Intent: Preserve the single responsibility of landing-master-tenant.repository.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(
    @InjectRepository(LandingMasterTenantEntity)
    private readonly repository: Repository<LandingMasterTenantEntity>,
  ) {}

  /** @description Finds an active tenant by UUID. @param tenantId - Trusted UUID from request resolution. @returns Active tenant or null. */
  
  /**
   * Intent: Preserve the single responsibility of landing-master-tenant.repository.findActiveById at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async findActiveById(tenantId: string): Promise<LandingMasterTenantEntity | null> {
    return this.repository.findOne({ where: { id: tenantId, status: LandingMasterTenantStatus.ACTIVE, deletedAt: IsNull() } });
  }

  /** @description Finds a tenant by UUID including suspended or soft-deleted registry state for controlled cleanup. @param tenantId - Tenant UUID. @returns Tenant or null. */
  
  /**
   * Intent: Preserve the single responsibility of landing-master-tenant.repository.findById at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async findById(tenantId: string): Promise<LandingMasterTenantEntity | null> {
    return this.repository.findOne({ where: { id: tenantId } });
  }

  /** @description Finds an active tenant by slug. @param slug - Public tenant slug. @returns Active tenant or null. */
  
  /**
   * Intent: Preserve the single responsibility of landing-master-tenant.repository.findActiveBySlug at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async findActiveBySlug(slug: string): Promise<LandingMasterTenantEntity | null> {
    return this.repository.findOne({ where: { slug, status: LandingMasterTenantStatus.ACTIVE, deletedAt: IsNull() } });
  }

  /** @description Creates the deterministic tenant registry row. @param input - Tenant registration values. @returns Persisted tenant. */
  
  /**
   * Intent: Preserve the single responsibility of landing-master-tenant.repository.createTenant at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async createTenant(input: {
    id: string;
    slug: string;
    displayName: string;
    databaseName: string;
    status: LandingMasterTenantStatus;
  }): Promise<LandingMasterTenantEntity> {
    const entity = this.repository.create(input);
    return this.repository.save(entity);
  }

  /** @description Soft-deletes a disposable tenant registry row without issuing a hard delete. @param tenantId - Tenant UUID. @returns Resolves after the registry row is marked deleted. */
  
  /**
   * Intent: Preserve the single responsibility of landing-master-tenant.repository.softDeleteTenant at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async softDeleteTenant(tenantId: string): Promise<void> {
    await this.repository.softDelete(tenantId);
  }
}
