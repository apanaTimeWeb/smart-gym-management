// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Get } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SystemOpsSummaryService } from '@/backend_superadmin/modules/backend_superadmin/system-ops/services/system-ops-summary.service';

@ApiTags('systemopssummaryquery')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SystemOpsSummaryQueryController {
  constructor(private readonly summaryService: SystemOpsSummaryService) {}


  /** Returns the summary contract for the Superadmin system-ops landing page. */
  @ApiOperation({ summary: 'Return the system-ops landing summary' })
  // SLA: FAST
  @Get('superadmin/system-ops/summary')
  @Get('api/superadmin/system-ops/summary')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findSystemOpsSummary(): Promise<unknown> { return this.summaryService.findSystemOpsSummary(); }

}