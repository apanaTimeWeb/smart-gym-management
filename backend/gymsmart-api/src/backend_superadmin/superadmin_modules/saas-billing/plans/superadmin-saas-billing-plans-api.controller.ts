// RESPONSIBILITY: Owns the frontend-compatible API alias for plan business-control data.
// FLOW: GET /api/superadmin/saas-billing/plans/business-controls -> query service -> canonical response interceptor.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminPlansBusinessControlsService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/services/superadmin-saas-billing-plans-business-controls.service';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-query.dto';

@ApiTags('plans-api')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminPlansApiController {
  constructor(private readonly service: SuperadminPlansBusinessControlsService) {}

  /** Returns plan-level business controls through the frontend-compatible API route. */
  // SLA: FAST
  @Get('api/superadmin/saas-billing/plans/business-controls')
  @ApiOperation({ summary: 'Get plan business controls' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Plan business controls.' })
  async businessControls(@Query() query: SuperadminQueryDto): Promise<unknown> { return this.service.findPlansBusinessControls({ query }); }
}