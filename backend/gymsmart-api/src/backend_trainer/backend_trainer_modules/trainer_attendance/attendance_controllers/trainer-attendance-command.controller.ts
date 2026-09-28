// RESPONSIBILITY: Owns the HTTP boundary for attendance mutations only.
// FLOW: HTTP request → TrainerAttendanceCommandController → feature service → response handling.

import { Body, Controller, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
import { TrainerAttendanceRecordResponseDto } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/attendance_dtos/trainer-attendance-response.dto';
import { RequireIdempotencyKey } from '@/backend_trainer/backend_core/core_security/core-idempotency.decorator';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types';
import { CoreRoles } from '@/backend_trainer/backend_core/core_security/core-roles.decorator';
import { TrainerAttendanceCheckoutAttendanceDto } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/attendance_dtos/trainer-attendance-checkout-attendance.dto';
import { TrainerAttendanceCreateAttendanceDto } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/attendance_dtos/trainer-attendance-create-attendance.dto';
import { TrainerAttendanceCheckoutService } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/attendance_services/trainer-attendance-checkout.service';
import { TrainerAttendanceCreateService } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/attendance_services/trainer-attendance-create.service';


/**
 * Intent: Defines the TrainerAttendanceCommandController boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Controller('/trainer/attendance')
@ApiTags('trainer/attendance')
export class TrainerAttendanceCommandController {
  constructor(
    private readonly createService: TrainerAttendanceCreateService,
    private readonly checkoutService: TrainerAttendanceCheckoutService,
  ) {}

  // SLA: STANDARD
  @ApiOperation({ summary: 'Post Trainer trainer-attendance-command.controller' })
@Post()
  @CoreRoles(CoreRole.TRAINER)
  @RequireIdempotencyKey()@ApiBody({ type: TrainerAttendanceCreateAttendanceDto })

  @ApiResponse({ status: HttpStatus.CREATED, type: TrainerAttendanceRecordResponseDto })
  /** Creates a member or self trainer attendance record. */
  async create(@Body() dto: TrainerAttendanceCreateAttendanceDto) {
    return this.createService.create(dto);
  }

  // SLA: STANDARD
  @ApiOperation({ summary: 'Patch Trainer trainer-attendance-command.controller' })
@Patch('checkout/:staffId')
  @CoreRoles(CoreRole.TRAINER)
  @RequireIdempotencyKey()@ApiParam({ name: 'staffId', type: String })
@ApiBody({ type: TrainerAttendanceCheckoutAttendanceDto })

  @ApiResponse({ status: HttpStatus.OK, schema: { type: 'object', nullable: true, description: 'Successful mutation returns null data.' } })
  /** Closes the current open attendance record for the authenticated trainer. */
  async checkout(@Param('staffId') staffId: string, @Body() dto: TrainerAttendanceCheckoutAttendanceDto) {
    return this.checkoutService.checkout(staffId, dto.checkOutTime ?? dto.checkoutAt);
  }
}
