// RESPONSIBILITY: Completes the Gym provisioning lifecycle including Aadhaar encryption, tenant DB creation, admin credential persistence, and tenant readiness.
// FLOW: Provision DTO -> encryption -> tenant DB -> tenant migration -> master tenant/admin records -> domain response.
import { ConfigService } from '@nestjs/config';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PinoLogger } from 'nestjs-pino';
import { SuperadminCoreEventBusService } from '@/backend_superadmin/superadmin_core/superadmin_core_events/superadmin-core-event-bus.service';
import { EVENT_REGISTRY } from '@/backend_superadmin/superadmin_core/superadmin_core_events/superadmin-core-event-registry.constants';
import { SuperadminCoreEncryptionService } from '@/backend_superadmin/superadmin_core/superadmin_core_security/superadmin-core-encryption.service';
import { SuperadminCoreTenantDatabaseProvisionerService } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-database-provisioner.service';
import { SuperadminCoreTenantRegistryRepository } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-registry.repository';
import { SuperadminCoreUnitOfWorkService } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-unit-of-work.service';
import { SuperadminGymsRepository } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.repository';
import { SuperadminGymsMapper } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.mapper';
import { TenantStatus } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.constants';
import { SuperadminGymsResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_responses/superadmin-gyms-response.dto';
import * as bcrypt from 'bcrypt';
import type { SuperadminGymsProvisionInput } from '@/backend_superadmin/superadmin_modules/gyms/gyms_types/superadmin-gyms.interfaces';

/**
 * Primary Intent: Defines SuperadminGymsProvisionService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminGymsProvisionService {
  constructor(private readonly repository: SuperadminGymsRepository, private readonly encryption: SuperadminCoreEncryptionService, private readonly provisioner: SuperadminCoreTenantDatabaseProvisionerService, private readonly registry: SuperadminCoreTenantRegistryRepository, private readonly eventBus: SuperadminCoreEventBusService, private readonly unitOfWork: SuperadminCoreUnitOfWorkService, private readonly logger: PinoLogger, private readonly config: ConfigService) {}
/**
 * Primary Intent: Executes the provisionGym use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the provisionGym use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async provisionGym(input: SuperadminGymsProvisionInput): Promise<SuperadminGymsResponseDto> {
    const tenantId = randomUUID();
    const databaseName = await this.provisioner.provision(tenantId);
    try {
      const tenant = await this.createTenant(tenantId, databaseName, input);
      this.emitProvisioned(tenant.id, tenant.plan);
      return SuperadminGymsMapper.toResponse(SuperadminGymsMapper.toDomain(tenant), this.config.getOrThrow<string>('app.defaultCurrency'));
    } catch {
      await this.rollbackProvisioning(tenantId, databaseName);
      throw new InternalServerErrorException({ errorCode: 'GYMS.PROVISION.FAILED', message: { key: 'gyms.ERRORS.PROVISION_FAILED' } });
    }
  }

  /**
 * Primary Intent: Executes the `createTenant` responsibility owned by this superadmin-gyms-provision.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the createTenant use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async createTenant(tenantId: string, databaseName: string, input: SuperadminGymsProvisionInput) {
    const normalized = this.normalizeInput(input);
    return this.unitOfWork.run(async () => {
      const tenant = await this.repository.createGyms(this.toTenantInput(tenantId, databaseName, normalized));
      await this.registry.syncAdminAccount(tenant.id, normalized.adminEmail, await bcrypt.hash(input.temporaryPassword, 12));
      return tenant;
    });
  }

  /**
 * Primary Intent: Executes the `normalizeInput` responsibility owned by this superadmin-gyms-provision.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the normalizeInput use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private normalizeInput(input: SuperadminGymsProvisionInput): SuperadminGymsProvisionInput {
    return { ...input, gymName: input.gymName.trim(), ownerName: input.ownerName.trim(), adminEmail: input.adminEmail.trim().toLowerCase(), phone: input.phone.trim(), plan: input.plan.trim(), planId: input.planId?.trim(), aadharNumber: input.aadharNumber?.trim() };
  }

  /**
 * Primary Intent: Executes the `toTenantInput` responsibility owned by this superadmin-gyms-provision.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the toTenantInput use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private toTenantInput(tenantId: string, databaseName: string, input: SuperadminGymsProvisionInput): Record<string, unknown> {
    const plan = input.planId || input.plan;
    return { id: tenantId, name: input.gymName, ownerName: input.ownerName, adminEmail: input.adminEmail, phone: input.phone, status: input.initialStatus ?? TenantStatus.TRIAL, plan, memberCount: 0, monthlyRevenue: 0, databaseVersion: 'v1', city: '', state: '', country: 'IN', gstin: '', trialEndsAt: null, lastLoginAt: null, lastActiveAt: null, staffCount: 0, databaseName, aadharNumberEncrypted: input.aadharNumber ? this.encryption.encrypt(input.aadharNumber) : null, subscriptionHistory: [{ action: 'PROVISIONED', at: new Date().toISOString(), status: input.initialStatus ?? TenantStatus.TRIAL, plan }], usageStats: {}, acquisitionSource: input.acquisitionSource?.trim() || 'UNKNOWN', acquisitionCostMinor: input.acquisitionCostMinor ?? 0, taxRateBasisPoints: input.taxRateBasisPoints ?? 0 };
  }

  /**
 * Primary Intent: Executes the `emitProvisioned` responsibility owned by this superadmin-gyms-provision.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the emitProvisioned use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private emitProvisioned(tenantId: string, plan: string): void {
    try { this.eventBus.emit(EVENT_REGISTRY.SUPERADMIN_TENANT_PROVISIONED, { tenantId, plan }); }
    /**
     * Primary Intent: Executes the catch use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    catch (error) { this.logger.error({ err: error, tenantId }, 'Tenant provisioning event dispatch failed after commit'); }
  }

  /**
 * Primary Intent: Executes the `rollbackProvisioning` responsibility owned by this superadmin-gyms-provision.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the rollbackProvisioning use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async rollbackProvisioning(tenantId: string, databaseName: string): Promise<void> {
    await this.repository.deleteGymsById(tenantId).catch(() => undefined);
    await this.provisioner.drop(databaseName).catch(() => undefined);
  }
}
