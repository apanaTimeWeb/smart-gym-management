import { Module } from '@nestjs/common';


import { Plan } from '@/modules/erp/plans/entities/plan.entity';
import { PlansRepository } from '@/modules/erp/plans/plans.repository';

import { CreatePlanService } from '@/modules/erp/plans/services/create-plan.service';
import { FindPlanService } from '@/modules/erp/plans/services/find-plan.service';
import { UpdatePlanService } from '@/modules/erp/plans/services/update-plan.service';

import { CreatePlanController } from '@/modules/erp/plans/controllers/create-plan.controller';
import { FindPlanController } from '@/modules/erp/plans/controllers/find-plan.controller';
import { UpdatePlanController } from '@/modules/erp/plans/controllers/update-plan.controller';

@Module({
  imports: [],
  controllers: [CreatePlanController, FindPlanController, UpdatePlanController],
  providers: [
    PlansRepository,
    CreatePlanService,
    FindPlanService,
    UpdatePlanService,
  ],
})
export class PlansModule {}
