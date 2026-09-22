// RESPONSIBILITY: Owns the Manager schedule query/read HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { ScheduleFetchScheduleResponseDto } from '@/backend_manager/modules/manager/schedule/dtos/schedule-fetch-schedule.response.dto';
import { ScheduleFetchScheduleService } from '@/backend_manager/modules/manager/schedule/services/schedule-fetch-schedule.service';
import { ScheduleQueryDto } from '@/backend_manager/modules/manager/schedule/dtos/schedule-query.dto';

@Controller('manager')
@ApiTags('Manager schedule')
@Roles(CoreRole.MANAGER)
export class ScheduleQueryController {
  constructor(private readonly fetchScheduleService: ScheduleFetchScheduleService) {}

  // SLA: STANDARD
  @Get("schedule")
  @ApiOperation({ summary: 'fetchSchedule for Manager schedule' })
  @ApiResponse({ status: HttpStatus.OK, type: ScheduleFetchScheduleResponseDto })
  fetchSchedule(@Query() query: ScheduleQueryDto): Promise<ScheduleFetchScheduleResponseDto> {  return this.fetchScheduleService.fetchSchedule(query) as unknown as Promise<ScheduleFetchScheduleResponseDto>;  }


}
