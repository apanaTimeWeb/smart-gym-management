// RESPONSIBILITY: Owns the HTTP boundary for the workout command side.
// FLOW: HTTP request → WorkoutCommandController → feature service → canonical response interceptor.

import { Body, Delete, Param, Patch, Post, Controller, HttpStatus } from '@nestjs/common'; import { ApiResponse, ApiTags } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/core/security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/core/types/core-auth.types'; import { CoreIdempotency } from '@/backend_trainer/core/security/core-idempotency.decorator'; import { WorkoutCommandService } from '@/backend_trainer/modules/backend_trainer/workout/services/workout-command.service'; import { WorkoutCreateWorkoutDto } from '@/backend_trainer/modules/backend_trainer/workout/dtos/workout-create-workout.dto'; import { WorkoutUpdateWorkoutDto } from '@/backend_trainer/modules/backend_trainer/workout/dtos/workout-update-workout.dto'; import { WorkoutCreateExerciseDto } from '@/backend_trainer/modules/backend_trainer/workout/dtos/workout-create-exercise.dto'; import { WorkoutUpdateExerciseDto } from '@/backend_trainer/modules/backend_trainer/workout/dtos/workout-update-exercise.dto';
@Controller('/trainer/workout')
@ApiTags('trainer/workout')
export class WorkoutCommandController {
  constructor(private readonly service:WorkoutCommandService){}
// SLA: STANDARD
  // SLA: STANDARD
@Post('workouts') @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({status:HttpStatus.CREATED}) /** Creates a workout plan. */ async createWorkout(@Body() dto:WorkoutCreateWorkoutDto){return this.service.createWorkout(dto);}
  // SLA: STANDARD
@Patch('workouts/:id') @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({status:HttpStatus.OK}) /** Updates a workout plan. */ async updateWorkout(@Param('id') id:string,@Body() dto:WorkoutUpdateWorkoutDto){return this.service.updateWorkout(id,dto);}
// SLA: STANDARD
  // SLA: STANDARD
@Delete('workouts/:id') @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({status:HttpStatus.OK}) /** Soft-deletes a workout plan. */ async deleteWorkout(@Param('id') id:string){return this.service.deleteWorkout(id);}
  // SLA: STANDARD
@Post('exercises') @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({status:HttpStatus.CREATED}) /** Creates an exercise. */ async createExercise(@Body() dto:WorkoutCreateExerciseDto){return this.service.createExercise(dto);}
// SLA: STANDARD
  // SLA: STANDARD
@Patch('exercises/:id') @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({status:HttpStatus.OK}) /** Updates an exercise. */ async updateExercise(@Param('id') id:string,@Body() dto:WorkoutUpdateExerciseDto){return this.service.updateExercise(id,dto);}
  // SLA: STANDARD
@Delete('exercises/:id') @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({status:HttpStatus.OK}) /** Soft-deletes an exercise. */ async deleteExercise(@Param('id') id:string){return this.service.deleteExercise(id);}
}
