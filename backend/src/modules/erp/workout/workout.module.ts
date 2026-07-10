import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Workout } from './entities/workout.entity';
import { WorkoutController } from './controllers/workout.controller';
import { WorkoutService } from './services/workout.service';

@Module({
  imports: [TypeOrmModule.forFeature([Workout])],
  controllers: [WorkoutController],
  providers: [WorkoutService],
})
export class WorkoutModule {}
