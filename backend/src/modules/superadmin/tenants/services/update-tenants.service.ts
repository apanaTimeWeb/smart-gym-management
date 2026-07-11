import { Injectable } from '@nestjs/common';
import { TenantsRepository } from '../tenants.repository';

@Injectable()
export class UpdateTenantsService {
  constructor(private readonly repository: TenantsRepository) {}
  
  async execute(id: string, dto: UpdateTenantsDto): Promise<any> {
    return await this.repository.update(id, dto);
  }
}
