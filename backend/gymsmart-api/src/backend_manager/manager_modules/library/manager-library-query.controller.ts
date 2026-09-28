// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';

import { ManagerLibraryFetchDietPlansResponseDto } from '@/backend_manager/manager_modules/library/library_responses/manager-library-fetch-diet-plans.response.dto';
import { ManagerLibraryFetchExercisesResponseDto } from '@/backend_manager/manager_modules/library/library_responses/manager-library-fetch-exercises.response.dto';
import { ManagerLibraryQueryDto } from '@/backend_manager/manager_modules/library/library_dtos/manager-library-query.dto';
import { ManagerLibraryFindDietPlansService } from '@/backend_manager/manager_modules/library/library_services/manager-library-find-diet-plans.service';
import { ManagerLibraryFindExercisesService } from '@/backend_manager/manager_modules/library/library_services/manager-library-find-exercises.service';

@Controller('manager')
@ApiTags('Manager library')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerLibraryQueryController {
  constructor(private readonly fetchExercisesService: ManagerLibraryFindExercisesService, private readonly fetchDietPlansService: ManagerLibraryFindDietPlansService) {}

  // SLA: STANDARD
  @Get("library/diet-plans")
  @ApiOperation({ summary: 'findDietPlans for Manager library' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerLibraryFetchDietPlansResponseDto })
  findDietPlans(@Query() query: ManagerLibraryQueryDto): ReturnType<ManagerLibraryFindDietPlansService['findDietPlans']> { return this.fetchDietPlansService.findDietPlans(query); }


  // SLA: STANDARD
  @Get("library/exercises")
  @ApiOperation({ summary: 'findExercises for Manager library' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerLibraryFetchExercisesResponseDto })
  findExercises(@Query() query: ManagerLibraryQueryDto): ReturnType<ManagerLibraryFindExercisesService['findExercises']> { return this.fetchExercisesService.findExercises(query); }


}

export { ManagerLibraryQueryController as LibraryQueryController };
