import { Module } from '@nestjs/common';
import { WorkoutController } from '@/modules/workout/workout.controller';
import { WorkoutService } from '@/modules/workout/workout.service';

@Module({
  controllers: [WorkoutController],
  providers: [WorkoutService],
})
export class WorkoutModule {}
