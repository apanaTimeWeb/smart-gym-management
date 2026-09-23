// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminWhiteLabelingDomainsService } from '@/backend_superadmin/superadmin_modules/white-labeling/services/superadmin-white-labeling-domains.service';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-query.dto';

@ApiTags('whitelabelingdomainsquery')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminWhiteLabelingDomainsQueryController {
  constructor(private readonly domainsService: SuperadminWhiteLabelingDomainsService) {}


  /** Executes GET /superadmin/white-labeling/domains. */
  @ApiOperation({ summary: 'GET /superadmin/white-labeling/domains' })
  // SLA: FAST
  @Get('superadmin/white-labeling/domains')
  @Get('api/superadmin/white-labeling/domains')
  @Get('api/superadmin/white-labeling/domainssuffix')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async domains(@Query() query: SuperadminQueryDto): Promise<unknown> { return await this.domainsService.findWhiteLabelingDomains({ query }); }

}