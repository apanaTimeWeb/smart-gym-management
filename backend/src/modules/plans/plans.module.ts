import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Plan } from '@/modules/plans/entities/plan.entity';
import { PlansRepository } from '@/modules/plans/services/plans.repository';

import { CreatePlanService } from '@/modules/plans/services/create-plan.service';
import { FindPlanService } from '@/modules/plans/services/find-plan.service';
import { UpdatePlanService } from '@/modules/plans/services/update-plan.service';

import { CreatePlanController } from '@/modules/plans/controllers/create-plan.controller';
import { FindPlanController } from '@/modules/plans/controllers/find-plan.controller';
import { UpdatePlanController } from '@/modules/plans/controllers/update-plan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  controllers: [
    CreatePlanController,
    FindPlanController,
    UpdatePlanController,
  ],
  providers: [
    PlansRepository,
    CreatePlanService,
    FindPlanService,
    UpdatePlanService,
  ],
})
export class PlansModule {}
