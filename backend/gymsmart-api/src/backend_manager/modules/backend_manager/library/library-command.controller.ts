// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { CoreRequireIdempotencyKey } from '@/backend_manager/core/idempotency/core-require-idempotency-key.decorator';

import { LibraryCreateDietPlanRequestDto } from '@/backend_manager/modules/backend_manager/library/dtos/library-create-diet-plan.request.dto';
import { LibraryCreateDietPlanResponseDto } from '@/backend_manager/modules/backend_manager/library/dtos/library-create-diet-plan.response.dto';
import { LibraryCreateExerciseRequestDto } from '@/backend_manager/modules/backend_manager/library/dtos/library-create-exercise.request.dto';
import { LibraryCreateExerciseResponseDto } from '@/backend_manager/modules/backend_manager/library/dtos/library-create-exercise.response.dto';
import { LibraryDeleteDietPlanResponseDto } from '@/backend_manager/modules/backend_manager/library/dtos/library-delete-diet-plan.response.dto';
import { LibraryDeleteExerciseResponseDto } from '@/backend_manager/modules/backend_manager/library/dtos/library-delete-exercise.response.dto';
import { LibraryUpdateDietPlanRequestDto } from '@/backend_manager/modules/backend_manager/library/dtos/library-update-diet-plan.request.dto';
import { LibraryUpdateDietPlanResponseDto } from '@/backend_manager/modules/backend_manager/library/dtos/library-update-diet-plan.response.dto';
import { LibraryUpdateExerciseRequestDto } from '@/backend_manager/modules/backend_manager/library/dtos/library-update-exercise.request.dto';
import { LibraryUpdateExerciseResponseDto } from '@/backend_manager/modules/backend_manager/library/dtos/library-update-exercise.response.dto';
import { LibraryCreateDietPlanService } from '@/backend_manager/modules/backend_manager/library/services/library-create-diet-plan.service';
import { LibraryCreateExerciseService } from '@/backend_manager/modules/backend_manager/library/services/library-create-exercise.service';
import { LibraryDeleteDietPlanService } from '@/backend_manager/modules/backend_manager/library/services/library-delete-diet-plan.service';
import { LibraryDeleteExerciseService } from '@/backend_manager/modules/backend_manager/library/services/library-delete-exercise.service';
import { LibraryUpdateDietPlanService } from '@/backend_manager/modules/backend_manager/library/services/library-update-diet-plan.service';
import { LibraryUpdateExerciseService } from '@/backend_manager/modules/backend_manager/library/services/library-update-exercise.service';

@Controller('manager')
@ApiTags('Manager library')
@Roles(CoreRole.MANAGER)
export class LibraryCommandController {
  constructor(private readonly createExerciseService: LibraryCreateExerciseService, private readonly updateExerciseService: LibraryUpdateExerciseService, private readonly deleteExerciseService: LibraryDeleteExerciseService, private readonly createDietPlanService: LibraryCreateDietPlanService, private readonly updateDietPlanService: LibraryUpdateDietPlanService, private readonly deleteDietPlanService: LibraryDeleteDietPlanService) {}

  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("library/diet-plans")
  @ApiOperation({ summary: 'createDietPlan for Manager library' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: LibraryCreateDietPlanResponseDto })
  createDietPlan(@Body() dto: LibraryCreateDietPlanRequestDto): ReturnType<LibraryCreateDietPlanService['createDietPlan']> { return this.createDietPlanService.createDietPlan(dto as any); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("library/exercises")
  @ApiOperation({ summary: 'createExercise for Manager library' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: LibraryCreateExerciseResponseDto })
  createExercise(@Body() dto: LibraryCreateExerciseRequestDto): ReturnType<LibraryCreateExerciseService['createExercise']> { return this.createExerciseService.createExercise(dto as any); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Patch("library/diet-plans/:id")
  @ApiOperation({ summary: 'updateDietPlan for Manager library' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: LibraryUpdateDietPlanResponseDto })
  updateDietPlan(@Param('id') id: string, @Body() dto: LibraryUpdateDietPlanRequestDto): ReturnType<LibraryUpdateDietPlanService['updateDietPlan']> { return this.updateDietPlanService.updateDietPlan(dto as any, id); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Delete("library/diet-plans/:id")
  @ApiOperation({ summary: 'deleteDietPlan for Manager library' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: LibraryDeleteDietPlanResponseDto })
  deleteDietPlan(@Param('id') id: string): ReturnType<LibraryDeleteDietPlanService['deleteDietPlan']> {  return this.deleteDietPlanService.deleteDietPlan(id); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Patch("library/exercises/:id")
  @ApiOperation({ summary: 'updateExercise for Manager library' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: LibraryUpdateExerciseResponseDto })
  updateExercise(@Param('id') id: string, @Body() dto: LibraryUpdateExerciseRequestDto): ReturnType<LibraryUpdateExerciseService['updateExercise']> { return this.updateExerciseService.updateExercise(dto as any, id); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Delete("library/exercises/:id")
  @ApiOperation({ summary: 'deleteExercise for Manager library' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: LibraryDeleteExerciseResponseDto })
  deleteExercise(@Param('id') id: string): ReturnType<LibraryDeleteExerciseService['deleteExercise']> {  return this.deleteExerciseService.deleteExercise(id); }


}
