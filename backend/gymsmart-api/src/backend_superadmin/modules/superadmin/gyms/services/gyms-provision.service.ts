// RESPONSIBILITY: Completes the Gym provisioning lifecycle including Aadhaar encryption, tenant DB creation, admin credential persistence, and tenant readiness.
// FLOW: Provision DTO -> encryption -> tenant DB -> tenant migration -> master tenant/admin records -> domain response.
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EncryptionService } from '@/backend_superadmin/core/security/encryption.service';
import { TenantDatabaseProvisionerService } from '@/backend_superadmin/core/tenancy/tenant-database-provisioner.service';
import { TenantRegistryRepository } from '@/backend_superadmin/core/tenancy/tenant-registry.repository';
import { GymsRepository } from '@/backend_superadmin/modules/superadmin/gyms/gyms.repository';
import { FeaturesRepository } from '@/backend_superadmin/modules/superadmin/features/features.repository';
import { GymsMapper } from '@/backend_superadmin/modules/superadmin/gyms/gyms.mapper';
import { GymsStatus } from '@/backend_superadmin/modules/superadmin/gyms/dtos/gyms-update.dto';
import { GymsResponseDto } from '@/backend_superadmin/modules/superadmin/gyms/responses/gyms-response.dto';
import type { GymsProvisionInput } from '@/backend_superadmin/modules/superadmin/gyms/types/gyms.interfaces';

@Injectable()
export class GymsProvisionService {
  constructor(
    private readonly repository: GymsRepository,
    private readonly encryption: EncryptionService,
    private readonly provisioner: TenantDatabaseProvisionerService,
    private readonly registry: TenantRegistryRepository,
    private readonly featuresRepository: FeaturesRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * Orchestrates the complex multi-step tenant provisioning workflow.
   * Emits an integration event so other bounded contexts can react to the new tenant.
   */
  async provisionGym(input: GymsProvisionInput): Promise<GymsResponseDto> {
    const tenantId = randomUUID();
    const databaseName = await this.provisioner.provision(tenantId);
    try {
      const tenant = await this.repository.createGyms({
        name: input.gymName.trim(), ownerName: input.ownerName.trim(), adminEmail: input.adminEmail.trim().toLowerCase(), phone: input.phone.trim(),
        status: input.initialStatus ?? GymsStatus.TRIAL, plan: input.plan.trim(), memberCount: 0, monthlyRevenue: 0, databaseVersion: 'v1', city: '', state: '', country: 'IN', gstin: '', trialEndsAt: null, lastLoginAt: null, lastActiveAt: null, staffCount: 0, databaseName, aadharNumberEncrypted: this.encryption.encrypt(input.aadharNumber), subscriptionHistory: [], usageStats: {},
      });
      const passwordHash = await bcrypt.hash(input.temporaryPassword, 12);
      await this.registry.createAdminAccount(tenant.id, tenant.adminEmail, passwordHash);

      // The event listener doesn't need the decrypted secrets.
      this.eventEmitter.emit('superadmin.tenant.provisioned', { tenantId: tenant.id, plan: tenant.plan });

      return GymsMapper.toResponse(GymsMapper.toDomain(tenant));
    } catch (error) {
      await this.provisioner.drop(databaseName);
      throw new InternalServerErrorException(error instanceof Error ? error.message : 'Tenant provisioning failed');
    }
  }
}
