// RESPONSIBILITY: Owns the system-ops landing summary endpoint only; child operational features have their own feature modules.
// FLOW: HTTP GET -> SystemOpsSummaryService -> SystemOpsRepository -> canonical response envelope.
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { SystemOpsSummaryService } from '@/backend_superadmin/modules/superadmin/system-ops/services/system-ops-summary.service';

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
