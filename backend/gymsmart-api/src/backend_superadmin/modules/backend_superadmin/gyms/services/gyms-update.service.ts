// RESPONSIBILITY: Executes partial update business flow for the gyms feature.
// FLOW: CommandController -> GymsUpdateService -> named repository mutation -> mapper.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { GymsRepository } from '@/backend_superadmin/modules/backend_superadmin/gyms/gyms.repository';
import { GymsMapper } from '@/backend_superadmin/modules/backend_superadmin/gyms/gyms.mapper';
import { TenantRegistryRepository } from '@/backend_superadmin/core/tenancy/tenant-registry.repository';
import { UnitOfWorkService } from '@/backend_superadmin/core/database/unit-of-work.service';
import { GymsResponseDto } from '@/backend_superadmin/modules/backend_superadmin/gyms/responses/gyms-response.dto';
import * as bcrypt from 'bcrypt';
import type { GymsUpdateInput } from '@/backend_superadmin/modules/backend_superadmin/gyms/types/gyms.interfaces';
@Injectable()
export class GymsUpdateService {
  constructor(private readonly repository: GymsRepository, private readonly registry: TenantRegistryRepository, private readonly unitOfWork: UnitOfWorkService, private readonly config: ConfigService) {}
  /** Updates a gyms record by UUID. */
  async updateGyms(id: string, input: GymsUpdateInput): Promise<GymsResponseDto> {
    return this.unitOfWork.run(async () => {
      const { temporaryPassword, ...tenantInput } = input;
      const current = await this.repository.findByIdOrThrow(id);
      const updated = await this.repository.updateGymsById(id, tenantInput);
      if (temporaryPassword?.trim()) {
        await this.registry.syncAdminAccount(updated.id, updated.adminEmail, await bcrypt.hash(temporaryPassword.trim(), 12));
      } else if (current.adminEmail !== updated.adminEmail) {
        await this.registry.syncAdminAccount(updated.id, updated.adminEmail);
      }
      return GymsMapper.toResponse(GymsMapper.toDomain(updated), this.config.getOrThrow<string>('app.defaultCurrency'));
    });
  }
}