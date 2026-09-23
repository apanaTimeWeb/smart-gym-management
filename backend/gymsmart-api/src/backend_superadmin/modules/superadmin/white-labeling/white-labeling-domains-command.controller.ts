// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { WhiteLabelingStatusDto } from '@/backend_superadmin/modules/backend_superadmin/white-labeling/dtos/white-labeling-status.dto';
import { WhiteLabelingStatusService } from '@/backend_superadmin/modules/backend_superadmin/white-labeling/services/white-labeling-status.service';

@ApiTags('whitelabelingdomainscommand')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class WhiteLabelingDomainsCommandController {
  constructor(private readonly statusService: WhiteLabelingStatusService) {}


  /** Executes PATCH /superadmin/white-labeling/domains/:id/status. */
  @ApiOperation({ summary: 'PATCH /superadmin/white-labeling/domains/:id/status' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('superadmin/white-labeling/domains/:id/status')
  @Patch('api/superadmin/white-labeling/domains/:id/status')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async status(@Param('id') id: string, @Body() body: WhiteLabelingStatusDto): Promise<unknown> { return await this.statusService.changeWhiteLabelingStatus(id, body.status); }

}