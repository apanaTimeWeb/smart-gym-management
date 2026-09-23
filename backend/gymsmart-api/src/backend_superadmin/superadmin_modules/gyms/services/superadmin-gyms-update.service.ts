// RESPONSIBILITY: Executes partial update business flow for the gyms feature.
// FLOW: CommandController -> SuperadminGymsUpdateService -> named repository mutation -> mapper.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { SuperadminGymsRepository } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.repository';
import { SuperadminGymsMapper } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.mapper';
import { SuperadminTenantRegistryRepository } from '@/backend_superadmin/superadmin_core/tenancy/superadmin-core-tenant-registry.repository';
import { SuperadminUnitOfWorkService } from '@/backend_superadmin/superadmin_core/database/superadmin-core-unit-of-work.service';
import { SuperadminGymsResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/responses/superadmin-gyms-response.dto';
import * as bcrypt from 'bcrypt';
import type { SuperadminGymsUpdateInput } from '@/backend_superadmin/superadmin_modules/gyms/types/superadmin-gyms.interfaces';
@Injectable()
export class SuperadminGymsUpdateService {
  constructor(private readonly repository: SuperadminGymsRepository, private readonly registry: SuperadminTenantRegistryRepository, private readonly unitOfWork: SuperadminUnitOfWorkService, private readonly config: ConfigService) {}
  /** Updates a gyms record by UUID. */
  async updateGyms(id: string, input: SuperadminGymsUpdateInput): Promise<SuperadminGymsResponseDto> {
    return this.unitOfWork.run(async () => {
      const { temporaryPassword, ...tenantInput } = input;
      const current = await this.repository.findByIdOrThrow(id);
      const updated = await this.repository.updateGymsById(id, tenantInput);
      if (temporaryPassword?.trim()) {
        await this.registry.syncAdminAccount(updated.id, updated.adminEmail, await bcrypt.hash(temporaryPassword.trim(), 12));
      } else if (current.adminEmail !== updated.adminEmail) {
        await this.registry.syncAdminAccount(updated.id, updated.adminEmail);
      }
      return SuperadminGymsMapper.toResponse(SuperadminGymsMapper.toDomain(updated), this.config.getOrThrow<string>('app.defaultCurrency'));
    });
  }
}