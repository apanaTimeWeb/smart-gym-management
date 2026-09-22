// RESPONSIBILITY: Owns the Manager workout command/write HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { WorkoutCreateExerciseRequestDto } from '@/modules/manager/workout/dtos/workout-create-exercise.request.dto';
import { WorkoutCreateExerciseResponseDto } from '@/modules/manager/workout/dtos/workout-create-exercise.response.dto';
import { WorkoutCreateExerciseService } from '@/modules/manager/workout/services/workout-create-exercise.service';
import { WorkoutCreateWorkoutRequestDto } from '@/modules/manager/workout/dtos/workout-create-workout.request.dto';
import { WorkoutCreateWorkoutResponseDto } from '@/modules/manager/workout/dtos/workout-create-workout.response.dto';
import { WorkoutCreateWorkoutService } from '@/modules/manager/workout/services/workout-create-workout.service';
import { WorkoutDeleteExerciseResponseDto } from '@/modules/manager/workout/dtos/workout-delete-exercise.response.dto';
import { WorkoutDeleteExerciseService } from '@/modules/manager/workout/services/workout-delete-exercise.service';
import { WorkoutDeleteWorkoutResponseDto } from '@/modules/manager/workout/dtos/workout-delete-workout.response.dto';
import { WorkoutDeleteWorkoutService } from '@/modules/manager/workout/services/workout-delete-workout.service';
import { WorkoutQueryDto } from '@/modules/manager/workout/dtos/workout-query.dto';
import { WorkoutUpdateExerciseRequestDto } from '@/modules/manager/workout/dtos/workout-update-exercise.request.dto';
import { WorkoutUpdateExerciseResponseDto } from '@/modules/manager/workout/dtos/workout-update-exercise.response.dto';
import { WorkoutUpdateExerciseService } from '@/modules/manager/workout/services/workout-update-exercise.service';
import { WorkoutUpdateWorkoutRequestDto } from '@/modules/manager/workout/dtos/workout-update-workout.request.dto';
import { WorkoutUpdateWorkoutResponseDto } from '@/modules/manager/workout/dtos/workout-update-workout.response.dto';
import { WorkoutUpdateWorkoutService } from '@/modules/manager/workout/services/workout-update-workout.service';

@Controller('manager')
@ApiTags('Manager workout')
@Roles(CoreRole.MANAGER)
export class WorkoutCommandController {
  constructor(private readonly createWorkoutService: WorkoutCreateWorkoutService, private readonly updateWorkoutService: WorkoutUpdateWorkoutService, private readonly deleteWorkoutService: WorkoutDeleteWorkoutService, private readonly createExerciseService: WorkoutCreateExerciseService, private readonly updateExerciseService: WorkoutUpdateExerciseService, private readonly deleteExerciseService: WorkoutDeleteExerciseService) {}

  // SLA: STANDARD
  @Post("workouts/exercises")
  @ApiOperation({ summary: 'createExercise for Manager workout' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: WorkoutCreateExerciseResponseDto })
  createExercise(@Body() dto: WorkoutCreateExerciseRequestDto): Promise<WorkoutCreateExerciseResponseDto> {  return this.createExerciseService.createExercise(dto) as Promise<WorkoutCreateExerciseResponseDto>;  }


  // SLA: STANDARD
  @Post("workouts")
  @ApiOperation({ summary: 'createWorkout for Manager workout' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: WorkoutCreateWorkoutResponseDto })
  createWorkout(@Body() dto: WorkoutCreateWorkoutRequestDto): Promise<WorkoutCreateWorkoutResponseDto> {  return this.createWorkoutService.createWorkout(dto) as Promise<WorkoutCreateWorkoutResponseDto>;  }


  // SLA: STANDARD
  @Patch("workouts/exercises/:id")
  @ApiOperation({ summary: 'updateExercise for Manager workout' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: WorkoutUpdateExerciseResponseDto })
  updateExercise(@Param('id') id: string, @Body() dto: WorkoutUpdateExerciseRequestDto): Promise<WorkoutUpdateExerciseResponseDto> {  return this.updateExerciseService.updateExercise(dto, id) as Promise<WorkoutUpdateExerciseResponseDto>;  }


  // SLA: STANDARD
  @Delete("workouts/exercises/:id")
  @ApiOperation({ summary: 'deleteExercise for Manager workout' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: WorkoutDeleteExerciseResponseDto })
  deleteExercise(@Param('id') id: string): Promise<WorkoutDeleteExerciseResponseDto> {  return this.deleteExerciseService.deleteExercise(id); }


  // SLA: STANDARD
  @Patch("workouts/:id")
  @ApiOperation({ summary: 'updateWorkout for Manager workout' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: WorkoutUpdateWorkoutResponseDto })
  updateWorkout(@Param('id') id: string, @Body() dto: WorkoutUpdateWorkoutRequestDto): Promise<WorkoutUpdateWorkoutResponseDto> {  return this.updateWorkoutService.updateWorkout(dto, id) as Promise<WorkoutUpdateWorkoutResponseDto>;  }


  // SLA: STANDARD
  @Delete("workouts/:id")
  @ApiOperation({ summary: 'deleteWorkout for Manager workout' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: WorkoutDeleteWorkoutResponseDto })
  deleteWorkout(@Param('id') id: string): Promise<WorkoutDeleteWorkoutResponseDto> {  return this.deleteWorkoutService.deleteWorkout(id); }


}
