// RESPONSIBILITY: Completes the Gym provisioning lifecycle including Aadhaar encryption, tenant DB creation, admin credential persistence, and tenant readiness.
// FLOW: Provision DTO -> encryption -> tenant DB -> tenant migration -> master tenant/admin records -> domain response.
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';
import { EncryptionService } from '@/core/security/encryption.service';
import { TenantDatabaseProvisionerService } from '@/core/tenancy/tenant-database-provisioner.service';
import { TenantRegistryRepository } from '@/core/tenancy/tenant-registry.repository';
import { GymsRepository } from '@/modules/superadmin/gyms/gyms.repository';
import { GymsMapper } from '@/modules/superadmin/gyms/gyms.mapper';
import { GymsStatus } from '@/modules/superadmin/gyms/dtos/gyms-create.dto';
import type { GymsDomainModel } from '@/modules/superadmin/gyms/types/gyms.interfaces';
import type { GymsProvisionDto } from '@/modules/superadmin/gyms/dtos/gyms-provision.dto';

@Injectable()
export class GymsProvisionService {
  constructor(private readonly repository: GymsRepository, private readonly encryption: EncryptionService, private readonly provisioner: TenantDatabaseProvisionerService, private readonly registry: TenantRegistryRepository) {}

  /** Provisions a tenant and returns only the frozen frontend-safe Tenant response fields. */
  async provisionGym(input: GymsProvisionDto): Promise<GymsDomainModel> {
    const tenantId = randomUUID();
    const databaseName = await this.provisioner.provision(tenantId);
    try {
      const tenant = await this.repository.createGyms({
        name: input.gymName.trim(), ownerName: input.ownerName.trim(), adminEmail: input.adminEmail.trim().toLowerCase(), phone: input.phone.trim(),
        status: input.initialStatus ?? GymsStatus.TRIAL, plan: input.plan.trim(), memberCount: 0, monthlyRevenue: 0, databaseVersion: 'v1', city: '', state: '', country: 'IN', gstin: '', trialEndsAt: null, lastLoginAt: null, lastActiveAt: null, staffCount: 0, databaseName, aadharNumberEncrypted: this.encryption.encrypt(input.aadharNumber), subscriptionHistory: [], usageStats: {},
      });
      const passwordHash = await bcrypt.hash(input.temporaryPassword, 12);
      await this.registry.createAdminAccount(tenant.id, tenant.adminEmail, passwordHash);
      return GymsMapper.toDomain(tenant);
    } catch (error) {
      await this.provisioner.drop(databaseName);
      throw new InternalServerErrorException(error instanceof Error ? error.message : 'Tenant provisioning failed');
    }
  }
}
