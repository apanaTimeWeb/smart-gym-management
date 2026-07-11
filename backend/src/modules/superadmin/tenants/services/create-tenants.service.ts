import { Injectable } from '@nestjs/common';
import { TenantsRepository } from '../tenants.repository';

@Injectable()
export class CreateTenantsService {
  constructor(private readonly repository: TenantsRepository) {}
  
  async execute(dto: any): Promise<any> {
    return await this.repository.create(dto);
  }
}
