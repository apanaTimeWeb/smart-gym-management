import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DUMMY_SUBSCRIPTION_PLANS } from '../../superadmin.constants';
import { CreatePlanDto } from '../dto/create-plans.dto';
import { UpdatePlanDto } from '../dto/update-plans.dto';

@Injectable()
export class PlansService {
  private readonly logger = new Logger(PlansService.name);

  create(createDto: CreatePlanDto) {
    this.logger.log(`Creating new SaaS plan: ${createDto.name}`);
    return {
      success: true,
      message: 'Subscription plan created successfully',
      data: {
        id: `plan-${createDto.name.toLowerCase()}`,
        ...createDto,
        activeTenants: createDto.activeTenants ?? 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  }

  findAll() {
    this.logger.log('Fetching all SaaS subscription plans');
    return {
      success: true,
      message: 'Subscription plans fetched successfully',
      data: DUMMY_SUBSCRIPTION_PLANS,
      meta: { total: DUMMY_SUBSCRIPTION_PLANS.length },
    };
  }

  findOne(id: string) {
    const plan = DUMMY_SUBSCRIPTION_PLANS.find((p) => p.id === id);
    if (!plan) {
      throw new NotFoundException(`Subscription plan with ID "${id}" not found`);
    }
    return {
      success: true,
      message: 'Subscription plan fetched successfully',
      data: plan,
    };
  }

  update(id: string, updateDto: UpdatePlanDto) {
    const plan = DUMMY_SUBSCRIPTION_PLANS.find((p) => p.id === id);
    if (!plan) {
      throw new NotFoundException(`Subscription plan with ID "${id}" not found`);
    }
    this.logger.log(`Updating subscription plan: ${id}`);
    return {
      success: true,
      message: 'Subscription plan updated successfully',
      data: { ...plan, ...updateDto, updatedAt: new Date().toISOString() },
    };
  }

  remove(id: string) {
    const plan = DUMMY_SUBSCRIPTION_PLANS.find((p) => p.id === id);
    if (!plan) {
      throw new NotFoundException(`Subscription plan with ID "${id}" not found`);
    }
    this.logger.log(`Soft-deleting subscription plan: ${id}`);
    return {
      success: true,
      message: 'Subscription plan removed successfully',
      data: { id, isDeleted: true, deletedAt: new Date().toISOString() },
    };
  }
}
