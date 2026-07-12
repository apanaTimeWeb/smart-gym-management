import { CreateTenantDto } from '../dto/create-tenants.dto';
import { Injectable } from '@nestjs/common';
import { TenantsRepository } from '../tenants.repository';

@Injectable()
export class CreateTenantsService {
  constructor(private readonly repository: TenantsRepository) {}
  
  async execute(dto: CreateTenantDto): Promise<any> {
    return await this.repository.create(dto);
  }
}
