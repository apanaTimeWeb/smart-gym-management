// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCoreAuthorizeResourceParam } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';
import { RequireIdempotencyKey } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-require-idempotency-key.decorator';

import { ManagerLibraryCreateDietPlanRequestDto } from '@/backend_manager/manager_modules/library/library_dtos/manager-library-create-diet-plan.request.dto';
import { ManagerLibraryCreateDietPlanResponseDto } from '@/backend_manager/manager_modules/library/library_responses/manager-library-create-diet-plan.response.dto';
import { ManagerLibraryCreateExerciseRequestDto } from '@/backend_manager/manager_modules/library/library_dtos/manager-library-create-exercise.request.dto';
import { ManagerLibraryCreateExerciseResponseDto } from '@/backend_manager/manager_modules/library/library_responses/manager-library-create-exercise.response.dto';
import { ManagerLibraryDeleteDietPlanResponseDto } from '@/backend_manager/manager_modules/library/library_responses/manager-library-delete-diet-plan.response.dto';
import { ManagerLibraryDeleteExerciseResponseDto } from '@/backend_manager/manager_modules/library/library_responses/manager-library-delete-exercise.response.dto';
import { ManagerLibraryUpdateDietPlanRequestDto } from '@/backend_manager/manager_modules/library/library_dtos/manager-library-update-diet-plan.request.dto';
import { ManagerLibraryUpdateDietPlanResponseDto } from '@/backend_manager/manager_modules/library/library_responses/manager-library-update-diet-plan.response.dto';
import { ManagerLibraryUpdateExerciseRequestDto } from '@/backend_manager/manager_modules/library/library_dtos/manager-library-update-exercise.request.dto';
import { ManagerLibraryUpdateExerciseResponseDto } from '@/backend_manager/manager_modules/library/library_responses/manager-library-update-exercise.response.dto';
import { ManagerLibraryCreateDietPlanService } from '@/backend_manager/manager_modules/library/library_services/manager-library-create-diet-plan.service';
import { ManagerLibraryCreateExerciseService } from '@/backend_manager/manager_modules/library/library_services/manager-library-create-exercise.service';
import { ManagerLibraryDeleteDietPlanService } from '@/backend_manager/manager_modules/library/library_services/manager-library-delete-diet-plan.service';
import { ManagerLibraryDeleteExerciseService } from '@/backend_manager/manager_modules/library/library_services/manager-library-delete-exercise.service';
import { ManagerLibraryUpdateDietPlanService } from '@/backend_manager/manager_modules/library/library_services/manager-library-update-diet-plan.service';
import { ManagerLibraryUpdateExerciseService } from '@/backend_manager/manager_modules/library/library_services/manager-library-update-exercise.service';

@Controller('manager')
@ApiTags('Manager library')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerLibraryCommandController {
  constructor(private readonly createExerciseService: ManagerLibraryCreateExerciseService, private readonly updateExerciseService: ManagerLibraryUpdateExerciseService, private readonly deleteExerciseService: ManagerLibraryDeleteExerciseService, private readonly createDietPlanService: ManagerLibraryCreateDietPlanService, private readonly updateDietPlanService: ManagerLibraryUpdateDietPlanService, private readonly deleteDietPlanService: ManagerLibraryDeleteDietPlanService) {}

  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("library/diet-plans")
  @ApiOperation({ summary: 'createDietPlan for Manager library' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerLibraryCreateDietPlanResponseDto })
  createDietPlan(@Body() dto: ManagerLibraryCreateDietPlanRequestDto): ReturnType<ManagerLibraryCreateDietPlanService['createDietPlan']> { return this.createDietPlanService.createDietPlan(dto); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("library/exercises")
  @ApiOperation({ summary: 'createExercise for Manager library' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerLibraryCreateExerciseResponseDto })
  createExercise(@Body() dto: ManagerLibraryCreateExerciseRequestDto): ReturnType<ManagerLibraryCreateExerciseService['createExercise']> { return this.createExerciseService.createExercise(dto); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch("library/diet-plans/:id")
  @ApiOperation({ summary: 'updateDietPlan for Manager library' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerLibraryUpdateDietPlanResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  updateDietPlan(@Param('id') id: string, @Body() dto: ManagerLibraryUpdateDietPlanRequestDto): ReturnType<ManagerLibraryUpdateDietPlanService['updateDietPlan']> { return this.updateDietPlanService.updateDietPlan(dto, id); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete("library/diet-plans/:id")
  @ApiOperation({ summary: 'deleteDietPlan for Manager library' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerLibraryDeleteDietPlanResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  deleteDietPlan(@Param('id') id: string): ReturnType<ManagerLibraryDeleteDietPlanService['deleteDietPlan']> {  return this.deleteDietPlanService.deleteDietPlan(id); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch("library/exercises/:id")
  @ApiOperation({ summary: 'updateExercise for Manager library' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerLibraryUpdateExerciseResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  updateExercise(@Param('id') id: string, @Body() dto: ManagerLibraryUpdateExerciseRequestDto): ReturnType<ManagerLibraryUpdateExerciseService['updateExercise']> { return this.updateExerciseService.updateExercise(dto, id); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete("library/exercises/:id")
  @ApiOperation({ summary: 'deleteExercise for Manager library' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerLibraryDeleteExerciseResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  deleteExercise(@Param('id') id: string): ReturnType<ManagerLibraryDeleteExerciseService['deleteExercise']> {  return this.deleteExerciseService.deleteExercise(id); }


}

export { ManagerLibraryCommandController as LibraryCommandController };
