import { Injectable } from '@nestjs/common';
import { TenantsRepository } from '../tenants.repository';

@Injectable()
export class DeleteTenantsService {
  constructor(private readonly repository: TenantsRepository) {}
  
  async execute(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
