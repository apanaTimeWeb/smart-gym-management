// RESPONSIBILITY: Owns the HTTP boundary for the workout command side.
// FLOW: HTTP request → TrainerWorkoutCommandController → feature service → canonical response interceptor.

import { TrainerWorkoutExerciseResponseDto, TrainerWorkoutResponseDto } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_dtos/trainer-workout-response.dto';
import { Body, Delete, Param, Patch, Post, Controller, HttpStatus } from '@nestjs/common'; import { ApiOperation, ApiResponse, ApiTags, ApiBody, ApiParam } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/backend_core/core_security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types'; import { RequireIdempotencyKey } from '@/backend_trainer/backend_core/core_security/core-idempotency.decorator'; import { TrainerWorkoutCommandService } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_services/trainer-workout-command.service'; import { TrainerWorkoutCreateWorkoutDto } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_dtos/trainer-workout-create-workout.dto'; import { TrainerWorkoutUpdateWorkoutDto } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_dtos/trainer-workout-update-workout.dto'; import { TrainerWorkoutCreateExerciseDto } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_dtos/trainer-workout-create-exercise.dto'; import { TrainerWorkoutUpdateExerciseDto } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_dtos/trainer-workout-update-exercise.dto';

/**
 * Intent: Defines the TrainerWorkoutCommandController boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Controller('/trainer/workout')
@ApiTags('trainer/workout')
export class TrainerWorkoutCommandController {
  constructor(private readonly service:TrainerWorkoutCommandService){}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Post Trainer trainer-workout-command.controller' })
@Post('workouts') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey()@ApiBody({ type: TrainerWorkoutCreateWorkoutDto })
 @ApiResponse({ status: HttpStatus.CREATED, type: TrainerWorkoutResponseDto }) /** Creates a workout plan. */ async createWorkout(@Body() dto:TrainerWorkoutCreateWorkoutDto){return this.service.createWorkout(dto);}
  // SLA: STANDARD
@ApiOperation({ summary: 'Patch Trainer trainer-workout-command.controller' })
@Patch('workouts/:id') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey()@ApiParam({ name: 'id', type: String })
@ApiBody({ type: TrainerWorkoutUpdateWorkoutDto })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerWorkoutResponseDto }) /** Updates a workout plan. */ async updateWorkout(@Param('id') id:string,@Body() dto:TrainerWorkoutUpdateWorkoutDto){return this.service.updateWorkout(id,dto);}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Delete Trainer trainer-workout-command.controller' })
@Delete('workouts/:id') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey()@ApiParam({ name: 'id', type: String })
 @ApiResponse({ status: HttpStatus.OK, schema: { type: 'object', nullable: true, description: 'Successful mutation returns null data.' } }) /** Soft-deletes a workout plan. */ async deleteWorkout(@Param('id') id:string){return this.service.deleteWorkout(id);}
  // SLA: STANDARD
@ApiOperation({ summary: 'Post Trainer trainer-workout-command.controller' })
@Post('exercises') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey()@ApiBody({ type: TrainerWorkoutCreateExerciseDto })
 @ApiResponse({ status: HttpStatus.CREATED, type: TrainerWorkoutExerciseResponseDto }) /** Creates an exercise. */ async createExercise(@Body() dto:TrainerWorkoutCreateExerciseDto){return this.service.createExercise(dto);}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Patch Trainer trainer-workout-command.controller' })
@Patch('exercises/:id') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey()@ApiParam({ name: 'id', type: String })
@ApiBody({ type: TrainerWorkoutUpdateExerciseDto })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerWorkoutExerciseResponseDto }) /** Updates an exercise. */ async updateExercise(@Param('id') id:string,@Body() dto:TrainerWorkoutUpdateExerciseDto){return this.service.updateExercise(id,dto);}
  // SLA: STANDARD
@ApiOperation({ summary: 'Delete Trainer trainer-workout-command.controller' })
@Delete('exercises/:id') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey()@ApiParam({ name: 'id', type: String })
 @ApiResponse({ status: HttpStatus.OK, schema: { type: 'object', nullable: true, description: 'Successful mutation returns null data.' } }) /** Soft-deletes an exercise. */ async deleteExercise(@Param('id') id:string){return this.service.deleteExercise(id);}
}
