// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';

import { ManagerWorkoutFetchAssignmentsResponseDto } from '@/backend_manager/manager_modules/workout/workout_responses/manager-workout-fetch-assignments.response.dto';
import { ManagerWorkoutFetchExercisesResponseDto } from '@/backend_manager/manager_modules/workout/workout_responses/manager-workout-fetch-exercises.response.dto';
import { ManagerWorkoutFetchWorkoutsResponseDto } from '@/backend_manager/manager_modules/workout/workout_responses/manager-workout-fetch-workouts.response.dto';
import { ManagerWorkoutQueryDto } from '@/backend_manager/manager_modules/workout/workout_dtos/manager-workout-query.dto';
import { ManagerWorkoutFindAssignmentsService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-find-assignments.service';
import { ManagerWorkoutFindExercisesService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-find-exercises.service';
import { ManagerWorkoutFindWorkoutsService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-find-workouts.service';

@Controller('manager')
@ApiTags('Manager workout')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerWorkoutQueryController {
  constructor(private readonly fetchWorkoutsService: ManagerWorkoutFindWorkoutsService, private readonly fetchExercisesService: ManagerWorkoutFindExercisesService, private readonly fetchAssignmentsService: ManagerWorkoutFindAssignmentsService) {}

  // SLA: STANDARD
  @Get("workout/assignments")
  @ApiOperation({ summary: 'findAssignments for Manager workout' })
  @ApiResponse({ status: HttpStatus.OK, type: [ManagerWorkoutFetchAssignmentsResponseDto] })
  findAssignments(@Query() query: ManagerWorkoutQueryDto): ReturnType<ManagerWorkoutFindAssignmentsService['findAssignments']> {  return this.fetchAssignmentsService.findAssignments(query);  }


  // SLA: STANDARD
  @Get("workouts/exercises")
  @ApiOperation({ summary: 'findExercises for Manager workout' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerWorkoutFetchExercisesResponseDto })
  findExercises(@Query() query: ManagerWorkoutQueryDto): ReturnType<ManagerWorkoutFindExercisesService['findExercises']> {  return this.fetchExercisesService.findExercises(query);  }


  // SLA: STANDARD
  @Get("workouts")
  @ApiOperation({ summary: 'findWorkouts for Manager workout' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerWorkoutFetchWorkoutsResponseDto })
  findWorkouts(@Query() query: ManagerWorkoutQueryDto): ReturnType<ManagerWorkoutFindWorkoutsService['findWorkouts']> {  return this.fetchWorkoutsService.findWorkouts(query);  }


}

export { ManagerWorkoutQueryController as WorkoutQueryController };
