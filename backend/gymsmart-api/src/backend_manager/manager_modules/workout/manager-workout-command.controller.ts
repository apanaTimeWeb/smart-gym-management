// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCoreAuthorizeResourceParam } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';
import { RequireIdempotencyKey } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-require-idempotency-key.decorator';

import { ManagerWorkoutCreateExerciseRequestDto } from '@/backend_manager/manager_modules/workout/workout_dtos/manager-workout-create-exercise.request.dto';
import { ManagerWorkoutCreateExerciseResponseDto } from '@/backend_manager/manager_modules/workout/workout_responses/manager-workout-create-exercise.response.dto';
import { ManagerWorkoutCreateWorkoutRequestDto } from '@/backend_manager/manager_modules/workout/workout_dtos/manager-workout-create-workout.request.dto';
import { ManagerWorkoutCreateWorkoutResponseDto } from '@/backend_manager/manager_modules/workout/workout_responses/manager-workout-create-workout.response.dto';
import { ManagerWorkoutDeleteExerciseResponseDto } from '@/backend_manager/manager_modules/workout/workout_responses/manager-workout-delete-exercise.response.dto';
import { ManagerWorkoutDeleteWorkoutResponseDto } from '@/backend_manager/manager_modules/workout/workout_responses/manager-workout-delete-workout.response.dto';
import { ManagerWorkoutUpdateExerciseRequestDto } from '@/backend_manager/manager_modules/workout/workout_dtos/manager-workout-update-exercise.request.dto';
import { ManagerWorkoutUpdateExerciseResponseDto } from '@/backend_manager/manager_modules/workout/workout_responses/manager-workout-update-exercise.response.dto';
import { ManagerWorkoutUpdateWorkoutRequestDto } from '@/backend_manager/manager_modules/workout/workout_dtos/manager-workout-update-workout.request.dto';
import { ManagerWorkoutUpdateWorkoutResponseDto } from '@/backend_manager/manager_modules/workout/workout_responses/manager-workout-update-workout.response.dto';
import { ManagerWorkoutCreateExerciseService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-create-exercise.service';
import { ManagerWorkoutCreateWorkoutService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-create-workout.service';
import { ManagerWorkoutDeleteExerciseService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-delete-exercise.service';
import { ManagerWorkoutDeleteWorkoutService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-delete-workout.service';
import { ManagerWorkoutUpdateExerciseService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-update-exercise.service';
import { ManagerWorkoutUpdateWorkoutService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-update-workout.service';

@Controller('manager')
@ApiTags('Manager workout')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerWorkoutCommandController {
  constructor(private readonly createWorkoutService: ManagerWorkoutCreateWorkoutService, private readonly updateWorkoutService: ManagerWorkoutUpdateWorkoutService, private readonly deleteWorkoutService: ManagerWorkoutDeleteWorkoutService, private readonly createExerciseService: ManagerWorkoutCreateExerciseService, private readonly updateExerciseService: ManagerWorkoutUpdateExerciseService, private readonly deleteExerciseService: ManagerWorkoutDeleteExerciseService) {}

  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("workouts/exercises")
  @ApiOperation({ summary: 'createExercise for Manager workout' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerWorkoutCreateExerciseResponseDto })
  createExercise(@Body() dto: ManagerWorkoutCreateExerciseRequestDto): ReturnType<ManagerWorkoutCreateExerciseService['createExercise']> {  return this.createExerciseService.createExercise(dto);  }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("workouts")
  @ApiOperation({ summary: 'createWorkout for Manager workout' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerWorkoutCreateWorkoutResponseDto })
  createWorkout(@Body() dto: ManagerWorkoutCreateWorkoutRequestDto): ReturnType<ManagerWorkoutCreateWorkoutService['createWorkout']> {  return this.createWorkoutService.createWorkout(dto);  }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch("workouts/exercises/:id")
  @ApiOperation({ summary: 'updateExercise for Manager workout' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerWorkoutUpdateExerciseResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  updateExercise(@Param('id') id: string, @Body() dto: ManagerWorkoutUpdateExerciseRequestDto): ReturnType<ManagerWorkoutUpdateExerciseService['updateExercise']> {  return this.updateExerciseService.updateExercise(dto, id);  }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete("workouts/exercises/:id")
  @ApiOperation({ summary: 'deleteExercise for Manager workout' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerWorkoutDeleteExerciseResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  deleteExercise(@Param('id') id: string): ReturnType<ManagerWorkoutDeleteExerciseService['deleteExercise']> {  return this.deleteExerciseService.deleteExercise(id); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch("workouts/:id")
  @ApiOperation({ summary: 'updateWorkout for Manager workout' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerWorkoutUpdateWorkoutResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  updateWorkout(@Param('id') id: string, @Body() dto: ManagerWorkoutUpdateWorkoutRequestDto): ReturnType<ManagerWorkoutUpdateWorkoutService['updateWorkout']> {  return this.updateWorkoutService.updateWorkout(dto, id);  }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete("workouts/:id")
  @ApiOperation({ summary: 'deleteWorkout for Manager workout' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerWorkoutDeleteWorkoutResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  deleteWorkout(@Param('id') id: string): ReturnType<ManagerWorkoutDeleteWorkoutService['deleteWorkout']> {  return this.deleteWorkoutService.deleteWorkout(id); }


}

export { ManagerWorkoutCommandController as WorkoutCommandController };
