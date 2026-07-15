import { Injectable } from '@nestjs/common';
import { TenantsRepository } from '../tenants.repository';
import { TenantResponse } from '../tenants.interfaces';
import { TENANTS_MESSAGES } from '../tenants.constants';

@Injectable()
export class DeleteTenantsService {
  constructor(private readonly repository: TenantsRepository) {}
  
  async execute(id: string): Promise<TenantResponse> {
    await this.repository.softDelete(id);
    return {
      success: true,
      message: TENANTS_MESSAGES.DELETED,
      data: null
    };
  }
}
