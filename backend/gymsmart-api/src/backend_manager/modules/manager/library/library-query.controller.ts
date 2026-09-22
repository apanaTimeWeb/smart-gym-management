// RESPONSIBILITY: Owns the Manager library query/read HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { LibraryFetchDietPlansResponseDto } from '@/backend_manager/modules/manager/library/dtos/library-fetch-diet-plans.response.dto';
import { LibraryFetchDietPlansService } from '@/backend_manager/modules/manager/library/services/library-fetch-diet-plans.service';
import { LibraryFetchExercisesResponseDto } from '@/backend_manager/modules/manager/library/dtos/library-fetch-exercises.response.dto';
import { LibraryFetchExercisesService } from '@/backend_manager/modules/manager/library/services/library-fetch-exercises.service';
import { LibraryQueryDto } from '@/backend_manager/modules/manager/library/dtos/library-query.dto';

@Controller('manager')
@ApiTags('Manager library')
@Roles(CoreRole.MANAGER)
export class LibraryQueryController {
  constructor(private readonly fetchExercisesService: LibraryFetchExercisesService, private readonly fetchDietPlansService: LibraryFetchDietPlansService) {}

  // SLA: STANDARD
  @Get("library/diet-plans")
  @ApiOperation({ summary: 'fetchDietPlans for Manager library' })
  @ApiResponse({ status: HttpStatus.OK, type: LibraryFetchDietPlansResponseDto })
  fetchDietPlans(@Query() query: LibraryQueryDto): Promise<LibraryFetchDietPlansResponseDto> {  return this.fetchDietPlansService.fetchDietPlans(query) as unknown as Promise<LibraryFetchDietPlansResponseDto>;  }


  // SLA: STANDARD
  @Get("library/exercises")
  @ApiOperation({ summary: 'fetchExercises for Manager library' })
  @ApiResponse({ status: HttpStatus.OK, type: LibraryFetchExercisesResponseDto })
  fetchExercises(@Query() query: LibraryQueryDto): Promise<LibraryFetchExercisesResponseDto> {  return this.fetchExercisesService.fetchExercises(query) as unknown as Promise<LibraryFetchExercisesResponseDto>;  }


}
