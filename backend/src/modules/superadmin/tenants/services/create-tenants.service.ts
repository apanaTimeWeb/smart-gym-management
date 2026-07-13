import { CreateTenantDto } from '../dto/create-tenants.dto';
import { Injectable } from '@nestjs/common';
import { TenantsRepository } from '../tenants.repository';
import { TenantResponse } from '../tenants.interfaces';
import { TENANTS_MESSAGES } from '../tenants.constants';

@Injectable()
export class CreateTenantsService {
  constructor(private readonly repository: TenantsRepository) {}
  
  async execute(dto: CreateTenantDto): Promise<TenantResponse> {
    const data = await this.repository.create(dto);
    return {
      success: true,
      message: TENANTS_MESSAGES.CREATED,
      data
    };
  }
}
