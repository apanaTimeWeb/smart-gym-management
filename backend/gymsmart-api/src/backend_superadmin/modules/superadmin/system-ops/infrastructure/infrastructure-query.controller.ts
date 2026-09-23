// RESPONSIBILITY: Owns HTTP transport for the infrastructure-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { InfrastructureQueryDto } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/dtos/infrastructure-query.dto';
import { InfrastructureListService } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/services/infrastructure-list.service';
import { InfrastructureFindService } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/services/infrastructure-find.service';

@ApiTags('infrastructure')
@Controller('/superadmin/system-ops/infrastructure')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class InfrastructureQueryController {
  constructor(private readonly listService: InfrastructureListService, private readonly findService: InfrastructureFindService) {}
  /** Returns a paginated infrastructure list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findAll(@Query() query: InfrastructureQueryDto): Promise<unknown> { return await this.listService.findInfrastructurePage(query); }
  /** Returns one infrastructure record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findInfrastructureById(id); }
}