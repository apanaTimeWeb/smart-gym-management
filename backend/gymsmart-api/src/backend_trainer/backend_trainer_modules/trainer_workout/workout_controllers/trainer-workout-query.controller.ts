// RESPONSIBILITY: Owns the HTTP boundary for the workout query side.
// FLOW: HTTP request → TrainerWorkoutQueryController → feature service → canonical response interceptor.

import { TrainerWorkoutExerciseCollectionResponseDto, TrainerWorkoutExerciseResponseDto, TrainerWorkoutPlanCollectionResponseDto, TrainerWorkoutResponseDto } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_dtos/trainer-workout-response.dto';
import { Controller, Get, Param, Query, HttpStatus } from '@nestjs/common'; import { ApiOperation, ApiResponse, ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/backend_core/core_security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types'; import { TrainerWorkoutQueryService } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_services/trainer-workout-query.service'; import { TrainerWorkoutQueryDto } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_dtos/trainer-workout-query.dto';

/**
 * Intent: Defines the TrainerWorkoutQueryController boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Controller('/trainer/workout')
@ApiTags('trainer/workout')
export class TrainerWorkoutQueryController {
  constructor(private readonly service:TrainerWorkoutQueryService){}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-workout-query.controller' })
@Get() @CoreRoles(CoreRole.TRAINER)@ApiQuery({ type: TrainerWorkoutQueryDto })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerWorkoutPlanCollectionResponseDto }) /** Returns the combined workout feature overview expected by the frontend home route. */ async overview(@Query() q:TrainerWorkoutQueryDto){return this.service.plans(q);}
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-workout-query.controller' })
@Get('workouts') @CoreRoles(CoreRole.TRAINER)@ApiQuery({ type: TrainerWorkoutQueryDto })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerWorkoutPlanCollectionResponseDto }) /** Returns paginated workout plans. */ async plans(@Query() q:TrainerWorkoutQueryDto){return this.service.plans(q);}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-workout-query.controller' })
@Get('workouts/:id') @CoreRoles(CoreRole.TRAINER)@ApiParam({ name: 'id', type: String })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerWorkoutResponseDto }) /** Returns one workout. */ async plan(@Param('id') id:string){return this.service.plan(id);}
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-workout-query.controller' })
@Get('exercises') @CoreRoles(CoreRole.TRAINER)@ApiQuery({ type: TrainerWorkoutQueryDto })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerWorkoutExerciseCollectionResponseDto }) /** Returns paginated exercises. */ async exercises(@Query() q:TrainerWorkoutQueryDto){return this.service.exerciseList(q);}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-workout-query.controller' })
@Get('exercises/:id') @CoreRoles(CoreRole.TRAINER)@ApiParam({ name: 'id', type: String })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerWorkoutExerciseResponseDto }) /** Returns one exercise. */ async exercise(@Param('id') id:string){return this.service.exercise(id);}
}