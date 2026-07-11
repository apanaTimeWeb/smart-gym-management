import { Injectable } from '@nestjs/common';
import { TenantsRepository } from '../tenants.repository';

@Injectable()
export class FindTenantsService {
  constructor(private readonly repository: TenantsRepository) {}
  
  async execute(): Promise<any[]> {
    return await this.repository.findAll();
  }
  async findOne(id: string): Promise<any> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new Error('Tenant not found');
    return entity;
  }
}
