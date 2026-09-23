// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

import { WorkoutFetchAssignmentsResponseDto } from '@/backend_manager/modules/backend_manager/workout/dtos/workout-fetch-assignments.response.dto';
import { WorkoutFetchExercisesResponseDto } from '@/backend_manager/modules/backend_manager/workout/dtos/workout-fetch-exercises.response.dto';
import { WorkoutFetchWorkoutsResponseDto } from '@/backend_manager/modules/backend_manager/workout/dtos/workout-fetch-workouts.response.dto';
import { WorkoutQueryDto } from '@/backend_manager/modules/backend_manager/workout/dtos/workout-query.dto';
import { WorkoutFetchAssignmentsService } from '@/backend_manager/modules/backend_manager/workout/services/workout-fetch-assignments.service';
import { WorkoutFetchExercisesService } from '@/backend_manager/modules/backend_manager/workout/services/workout-fetch-exercises.service';
import { WorkoutFetchWorkoutsService } from '@/backend_manager/modules/backend_manager/workout/services/workout-fetch-workouts.service';

@Controller('manager')
@ApiTags('Manager workout')
@Roles(CoreRole.MANAGER)
export class WorkoutQueryController {
  constructor(private readonly fetchWorkoutsService: WorkoutFetchWorkoutsService, private readonly fetchExercisesService: WorkoutFetchExercisesService, private readonly fetchAssignmentsService: WorkoutFetchAssignmentsService) {}

  // SLA: STANDARD
  @Get("workout/assignments")
  @ApiOperation({ summary: 'fetchAssignments for Manager workout' })
  @ApiResponse({ status: HttpStatus.OK, type: [WorkoutFetchAssignmentsResponseDto] })
  fetchAssignments(@Query() query: WorkoutQueryDto): ReturnType<WorkoutFetchAssignmentsService['fetchAssignments']> {  return this.fetchAssignmentsService.fetchAssignments(query as any);  }


  // SLA: STANDARD
  @Get("workouts/exercises")
  @ApiOperation({ summary: 'fetchExercises for Manager workout' })
  @ApiResponse({ status: HttpStatus.OK, type: WorkoutFetchExercisesResponseDto })
  fetchExercises(@Query() query: WorkoutQueryDto): ReturnType<WorkoutFetchExercisesService['fetchExercises']> {  return this.fetchExercisesService.fetchExercises(query as any);  }


  // SLA: STANDARD
  @Get("workouts")
  @ApiOperation({ summary: 'fetchWorkouts for Manager workout' })
  @ApiResponse({ status: HttpStatus.OK, type: WorkoutFetchWorkoutsResponseDto })
  fetchWorkouts(@Query() query: WorkoutQueryDto): ReturnType<WorkoutFetchWorkoutsService['fetchWorkouts']> {  return this.fetchWorkoutsService.fetchWorkouts(query as any);  }


}
