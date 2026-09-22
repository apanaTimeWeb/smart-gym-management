// RESPONSIBILITY: Owns the HTTP boundary for the workout query side.
// FLOW: HTTP request → WorkoutQueryController → feature service → canonical response interceptor.

import { Controller, Get, Param, Query, HttpStatus } from '@nestjs/common'; import { ApiResponse, ApiTags } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/core/security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/core/types/core-auth.types'; import { WorkoutQueryService } from '@/backend_trainer/modules/backend_trainer/workout/services/workout-query.service'; import { WorkoutQueryDto } from '@/backend_trainer/modules/backend_trainer/workout/dtos/workout-query.dto';
@Controller('/trainer/workout')
@ApiTags('trainer/workout')
export class WorkoutQueryController {
  constructor(private readonly service:WorkoutQueryService){}
// SLA: STANDARD
  // SLA: STANDARD
@Get() @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns the combined workout feature overview expected by the frontend home route. */ async overview(@Query() q:WorkoutQueryDto){return this.service.plans(q);}
  // SLA: STANDARD
@Get('workouts') @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns paginated workout plans. */ async plans(@Query() q:WorkoutQueryDto){return this.service.plans(q);}
// SLA: STANDARD
  // SLA: STANDARD
@Get('workouts/:id') @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns one workout. */ async plan(@Param('id') id:string){return this.service.plan(id);}
  // SLA: STANDARD
@Get('exercises') @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns paginated exercises. */ async exercises(@Query() q:WorkoutQueryDto){return this.service.exerciseList(q);}
// SLA: STANDARD
  // SLA: STANDARD
@Get('exercises/:id') @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns one exercise. */ async exercise(@Param('id') id:string){return this.service.exercise(id);}
}