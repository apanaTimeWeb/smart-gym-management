// RESPONSIBILITY: Owns the HTTP boundary for attendance mutations only.
// FLOW: HTTP request → AttendanceCommandController → feature service → response handling.

import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { CoreRoles } from '@/backend_trainer/core/security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/core/types/core-auth.types'; import { CoreIdempotency } from '@/backend_trainer/core/security/core-idempotency.decorator';
import { CoreRawResponse } from '@/backend_trainer/core/response/core-raw-response.decorator';
import { AttendanceCreateService } from '@/backend_trainer/modules/backend_trainer/attendance/services/attendance-create.service';
import { AttendanceCheckoutService } from '@/backend_trainer/modules/backend_trainer/attendance/services/attendance-checkout.service';
import { AttendanceExportService } from '@/backend_trainer/modules/backend_trainer/attendance/services/attendance-export.service';
import { AttendanceCreateAttendanceDto } from '@/backend_trainer/modules/backend_trainer/attendance/dtos/attendance-create-attendance.dto';
import { AttendanceCheckoutAttendanceDto } from '@/backend_trainer/modules/backend_trainer/attendance/dtos/attendance-checkout-attendance.dto';

@Controller('/trainer/attendance')
@ApiTags('trainer/attendance')
export class AttendanceCommandController {
  constructor(private readonly createService: AttendanceCreateService, private readonly checkoutService: AttendanceCheckoutService, private readonly exportService: AttendanceExportService) {}

// SLA: STANDARD
  // SLA: STANDARD
@Post() @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({ status: HttpStatus.CREATED })
  /** Creates a member or self trainer attendance record. */
  async create(@Body() dto: AttendanceCreateAttendanceDto) { return this.createService.create(dto); }

// SLA: STANDARD
  // SLA: STANDARD
@Patch('checkout/:staffId') @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({ status: HttpStatus.OK })
  /** Closes the current open attendance record for the authenticated trainer. */
  async checkout(@Param('staffId') staffId: string, @Body() dto: AttendanceCheckoutAttendanceDto) { return this.checkoutService.checkout(staffId, dto.checkOutTime ?? dto.checkoutAt); }

// SLA: STANDARD
  // SLA: STANDARD
@Get('export') @CoreRoles(CoreRole.TRAINER) @CoreRawResponse() @ApiResponse({ status: HttpStatus.OK, content: { 'text/csv': {} } })
  /** Returns a bounded CSV export for direct browser download. */
  async export(@Res({ passthrough: true }) response: Response): Promise<string> { response.type('text/csv').setHeader('Content-Disposition', 'attachment; filename="attendance.csv"'); return this.exportService.exportCsv(); }
}
