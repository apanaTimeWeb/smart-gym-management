// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the white-labeling feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { WhiteLabelingDomainsService } from '@/backend_superadmin/modules/superadmin/white-labeling/services/white-labeling-domains.service';
import { WhiteLabelingStatusService } from '@/backend_superadmin/modules/superadmin/white-labeling/services/white-labeling-status.service';

@ApiTags('white-labeling-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class WhiteLabelingSpecialController {
  constructor(private readonly domainsService: WhiteLabelingDomainsService, private readonly statusService: WhiteLabelingStatusService) {}

  /** Executes GET /superadmin/white-labeling/domains. */
  @ApiOperation({ summary: 'GET /superadmin/white-labeling/domains' })
  @Get('superadmin/white-labeling/domains')
  async domains(@Query() query: Record<string, string>): Promise<unknown> { return await this.domainsService.findWhiteLabelingDomains({ query }); }

  /** Executes PATCH /superadmin/white-labeling/domains/:id/status. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'PATCH /superadmin/white-labeling/domains/:id/status' })
  @Patch('superadmin/white-labeling/domains/:id/status')
  async status(@Param('id') id: string, @Body() body: Record<string, unknown>): Promise<unknown> { return await this.statusService.changeWhiteLabelingStatus(id, String((body as Record<string, unknown>).status ?? '')); }

}
