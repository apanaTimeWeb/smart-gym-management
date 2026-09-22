// RESPONSIBILITY: Owns the Manager schedule command/write HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { ScheduleCreateShiftRequestDto } from '@/modules/manager/schedule/dtos/schedule-create-shift.request.dto';
import { ScheduleCreateShiftResponseDto } from '@/modules/manager/schedule/dtos/schedule-create-shift.response.dto';
import { ScheduleCreateShiftService } from '@/modules/manager/schedule/services/schedule-create-shift.service';
import { ScheduleDeleteShiftResponseDto } from '@/modules/manager/schedule/dtos/schedule-delete-shift.response.dto';
import { ScheduleDeleteShiftService } from '@/modules/manager/schedule/services/schedule-delete-shift.service';
import { ScheduleQueryDto } from '@/modules/manager/schedule/dtos/schedule-query.dto';
import { ScheduleUpdateShiftRequestDto } from '@/modules/manager/schedule/dtos/schedule-update-shift.request.dto';
import { ScheduleUpdateShiftResponseDto } from '@/modules/manager/schedule/dtos/schedule-update-shift.response.dto';
import { ScheduleUpdateShiftService } from '@/modules/manager/schedule/services/schedule-update-shift.service';

@Controller('manager')
@ApiTags('Manager schedule')
@Roles(CoreRole.MANAGER)
export class ScheduleCommandController {
  constructor(private readonly createShiftService: ScheduleCreateShiftService, private readonly updateShiftService: ScheduleUpdateShiftService, private readonly deleteShiftService: ScheduleDeleteShiftService) {}

  // SLA: STANDARD
  @Post("schedule/shifts")
  @ApiOperation({ summary: 'createShift for Manager schedule' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: ScheduleCreateShiftResponseDto })
  createShift(@Body() dto: ScheduleCreateShiftRequestDto): Promise<ScheduleCreateShiftResponseDto> {  return this.createShiftService.createShift(dto) as Promise<ScheduleCreateShiftResponseDto>;  }


  // SLA: STANDARD
  @Patch("schedule/shifts/:id")
  @ApiOperation({ summary: 'updateShift for Manager schedule' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ScheduleUpdateShiftResponseDto })
  updateShift(@Param('id') id: string, @Body() dto: ScheduleUpdateShiftRequestDto): Promise<ScheduleUpdateShiftResponseDto> {  return this.updateShiftService.updateShift(dto, id) as Promise<ScheduleUpdateShiftResponseDto>;  }


  // SLA: STANDARD
  @Delete("schedule/shifts/:id")
  @ApiOperation({ summary: 'deleteShift for Manager schedule' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ScheduleDeleteShiftResponseDto })
  deleteShift(@Param('id') id: string): Promise<ScheduleDeleteShiftResponseDto> {  return this.deleteShiftService.deleteShift(id); }


}
