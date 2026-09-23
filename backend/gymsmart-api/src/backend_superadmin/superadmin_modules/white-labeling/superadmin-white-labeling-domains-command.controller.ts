// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { SuperadminWhiteLabelingStatusDto } from '@/backend_superadmin/superadmin_modules/white-labeling/dtos/superadmin-white-labeling-status.dto';
import { SuperadminWhiteLabelingStatusService } from '@/backend_superadmin/superadmin_modules/white-labeling/services/superadmin-white-labeling-status.service';

@ApiTags('whitelabelingdomainscommand')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminWhiteLabelingDomainsCommandController {
  constructor(private readonly statusService: SuperadminWhiteLabelingStatusService) {}


  /** Executes PATCH /superadmin/white-labeling/domains/:id/status. */
  @ApiOperation({ summary: 'PATCH /superadmin/white-labeling/domains/:id/status' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('superadmin/white-labeling/domains/:id/status')
  @Patch('api/superadmin/white-labeling/domains/:id/status')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async status(@Param('id') id: string, @Body() body: SuperadminWhiteLabelingStatusDto): Promise<unknown> { return await this.statusService.changeWhiteLabelingStatus(id, body.status); }

}