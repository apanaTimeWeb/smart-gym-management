// RESPONSIBILITY: Completes the Gym provisioning lifecycle including Aadhaar encryption, tenant DB creation, admin credential persistence, and tenant readiness.
// FLOW: Provision DTO -> encryption -> tenant DB -> tenant migration -> master tenant/admin records -> domain response.
import { ConfigService } from '@nestjs/config';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PinoLogger } from 'nestjs-pino';
import { SuperadminEventBusService } from '@/backend_superadmin/superadmin_core/events/superadmin-core-event-bus.service';
import { EVENT_REGISTRY } from '@/backend_superadmin/superadmin_core/events/superadmin-core-event-registry.constants';
import { SuperadminEncryptionService } from '@/backend_superadmin/superadmin_core/security/superadmin-core-encryption.service';
import { SuperadminTenantDatabaseProvisionerService } from '@/backend_superadmin/superadmin_core/tenancy/superadmin-core-tenant-database-provisioner.service';
import { SuperadminTenantRegistryRepository } from '@/backend_superadmin/superadmin_core/tenancy/superadmin-core-tenant-registry.repository';
import { SuperadminUnitOfWorkService } from '@/backend_superadmin/superadmin_core/database/superadmin-core-unit-of-work.service';
import { SuperadminGymsRepository } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.repository';
import { SuperadminGymsMapper } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.mapper';
import { GymsStatus } from '@/backend_superadmin/superadmin_modules/gyms/dtos/superadmin-gyms-update.dto';
import { SuperadminGymsResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/responses/superadmin-gyms-response.dto';
import { SuperadminGymsBusinessException } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.exceptions';
import * as bcrypt from 'bcrypt';
import type { SuperadminGymsProvisionInput } from '@/backend_superadmin/superadmin_modules/gyms/types/superadmin-gyms.interfaces';

@Injectable()
export class SuperadminGymsProvisionService {
  constructor(private readonly repository: SuperadminGymsRepository, private readonly encryption: SuperadminEncryptionService, private readonly provisioner: SuperadminTenantDatabaseProvisionerService, private readonly registry: SuperadminTenantRegistryRepository, private readonly eventBus: SuperadminEventBusService, private readonly unitOfWork: SuperadminUnitOfWorkService, private readonly logger: PinoLogger, private readonly config: ConfigService) {}

  /** Orchestrates tenant provisioning while keeping each step isolated. */
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

  /** Creates the tenant record and administrator credentials atomically. */
  private async createTenant(tenantId: string, databaseName: string, input: SuperadminGymsProvisionInput) {
    const normalized = this.normalizeInput(input);
    return this.unitOfWork.run(async () => {
      const tenant = await this.repository.createGyms(this.toTenantInput(tenantId, databaseName, normalized));
      await this.registry.syncAdminAccount(tenant.id, normalized.adminEmail, await bcrypt.hash(input.temporaryPassword, 12));
      return tenant;
    });
  }

  /** Normalizes incoming tenant identity fields once. */
  private normalizeInput(input: SuperadminGymsProvisionInput): SuperadminGymsProvisionInput {
    return { ...input, gymName: input.gymName.trim(), ownerName: input.ownerName.trim(), adminEmail: input.adminEmail.trim().toLowerCase(), phone: input.phone.trim(), plan: input.plan.trim(), planId: input.planId?.trim(), aadharNumber: input.aadharNumber?.trim() };
  }

  /** Builds the persistence command without leaking HTTP DTO semantics further down. */
  private toTenantInput(tenantId: string, databaseName: string, input: SuperadminGymsProvisionInput): Record<string, unknown> {
    const plan = input.planId || input.plan;
    return { id: tenantId, name: input.gymName, ownerName: input.ownerName, adminEmail: input.adminEmail, phone: input.phone, status: input.initialStatus ?? GymsStatus.TRIAL, plan, memberCount: 0, monthlyRevenue: 0, databaseVersion: 'v1', city: '', state: '', country: 'IN', gstin: '', trialEndsAt: null, lastLoginAt: null, lastActiveAt: null, staffCount: 0, databaseName, aadharNumberEncrypted: input.aadharNumber ? this.encryption.encrypt(input.aadharNumber) : null, subscriptionHistory: [{ action: 'PROVISIONED', at: new Date().toISOString(), status: input.initialStatus ?? GymsStatus.TRIAL, plan }], usageStats: {}, acquisitionSource: input.acquisitionSource?.trim() || 'UNKNOWN', acquisitionCostMinor: input.acquisitionCostMinor ?? 0, taxRateBasisPoints: input.taxRateBasisPoints ?? 0 };
  }

  /** Emits the provisioning event only after transaction commit. */
  private emitProvisioned(tenantId: string, plan: string): void {
    try { this.eventBus.emit(EVENT_REGISTRY.SUPERADMIN_TENANT_PROVISIONED, { tenantId, plan }); }
    catch (error) { this.logger.error({ err: error, tenantId }, 'Tenant provisioning event dispatch failed after commit'); }
  }

  /** Releases partially provisioned tenant state without hiding the original lifecycle failure. */
  private async rollbackProvisioning(tenantId: string, databaseName: string): Promise<void> {
    await this.repository.deleteGymsById(tenantId).catch(() => undefined);
    await this.provisioner.drop(databaseName).catch(() => undefined);
  }
}
