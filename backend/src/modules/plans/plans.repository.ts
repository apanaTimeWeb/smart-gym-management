import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '@/modules/plans/entities/plan.entity';

@Injectable()
export class PlansRepository {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepo: Repository<Plan>,
  ) {}

  async createPlan(data: Partial<Plan>): Promise<Plan> {
    const plan = this.planRepo.create(data as import('typeorm').DeepPartial<Plan>);
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
