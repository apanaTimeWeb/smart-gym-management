// RESPONSIBILITY: Owns the frontend-compatible API alias for plan business-control data.
// FLOW: GET /api/superadmin/saas-billing/plans/business-controls -> query service -> canonical response interceptor.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { PlansBusinessControlsService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/plans/services/plans-business-controls.service';
import { SuperadminQueryDto } from '@/backend_superadmin/core/pagination/superadmin-query.dto';

@ApiTags('plans-api')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class PlansApiController {
  constructor(private readonly service: PlansBusinessControlsService) {}

  /** Returns plan-level business controls through the frontend-compatible API route. */
  // SLA: FAST
  @Get('api/superadmin/saas-billing/plans/business-controls')
  @ApiOperation({ summary: 'Get plan business controls' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Plan business controls.' })
  async businessControls(@Query() query: SuperadminQueryDto): Promise<unknown> { return this.service.findPlansBusinessControls({ query }); }
}