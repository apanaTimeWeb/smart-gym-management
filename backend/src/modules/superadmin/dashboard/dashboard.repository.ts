import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from '../gyms/entities/gyms.entity';

@Injectable()
export class DashboardRepository {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepo: Repository<Tenant>,
  ) {}

  async countTotalGyms(): Promise<number> {
    return this.tenantRepo.count({ where: { isDeleted: false } });
  }

  async countByStatus(status: string): Promise<number> {
    return this.tenantRepo.count({ where: { status: status as never, isDeleted: false } });
  }
}
