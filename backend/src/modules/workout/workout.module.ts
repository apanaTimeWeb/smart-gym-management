import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Workout } from './entities/workout.entity';
import { DietPlan } from './entities/diet-plan.entity';

import { WorkoutRepository } from './workout.repository';

import { CreateWorkoutController } from './controllers/create-workout.controller';
import { FindWorkoutController } from './controllers/find-workout.controller';
import { UpdateWorkoutController } from './controllers/update-workout.controller';
import { CreateDietPlanController } from './controllers/create-diet-plan.controller';
import { FindDietPlanController } from './controllers/find-diet-plan.controller';
import { UpdateDietPlanController } from './controllers/update-diet-plan.controller';

import { CreateWorkoutService } from './services/create-workout.service';
import { FindWorkoutService } from './services/find-workout.service';
import { UpdateWorkoutService } from './services/update-workout.service';
import { CreateDietPlanService } from './services/create-diet-plan.service';
import { FindDietPlanService } from './services/find-diet-plan.service';
import { UpdateDietPlanService } from './services/update-diet-plan.service';

@Module({
  imports: [TypeOrmModule.forFeature([Workout, DietPlan])],
  controllers: [
    CreateWorkoutController,
    FindWorkoutController,
    UpdateWorkoutController,
    CreateDietPlanController,
    FindDietPlanController,
    UpdateDietPlanController,
  ],
  providers: [
    WorkoutRepository,
    CreateWorkoutService,
    FindWorkoutService,
    UpdateWorkoutService,
    CreateDietPlanService,
    FindDietPlanService,
    UpdateDietPlanService,
  ],
})
export class WorkoutModule {}

