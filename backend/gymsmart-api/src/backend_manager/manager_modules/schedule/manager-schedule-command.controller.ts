// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCoreAuthorizeResourceParam } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';
import { RequireIdempotencyKey } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-require-idempotency-key.decorator';

import { ManagerScheduleCreateShiftRequestDto } from '@/backend_manager/manager_modules/schedule/schedule_dtos/manager-schedule-create-shift.request.dto';
import { ManagerScheduleCreateShiftResponseDto } from '@/backend_manager/manager_modules/schedule/schedule_responses/manager-schedule-create-shift.response.dto';
import { ManagerScheduleDeleteShiftResponseDto } from '@/backend_manager/manager_modules/schedule/schedule_responses/manager-schedule-delete-shift.response.dto';
import { ManagerScheduleUpdateShiftRequestDto } from '@/backend_manager/manager_modules/schedule/schedule_dtos/manager-schedule-update-shift.request.dto';
import { ManagerScheduleUpdateShiftResponseDto } from '@/backend_manager/manager_modules/schedule/schedule_responses/manager-schedule-update-shift.response.dto';
import { ManagerScheduleCreateShiftService } from '@/backend_manager/manager_modules/schedule/schedule_services/manager-schedule-create-shift.service';
import { ManagerScheduleDeleteShiftService } from '@/backend_manager/manager_modules/schedule/schedule_services/manager-schedule-delete-shift.service';
import { ManagerScheduleUpdateShiftService } from '@/backend_manager/manager_modules/schedule/schedule_services/manager-schedule-update-shift.service';

@Controller('manager')
@ApiTags('Manager schedule')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerScheduleCommandController {
  constructor(private readonly createShiftService: ManagerScheduleCreateShiftService, private readonly updateShiftService: ManagerScheduleUpdateShiftService, private readonly deleteShiftService: ManagerScheduleDeleteShiftService) {}

  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("schedule/shifts")
  @ApiOperation({ summary: 'createShift for Manager schedule' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerScheduleCreateShiftResponseDto })
  createShift(@Body() dto: ManagerScheduleCreateShiftRequestDto): ReturnType<ManagerScheduleCreateShiftService['createShift']> { return this.createShiftService.createShift(dto); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch("schedule/shifts/:id")
  @ApiOperation({ summary: 'updateShift for Manager schedule' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerScheduleUpdateShiftResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  updateShift(@Param('id') id: string, @Body() dto: ManagerScheduleUpdateShiftRequestDto): ReturnType<ManagerScheduleUpdateShiftService['updateShift']> { return this.updateShiftService.updateShift(dto, id); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete("schedule/shifts/:id")
  @ApiOperation({ summary: 'deleteShift for Manager schedule' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerScheduleDeleteShiftResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  deleteShift(@Param('id') id: string): ReturnType<ManagerScheduleDeleteShiftService['deleteShift']> {  return this.deleteShiftService.deleteShift(id); }


}

export { ManagerScheduleCommandController as ScheduleCommandController };
