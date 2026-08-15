import { UpdateTenantDto } from '../dto/update-tenants.dto';
import { Injectable } from '@nestjs/common';
import { TenantsRepository } from '../tenants.repository';
import { TenantResponse } from '../tenants.interfaces';
import { TENANTS_MESSAGES } from '../tenants.constants';

@Injectable()
export class UpdateTenantsService {
  constructor(private readonly repository: TenantsRepository) {}
  
  async execute(id: string, dto: UpdateTenantDto): Promise<TenantResponse> {
    const data = await this.repository.update(id, dto);
    return {
      success: true,
      message: TENANTS_MESSAGES.UPDATED,
      data
    };
  }
}
