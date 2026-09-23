// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { CoreRequireIdempotencyKey } from '@/backend_manager/core/idempotency/core-require-idempotency-key.decorator';

import { WorkoutCreateExerciseRequestDto } from '@/backend_manager/modules/backend_manager/workout/dtos/workout-create-exercise.request.dto';
import { WorkoutCreateExerciseResponseDto } from '@/backend_manager/modules/backend_manager/workout/dtos/workout-create-exercise.response.dto';
import { WorkoutCreateWorkoutRequestDto } from '@/backend_manager/modules/backend_manager/workout/dtos/workout-create-workout.request.dto';
import { WorkoutCreateWorkoutResponseDto } from '@/backend_manager/modules/backend_manager/workout/dtos/workout-create-workout.response.dto';
import { WorkoutDeleteExerciseResponseDto } from '@/backend_manager/modules/backend_manager/workout/dtos/workout-delete-exercise.response.dto';
import { WorkoutDeleteWorkoutResponseDto } from '@/backend_manager/modules/backend_manager/workout/dtos/workout-delete-workout.response.dto';
import { WorkoutUpdateExerciseRequestDto } from '@/backend_manager/modules/backend_manager/workout/dtos/workout-update-exercise.request.dto';
import { WorkoutUpdateExerciseResponseDto } from '@/backend_manager/modules/backend_manager/workout/dtos/workout-update-exercise.response.dto';
import { WorkoutUpdateWorkoutRequestDto } from '@/backend_manager/modules/backend_manager/workout/dtos/workout-update-workout.request.dto';
import { WorkoutUpdateWorkoutResponseDto } from '@/backend_manager/modules/backend_manager/workout/dtos/workout-update-workout.response.dto';
import { WorkoutCreateExerciseService } from '@/backend_manager/modules/backend_manager/workout/services/workout-create-exercise.service';
import { WorkoutCreateWorkoutService } from '@/backend_manager/modules/backend_manager/workout/services/workout-create-workout.service';
import { WorkoutDeleteExerciseService } from '@/backend_manager/modules/backend_manager/workout/services/workout-delete-exercise.service';
import { WorkoutDeleteWorkoutService } from '@/backend_manager/modules/backend_manager/workout/services/workout-delete-workout.service';
import { WorkoutUpdateExerciseService } from '@/backend_manager/modules/backend_manager/workout/services/workout-update-exercise.service';
import { WorkoutUpdateWorkoutService } from '@/backend_manager/modules/backend_manager/workout/services/workout-update-workout.service';

@Controller('manager')
@ApiTags('Manager workout')
@Roles(CoreRole.MANAGER)
export class WorkoutCommandController {
  constructor(private readonly createWorkoutService: WorkoutCreateWorkoutService, private readonly updateWorkoutService: WorkoutUpdateWorkoutService, private readonly deleteWorkoutService: WorkoutDeleteWorkoutService, private readonly createExerciseService: WorkoutCreateExerciseService, private readonly updateExerciseService: WorkoutUpdateExerciseService, private readonly deleteExerciseService: WorkoutDeleteExerciseService) {}

  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("workouts/exercises")
  @ApiOperation({ summary: 'createExercise for Manager workout' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: WorkoutCreateExerciseResponseDto })
  createExercise(@Body() dto: WorkoutCreateExerciseRequestDto): ReturnType<WorkoutCreateExerciseService['createExercise']> {  return this.createExerciseService.createExercise(dto as any);  }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("workouts")
  @ApiOperation({ summary: 'createWorkout for Manager workout' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: WorkoutCreateWorkoutResponseDto })
  createWorkout(@Body() dto: WorkoutCreateWorkoutRequestDto): ReturnType<WorkoutCreateWorkoutService['createWorkout']> {  return this.createWorkoutService.createWorkout(dto as any);  }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Patch("workouts/exercises/:id")
  @ApiOperation({ summary: 'updateExercise for Manager workout' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: WorkoutUpdateExerciseResponseDto })
  updateExercise(@Param('id') id: string, @Body() dto: WorkoutUpdateExerciseRequestDto): ReturnType<WorkoutUpdateExerciseService['updateExercise']> {  return this.updateExerciseService.updateExercise(dto as any, id);  }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Delete("workouts/exercises/:id")
  @ApiOperation({ summary: 'deleteExercise for Manager workout' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: WorkoutDeleteExerciseResponseDto })
  deleteExercise(@Param('id') id: string): ReturnType<WorkoutDeleteExerciseService['deleteExercise']> {  return this.deleteExerciseService.deleteExercise(id); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Patch("workouts/:id")
  @ApiOperation({ summary: 'updateWorkout for Manager workout' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: WorkoutUpdateWorkoutResponseDto })
  updateWorkout(@Param('id') id: string, @Body() dto: WorkoutUpdateWorkoutRequestDto): ReturnType<WorkoutUpdateWorkoutService['updateWorkout']> {  return this.updateWorkoutService.updateWorkout(dto as any, id);  }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Delete("workouts/:id")
  @ApiOperation({ summary: 'deleteWorkout for Manager workout' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: WorkoutDeleteWorkoutResponseDto })
  deleteWorkout(@Param('id') id: string): ReturnType<WorkoutDeleteWorkoutService['deleteWorkout']> {  return this.deleteWorkoutService.deleteWorkout(id); }


}
