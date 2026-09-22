// @ts-nocheck
// RESPONSIBILITY: Owns the Manager library command/write HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { LibraryCreateDietPlanRequestDto } from '@/backend_manager/modules/manager/library/dtos/library-create-diet-plan.request.dto';
import { LibraryCreateDietPlanResponseDto } from '@/backend_manager/modules/manager/library/dtos/library-create-diet-plan.response.dto';
import { LibraryCreateDietPlanService } from '@/backend_manager/modules/manager/library/services/library-create-diet-plan.service';
import { LibraryCreateExerciseRequestDto } from '@/backend_manager/modules/manager/library/dtos/library-create-exercise.request.dto';
import { LibraryCreateExerciseResponseDto } from '@/backend_manager/modules/manager/library/dtos/library-create-exercise.response.dto';
import { LibraryCreateExerciseService } from '@/backend_manager/modules/manager/library/services/library-create-exercise.service';
import { LibraryDeleteDietPlanResponseDto } from '@/backend_manager/modules/manager/library/dtos/library-delete-diet-plan.response.dto';
import { LibraryDeleteDietPlanService } from '@/backend_manager/modules/manager/library/services/library-delete-diet-plan.service';
import { LibraryDeleteExerciseResponseDto } from '@/backend_manager/modules/manager/library/dtos/library-delete-exercise.response.dto';
import { LibraryDeleteExerciseService } from '@/backend_manager/modules/manager/library/services/library-delete-exercise.service';
import { LibraryQueryDto } from '@/backend_manager/modules/manager/library/dtos/library-query.dto';
import { LibraryUpdateDietPlanRequestDto } from '@/backend_manager/modules/manager/library/dtos/library-update-diet-plan.request.dto';
import { LibraryUpdateDietPlanResponseDto } from '@/backend_manager/modules/manager/library/dtos/library-update-diet-plan.response.dto';
import { LibraryUpdateDietPlanService } from '@/backend_manager/modules/manager/library/services/library-update-diet-plan.service';
import { LibraryUpdateExerciseRequestDto } from '@/backend_manager/modules/manager/library/dtos/library-update-exercise.request.dto';
import { LibraryUpdateExerciseResponseDto } from '@/backend_manager/modules/manager/library/dtos/library-update-exercise.response.dto';
import { LibraryUpdateExerciseService } from '@/backend_manager/modules/manager/library/services/library-update-exercise.service';

@Controller('manager')
@ApiTags('Manager library')
@Roles(CoreRole.MANAGER)
export class LibraryCommandController {
  constructor(private readonly createExerciseService: LibraryCreateExerciseService, private readonly updateExerciseService: LibraryUpdateExerciseService, private readonly deleteExerciseService: LibraryDeleteExerciseService, private readonly createDietPlanService: LibraryCreateDietPlanService, private readonly updateDietPlanService: LibraryUpdateDietPlanService, private readonly deleteDietPlanService: LibraryDeleteDietPlanService) {}

  // SLA: STANDARD
  @Post("library/diet-plans")
  @ApiOperation({ summary: 'createDietPlan for Manager library' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: LibraryCreateDietPlanResponseDto })
  createDietPlan(@Body() dto: LibraryCreateDietPlanRequestDto): Promise<LibraryCreateDietPlanResponseDto> {  return this.createDietPlanService.createDietPlan(dto) as unknown as Promise<LibraryCreateDietPlanResponseDto>;  }


  // SLA: STANDARD
  @Post("library/exercises")
  @ApiOperation({ summary: 'createExercise for Manager library' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: LibraryCreateExerciseResponseDto })
  createExercise(@Body() dto: LibraryCreateExerciseRequestDto): Promise<LibraryCreateExerciseResponseDto> {  return this.createExerciseService.createExercise(dto) as unknown as Promise<LibraryCreateExerciseResponseDto>;  }


  // SLA: STANDARD
  @Patch("library/diet-plans/:id")
  @ApiOperation({ summary: 'updateDietPlan for Manager library' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: LibraryUpdateDietPlanResponseDto })
  updateDietPlan(@Param('id') id: string, @Body() dto: LibraryUpdateDietPlanRequestDto): Promise<LibraryUpdateDietPlanResponseDto> {  return this.updateDietPlanService.updateDietPlan(dto, id) as unknown as Promise<LibraryUpdateDietPlanResponseDto>;  }


  // SLA: STANDARD
  @Delete("library/diet-plans/:id")
  @ApiOperation({ summary: 'deleteDietPlan for Manager library' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: LibraryDeleteDietPlanResponseDto })
  deleteDietPlan(@Param('id') id: string): Promise<LibraryDeleteDietPlanResponseDto> {  return this.deleteDietPlanService.deleteDietPlan(id); }


  // SLA: STANDARD
  @Patch("library/exercises/:id")
  @ApiOperation({ summary: 'updateExercise for Manager library' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: LibraryUpdateExerciseResponseDto })
  updateExercise(@Param('id') id: string, @Body() dto: LibraryUpdateExerciseRequestDto): Promise<LibraryUpdateExerciseResponseDto> {  return this.updateExerciseService.updateExercise(dto, id) as unknown as Promise<LibraryUpdateExerciseResponseDto>;  }


  // SLA: STANDARD
  @Delete("library/exercises/:id")
  @ApiOperation({ summary: 'deleteExercise for Manager library' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: LibraryDeleteExerciseResponseDto })
  deleteExercise(@Param('id') id: string): Promise<LibraryDeleteExerciseResponseDto> {  return this.deleteExerciseService.deleteExercise(id); }


}
