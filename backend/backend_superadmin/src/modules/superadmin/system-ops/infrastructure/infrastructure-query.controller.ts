// RESPONSIBILITY: Owns GET endpoints for the infrastructure feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { InfrastructureQueryDto } from '@/modules/superadmin/system-ops/infrastructure/dtos/infrastructure-query.dto';
import { InfrastructureListService } from '@/modules/superadmin/system-ops/infrastructure/services/infrastructure-list.service';
import { InfrastructureFindService } from '@/modules/superadmin/system-ops/infrastructure/services/infrastructure-find.service';

@ApiTags('infrastructure')
@Controller('/superadmin/system-ops/infrastructure')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class InfrastructureQueryController {
  constructor(private readonly listService: InfrastructureListService, private readonly findService: InfrastructureFindService) {}
  /** Returns a paginated infrastructure list. */
  // SLA: STANDARD
  @Get()
  async findAll(@Query() query: InfrastructureQueryDto): Promise<unknown> { return await this.listService.findInfrastructurePage(query); }
  /** Returns one infrastructure record. */
  // SLA: FAST
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findInfrastructureById(id); }
}
