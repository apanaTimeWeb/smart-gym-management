import { Injectable } from '@nestjs/common';
import { TenantsRepository } from '../tenants.repository';
import { TenantResponse } from '../tenants.interfaces';
import { TENANTS_MESSAGES, TENANTS_ERRORS } from '../tenants.constants';

@Injectable()
export class FindTenantsService {
  constructor(private readonly repository: TenantsRepository) {}
  
  async execute(): Promise<TenantResponse> {
    const data = await this.repository.findAll();
    return {
      success: true,
      message: TENANTS_MESSAGES.FETCHED,
      data
    };
  }
  async findOne(id: string): Promise<TenantResponse> {
    const data = await this.repository.findById(id);
    if (!data) throw new Error(TENANTS_ERRORS.NOT_FOUND);
    return {
      success: true,
      message: TENANTS_MESSAGES.FETCHED,
      data
    };
  }
}
