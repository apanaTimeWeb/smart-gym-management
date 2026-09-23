// RESPONSIBILITY: Owns HTTP transport for the infrastructure-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminInfrastructureQueryDto } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/dtos/superadmin-system-ops-infrastructure-query.dto';
import { SuperadminInfrastructureListService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/services/superadmin-system-ops-infrastructure-list.service';
import { SuperadminInfrastructureFindService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/services/superadmin-system-ops-infrastructure-find.service';

@ApiTags('infrastructure')
@Controller('/superadmin/system-ops/infrastructure')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminInfrastructureQueryController {
  constructor(private readonly listService: SuperadminInfrastructureListService, private readonly findService: SuperadminInfrastructureFindService) {}
  /** Returns a paginated infrastructure list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findAll(@Query() query: SuperadminInfrastructureQueryDto): Promise<unknown> { return await this.listService.findInfrastructurePage(query); }
  /** Returns one infrastructure record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findInfrastructureById(id); }
}