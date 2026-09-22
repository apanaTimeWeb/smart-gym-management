// RESPONSIBILITY: Owns the Manager workout query/read HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { WorkoutFetchAssignmentsResponseDto } from '@/modules/manager/workout/dtos/workout-fetch-assignments.response.dto';
import { WorkoutFetchAssignmentsService } from '@/modules/manager/workout/services/workout-fetch-assignments.service';
import { WorkoutFetchExercisesResponseDto } from '@/modules/manager/workout/dtos/workout-fetch-exercises.response.dto';
import { WorkoutFetchExercisesService } from '@/modules/manager/workout/services/workout-fetch-exercises.service';
import { WorkoutFetchWorkoutsResponseDto } from '@/modules/manager/workout/dtos/workout-fetch-workouts.response.dto';
import { WorkoutFetchWorkoutsService } from '@/modules/manager/workout/services/workout-fetch-workouts.service';
import { WorkoutQueryDto } from '@/modules/manager/workout/dtos/workout-query.dto';

@Controller('manager')
@ApiTags('Manager workout')
@Roles(CoreRole.MANAGER)
export class WorkoutQueryController {
  constructor(private readonly fetchWorkoutsService: WorkoutFetchWorkoutsService, private readonly fetchExercisesService: WorkoutFetchExercisesService, private readonly fetchAssignmentsService: WorkoutFetchAssignmentsService) {}

  // SLA: STANDARD
  @Get("workout/assignments")
  @ApiOperation({ summary: 'fetchAssignments for Manager workout' })
  @ApiResponse({ status: HttpStatus.OK, type: [WorkoutFetchAssignmentsResponseDto] })
  fetchAssignments(@Query() query: WorkoutQueryDto): Promise<WorkoutFetchAssignmentsResponseDto[]> {  return this.fetchAssignmentsService.fetchAssignments(query) as Promise<WorkoutFetchAssignmentsResponseDto[]>;  }


  // SLA: STANDARD
  @Get("workouts/exercises")
  @ApiOperation({ summary: 'fetchExercises for Manager workout' })
  @ApiResponse({ status: HttpStatus.OK, type: WorkoutFetchExercisesResponseDto })
  fetchExercises(@Query() query: WorkoutQueryDto): Promise<WorkoutFetchExercisesResponseDto> {  return this.fetchExercisesService.fetchExercises(query) as Promise<WorkoutFetchExercisesResponseDto>;  }


  // SLA: STANDARD
  @Get("workouts")
  @ApiOperation({ summary: 'fetchWorkouts for Manager workout' })
  @ApiResponse({ status: HttpStatus.OK, type: WorkoutFetchWorkoutsResponseDto })
  fetchWorkouts(@Query() query: WorkoutQueryDto): Promise<WorkoutFetchWorkoutsResponseDto> {  return this.fetchWorkoutsService.fetchWorkouts(query) as Promise<WorkoutFetchWorkoutsResponseDto>;  }


}
