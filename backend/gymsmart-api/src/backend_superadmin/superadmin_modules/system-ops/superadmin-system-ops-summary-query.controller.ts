// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Get } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminSystemOpsSummaryService } from '@/backend_superadmin/superadmin_modules/system-ops/services/superadmin-system-ops-summary.service';

@ApiTags('systemopssummaryquery')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminSystemOpsSummaryQueryController {
  constructor(private readonly summaryService: SuperadminSystemOpsSummaryService) {}


  /** Returns the summary contract for the Superadmin system-ops landing page. */
  @ApiOperation({ summary: 'Return the system-ops landing summary' })
  // SLA: FAST
  @Get('superadmin/system-ops/summary')
  @Get('api/superadmin/system-ops/summary')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findSystemOpsSummary(): Promise<unknown> { return this.summaryService.findSystemOpsSummary(); }

}