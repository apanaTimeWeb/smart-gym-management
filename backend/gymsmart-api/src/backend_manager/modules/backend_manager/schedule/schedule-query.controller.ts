// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

import { ScheduleFetchScheduleResponseDto } from '@/backend_manager/modules/backend_manager/schedule/dtos/schedule-fetch-schedule.response.dto';
import { ScheduleQueryDto } from '@/backend_manager/modules/backend_manager/schedule/dtos/schedule-query.dto';
import { ScheduleFetchScheduleService } from '@/backend_manager/modules/backend_manager/schedule/services/schedule-fetch-schedule.service';

@Controller('manager')
@ApiTags('Manager schedule')
@Roles(CoreRole.MANAGER)
export class ScheduleQueryController {
  constructor(private readonly fetchScheduleService: ScheduleFetchScheduleService) {}

  // SLA: STANDARD
  @Get("schedule")
  @ApiOperation({ summary: 'fetchSchedule for Manager schedule' })
  @ApiResponse({ status: HttpStatus.OK, type: ScheduleFetchScheduleResponseDto })
  fetchSchedule(@Query() query: ScheduleQueryDto): ReturnType<ScheduleFetchScheduleService['fetchSchedule']> { return this.fetchScheduleService.fetchSchedule(query as any); }


}
