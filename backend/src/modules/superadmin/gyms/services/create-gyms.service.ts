import { Injectable, Logger } from '@nestjs/common';
import { GymsRepository } from '../gyms.repository';
import { ProvisionTenantService } from '../../tenants/services/provision-tenant.service';

@Injectable()
export class CreateGymsService {
  private readonly logger = new Logger(CreateGymsService.name);

  constructor(
    private readonly repository: GymsRepository,
    private readonly provisionTenantService: ProvisionTenantService,
  ) {}
  
  async execute(dto: any): Promise<any> {
    this.logger.log('Creating new gym (tenant)...');
    const gym = await this.repository.create(dto);
    
    // Trigger tenant provisioning (database creation, migrations, etc.)
    try {
      await this.provisionTenantService.provisionNewTenant(gym.id);
      gym.status = 'ACTIVE';
    } catch (err) {
      this.logger.error('Failed to provision tenant DB', err);
      gym.status = 'SUSPENDED';
    }
    
    return { success: true, data: gym };
  }
}
