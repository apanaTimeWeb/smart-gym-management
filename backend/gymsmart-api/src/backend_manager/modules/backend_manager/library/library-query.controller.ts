// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

import { LibraryFetchDietPlansResponseDto } from '@/backend_manager/modules/backend_manager/library/dtos/library-fetch-diet-plans.response.dto';
import { LibraryFetchExercisesResponseDto } from '@/backend_manager/modules/backend_manager/library/dtos/library-fetch-exercises.response.dto';
import { LibraryQueryDto } from '@/backend_manager/modules/backend_manager/library/dtos/library-query.dto';
import { LibraryFetchDietPlansService } from '@/backend_manager/modules/backend_manager/library/services/library-fetch-diet-plans.service';
import { LibraryFetchExercisesService } from '@/backend_manager/modules/backend_manager/library/services/library-fetch-exercises.service';

@Controller('manager')
@ApiTags('Manager library')
@Roles(CoreRole.MANAGER)
export class LibraryQueryController {
  constructor(private readonly fetchExercisesService: LibraryFetchExercisesService, private readonly fetchDietPlansService: LibraryFetchDietPlansService) {}

  // SLA: STANDARD
  @Get("library/diet-plans")
  @ApiOperation({ summary: 'fetchDietPlans for Manager library' })
  @ApiResponse({ status: HttpStatus.OK, type: LibraryFetchDietPlansResponseDto })
  fetchDietPlans(@Query() query: LibraryQueryDto): ReturnType<LibraryFetchDietPlansService['fetchDietPlans']> { return this.fetchDietPlansService.fetchDietPlans(query as any); }


  // SLA: STANDARD
  @Get("library/exercises")
  @ApiOperation({ summary: 'fetchExercises for Manager library' })
  @ApiResponse({ status: HttpStatus.OK, type: LibraryFetchExercisesResponseDto })
  fetchExercises(@Query() query: LibraryQueryDto): ReturnType<LibraryFetchExercisesService['fetchExercises']> { return this.fetchExercisesService.fetchExercises(query as any); }


}
