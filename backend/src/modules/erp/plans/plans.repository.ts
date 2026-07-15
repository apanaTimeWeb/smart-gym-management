import { Injectable, Inject } from '@nestjs/common';

import { Repository, DataSource  } from 'typeorm';
import { Plan } from '@/modules/erp/plans/entities/plan.entity';

@Injectable()
export class PlansRepository {
    public readonly planRepository: Repository<Plan>;

    public readonly planRepo: Repository<Plan>;

  constructor(
    @Inject('TENANT_CONNECTION') private readonly dataSource: DataSource,
  ) {
    this.planRepo = this.dataSource.getRepository(Plan);
  }

  async createPlan(data: Partial<Plan>): Promise<Plan> {
    const plan = this.planRepo.create(
      data as import('typeorm').DeepPartial<Plan>,
    );
    return this.planRepo.save(plan);
  }

  async findPlans(): Promise<Plan[]> {
    return this.planRepo.find({
      where: { isActive: true },
      order: { price1Month: 'ASC' },
    });
  }

  async findPlanById(id: string): Promise<Plan | null> {
    return this.planRepo.findOne({ where: { id } });
  }

  async findPlanByTier(tier: string): Promise<Plan | null> {
    return this.planRepo.findOne({ where: { tier: tier as any } });
  }

  async updatePlan(id: string, data: Partial<Plan>): Promise<Plan> {
    await this.planRepo.update(id, data);
    return this.findPlanById(id) as Promise<Plan>;
  }
}
