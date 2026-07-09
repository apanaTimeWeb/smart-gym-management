import { Module } from '@nestjs/common';
import { WorkoutController } from '@/modules/workout/workout.controller';
import { WorkoutService } from '@/modules/workout/workout.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from './entities/workout.entity';
import { DietPlan } from './entities/diet-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workout, DietPlan])],
  controllers: [WorkoutController],
  providers: [WorkoutService],
})
export class WorkoutModule {}
