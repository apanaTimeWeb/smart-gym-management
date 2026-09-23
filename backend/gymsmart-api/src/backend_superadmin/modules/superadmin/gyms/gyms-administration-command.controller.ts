// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { GymsBusinessControlsBulkActionDto } from '@/backend_superadmin/modules/backend_superadmin/gyms/dtos/gyms-business-controls-bulk-action.dto';
import { GymsBusinessControlsResponseDto } from '@/backend_superadmin/modules/backend_superadmin/gyms/gyms-business-controls-response.dto';
import { GymsBulkActionService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-bulk-action.service';
import { GymsOperationalService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-operational.service';
import { GymsOwnerEmailDto } from '@/backend_superadmin/modules/backend_superadmin/gyms/dtos/gyms-owner-email.dto';

@ApiTags('gymsadministrationcommand')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class GymsAdministrationCommandController {
  constructor(private readonly bulkActionService: GymsBulkActionService, private readonly operationalService: GymsOperationalService) {}


  /** Executes POST /superadmin/gyms/business-controls. */
  @ApiOperation({ summary: 'POST /superadmin/gyms/business-controls' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/gyms/business-controls')
  @Post('api/superadmin/gyms/business-controls')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async bulkAction(@Body() body: GymsBusinessControlsBulkActionDto): Promise<GymsBusinessControlsResponseDto> { return await this.bulkActionService.applyGymsBulkAction(body) as unknown as GymsBusinessControlsResponseDto; }


  /** Sends an owner-message command after verifying the Gym exists. */
  @ApiOperation({ summary: 'POST /superadmin/gyms/:id/email' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/gyms/:id/email')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async emailOwner(@Param('id') id: string, @Body() body: GymsOwnerEmailDto): Promise<null> { return this.operationalService.emailOwner(id, body.subject, body.message); }


  /** Issues a short-lived, signed impersonation artifact for the tenant boundary. */
  @ApiOperation({ summary: 'POST /superadmin/gyms/:id/impersonate' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/gyms/:id/impersonate')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async impersonate(@Param('id') id: string): Promise<{ token: string }> { return this.operationalService.impersonate(id); }

}