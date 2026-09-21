// RESPONSIBILITY: Owns the system-ops landing summary endpoint only; child operational features have their own feature modules.
// FLOW: HTTP GET -> SystemOpsSummaryService -> SystemOpsRepository -> canonical response envelope.
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { SystemOpsSummaryService } from '@/modules/superadmin/system-ops/services/system-ops-summary.service';

@ApiTags('system-ops-summary')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SystemOpsSpecialController {
  constructor(private readonly summaryService: SystemOpsSummaryService) {}

  /** Returns the summary contract for the Superadmin system-ops landing page. */
  @ApiOperation({ summary: 'Return the system-ops landing summary' })
  @Get('superadmin/system-ops/summary')
  async findSystemOpsSummary(): Promise<unknown> { return this.summaryService.findSystemOpsSummary(); }
}
