// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { CoreRequireIdempotencyKey } from '@/backend_manager/core/idempotency/core-require-idempotency-key.decorator';

import { ScheduleCreateShiftRequestDto } from '@/backend_manager/modules/backend_manager/schedule/dtos/schedule-create-shift.request.dto';
import { ScheduleCreateShiftResponseDto } from '@/backend_manager/modules/backend_manager/schedule/dtos/schedule-create-shift.response.dto';
import { ScheduleDeleteShiftResponseDto } from '@/backend_manager/modules/backend_manager/schedule/dtos/schedule-delete-shift.response.dto';
import { ScheduleUpdateShiftRequestDto } from '@/backend_manager/modules/backend_manager/schedule/dtos/schedule-update-shift.request.dto';
import { ScheduleUpdateShiftResponseDto } from '@/backend_manager/modules/backend_manager/schedule/dtos/schedule-update-shift.response.dto';
import { ScheduleCreateShiftService } from '@/backend_manager/modules/backend_manager/schedule/services/schedule-create-shift.service';
import { ScheduleDeleteShiftService } from '@/backend_manager/modules/backend_manager/schedule/services/schedule-delete-shift.service';
import { ScheduleUpdateShiftService } from '@/backend_manager/modules/backend_manager/schedule/services/schedule-update-shift.service';

@Controller('manager')
@ApiTags('Manager schedule')
@Roles(CoreRole.MANAGER)
export class ScheduleCommandController {
  constructor(private readonly createShiftService: ScheduleCreateShiftService, private readonly updateShiftService: ScheduleUpdateShiftService, private readonly deleteShiftService: ScheduleDeleteShiftService) {}

  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("schedule/shifts")
  @ApiOperation({ summary: 'createShift for Manager schedule' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ScheduleCreateShiftResponseDto })
  createShift(@Body() dto: ScheduleCreateShiftRequestDto): ReturnType<ScheduleCreateShiftService['createShift']> { return this.createShiftService.createShift(dto as any); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Patch("schedule/shifts/:id")
  @ApiOperation({ summary: 'updateShift for Manager schedule' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ScheduleUpdateShiftResponseDto })
  updateShift(@Param('id') id: string, @Body() dto: ScheduleUpdateShiftRequestDto): ReturnType<ScheduleUpdateShiftService['updateShift']> { return this.updateShiftService.updateShift(dto as any, id); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Delete("schedule/shifts/:id")
  @ApiOperation({ summary: 'deleteShift for Manager schedule' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ScheduleDeleteShiftResponseDto })
  deleteShift(@Param('id') id: string): ReturnType<ScheduleDeleteShiftService['deleteShift']> {  return this.deleteShiftService.deleteShift(id); }


}
