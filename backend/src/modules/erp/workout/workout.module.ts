import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateWorkoutController } from './controllers/create-workout.controller';
import { FindWorkoutController } from './controllers/find-workout.controller';
import { UpdateWorkoutController } from './controllers/update-workout.controller';
import { DeleteWorkoutController } from './controllers/delete-workout.controller';
import { CreateWorkoutService } from './services/create-workout.service';
import { FindWorkoutService } from './services/find-workout.service';
import { UpdateWorkoutService } from './services/update-workout.service';
import { DeleteWorkoutService } from './services/delete-workout.service';
import { WorkoutRepository } from './workout.repository';

import { Workout } from './entities/workout.entity';

@Module({
  imports: [],
  controllers: [CreateWorkoutController, FindWorkoutController, UpdateWorkoutController, DeleteWorkoutController],
  providers: [CreateWorkoutService, FindWorkoutService, UpdateWorkoutService, DeleteWorkoutService, WorkoutRepository],
})
export class WorkoutModule {}
