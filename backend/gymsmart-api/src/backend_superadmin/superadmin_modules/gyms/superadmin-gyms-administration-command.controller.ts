// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { SuperadminGymsBusinessControlsBulkActionDto } from '@/backend_superadmin/superadmin_modules/gyms/dtos/superadmin-gyms-business-controls-bulk-action.dto';
import { SuperadminGymsBusinessControlsResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-business-controls-response.dto';
import { SuperadminGymsBulkActionService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-bulk-action.service';
import { SuperadminGymsOperationalService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-operational.service';
import { SuperadminGymsOwnerEmailDto } from '@/backend_superadmin/superadmin_modules/gyms/dtos/superadmin-gyms-owner-email.dto';

@ApiTags('gymsadministrationcommand')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminGymsAdministrationCommandController {
  constructor(private readonly bulkActionService: SuperadminGymsBulkActionService, private readonly operationalService: SuperadminGymsOperationalService) {}


  /** Executes POST /superadmin/gyms/business-controls. */
  @ApiOperation({ summary: 'POST /superadmin/gyms/business-controls' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/gyms/business-controls')
  @Post('api/superadmin/gyms/business-controls')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async bulkAction(@Body() body: SuperadminGymsBusinessControlsBulkActionDto): Promise<SuperadminGymsBusinessControlsResponseDto> { return await this.bulkActionService.applyGymsBulkAction(body) as unknown as SuperadminGymsBusinessControlsResponseDto; }


  /** Sends an owner-message command after verifying the Gym exists. */
  @ApiOperation({ summary: 'POST /superadmin/gyms/:id/email' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/gyms/:id/email')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async emailOwner(@Param('id') id: string, @Body() body: SuperadminGymsOwnerEmailDto): Promise<null> { return this.operationalService.emailOwner(id, body.subject, body.message); }


  /** Issues a short-lived, signed impersonation artifact for the tenant boundary. */
  @ApiOperation({ summary: 'POST /superadmin/gyms/:id/impersonate' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/gyms/:id/impersonate')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async impersonate(@Param('id') id: string): Promise<{ token: string }> { return this.operationalService.impersonate(id); }

}