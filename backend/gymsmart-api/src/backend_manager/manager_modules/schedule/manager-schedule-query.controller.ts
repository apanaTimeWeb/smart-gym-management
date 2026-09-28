// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';

import { ManagerScheduleFetchScheduleResponseDto } from '@/backend_manager/manager_modules/schedule/schedule_responses/manager-schedule-fetch-schedule.response.dto';
import { ManagerScheduleQueryDto } from '@/backend_manager/manager_modules/schedule/schedule_dtos/manager-schedule-query.dto';
import { ManagerScheduleFindScheduleService } from '@/backend_manager/manager_modules/schedule/schedule_services/manager-schedule-find-schedule.service';

@Controller('manager')
@ApiTags('Manager schedule')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerScheduleQueryController {
  constructor(private readonly fetchScheduleService: ManagerScheduleFindScheduleService) {}

  // SLA: STANDARD
  @Get("schedule")
  @ApiOperation({ summary: 'findSchedule for Manager schedule' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerScheduleFetchScheduleResponseDto })
  findSchedule(@Query() query: ManagerScheduleQueryDto): ReturnType<ManagerScheduleFindScheduleService['findSchedule']> { return this.fetchScheduleService.findSchedule(query); }


}

export { ManagerScheduleQueryController as ScheduleQueryController };
