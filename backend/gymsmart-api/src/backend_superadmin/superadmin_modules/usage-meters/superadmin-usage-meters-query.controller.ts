// RESPONSIBILITY: Owns HTTP transport for the usage-meters-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminUsageMetersQueryDto } from '@/backend_superadmin/superadmin_modules/usage-meters/dtos/superadmin-usage-meters-query.dto';
import { SuperadminUsageMetersListService } from '@/backend_superadmin/superadmin_modules/usage-meters/services/superadmin-usage-meters-list.service';
import { SuperadminUsageMetersFindService } from '@/backend_superadmin/superadmin_modules/usage-meters/services/superadmin-usage-meters-find.service';

@ApiTags('usage-meters')
@Controller('/superadmin/usage-meters')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminUsageMetersQueryController {
  constructor(private readonly listService: SuperadminUsageMetersListService, private readonly findService: SuperadminUsageMetersFindService) {}
  /** Returns one usage-meters record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findUsageMetersById(id); }
}