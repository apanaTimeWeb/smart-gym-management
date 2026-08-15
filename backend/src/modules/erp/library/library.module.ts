import { DeleteDietPlanService } from './services/delete-diet-plan.service';
import { DeleteExerciseService } from './services/delete-exercise.service';
import { DeleteDietPlanController } from './controllers/delete-diet-plan.controller';
import { DeleteExerciseController } from './controllers/delete-exercise.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Exercise } from './entities/exercise.entity';
import { DietPlan } from './entities/diet-plan.entity';

import { CreateExerciseController } from './controllers/create-exercise.controller';
import { FindExerciseController } from './controllers/find-exercise.controller';
import { UpdateExerciseController } from './controllers/update-exercise.controller';
import { CreateDietPlanController } from './controllers/create-diet-plan.controller';
import { FindDietPlanController } from './controllers/find-diet-plan.controller';
import { UpdateDietPlanController } from './controllers/update-diet-plan.controller';

import { CreateExerciseService } from './services/create-exercise.service';
import { FindExerciseService } from './services/find-exercise.service';
import { UpdateExerciseService } from './services/update-exercise.service';
import { CreateDietPlanService } from './services/create-diet-plan.service';
import { FindDietPlanService } from './services/find-diet-plan.service';
import { UpdateDietPlanService } from './services/update-diet-plan.service';

import { LibraryRepository } from './library.repository';

@Module({
  imports: [],
  controllers: [DeleteDietPlanController, DeleteExerciseController, 
    CreateExerciseController,
    FindExerciseController,
    UpdateExerciseController,
    CreateDietPlanController,
    FindDietPlanController,
    UpdateDietPlanController,
  ],
  providers: [DeleteDietPlanService, DeleteExerciseService, 
    LibraryRepository,
    CreateExerciseService,
    FindExerciseService,
    UpdateExerciseService,
    CreateDietPlanService,
    FindDietPlanService,
    UpdateDietPlanService,
  ],
})
export class LibraryModule {}
