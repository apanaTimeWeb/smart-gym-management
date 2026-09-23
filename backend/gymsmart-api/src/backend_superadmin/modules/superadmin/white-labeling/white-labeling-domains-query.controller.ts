// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WhiteLabelingDomainsService } from '@/backend_superadmin/modules/backend_superadmin/white-labeling/services/white-labeling-domains.service';
import { SuperadminQueryDto } from '@/backend_superadmin/core/pagination/superadmin-query.dto';

@ApiTags('whitelabelingdomainsquery')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class WhiteLabelingDomainsQueryController {
  constructor(private readonly domainsService: WhiteLabelingDomainsService) {}


  /** Executes GET /superadmin/white-labeling/domains. */
  @ApiOperation({ summary: 'GET /superadmin/white-labeling/domains' })
  // SLA: FAST
  @Get('superadmin/white-labeling/domains')
  @Get('api/superadmin/white-labeling/domains')
  @Get('api/superadmin/white-labeling/domainssuffix')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async domains(@Query() query: SuperadminQueryDto): Promise<unknown> { return await this.domainsService.findWhiteLabelingDomains({ query }); }

}