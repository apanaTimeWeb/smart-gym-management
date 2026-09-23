// RESPONSIBILITY: Owns HTTP transport for the usage-meters-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { UsageMetersQueryDto } from '@/backend_superadmin/modules/superadmin/usage-meters/dtos/usage-meters-query.dto';
import { UsageMetersListService } from '@/backend_superadmin/modules/superadmin/usage-meters/services/usage-meters-list.service';
import { UsageMetersFindService } from '@/backend_superadmin/modules/superadmin/usage-meters/services/usage-meters-find.service';

@ApiTags('usage-meters')
@Controller('/superadmin/usage-meters')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class UsageMetersQueryController {
  constructor(private readonly listService: UsageMetersListService, private readonly findService: UsageMetersFindService) {}
  /** Returns one usage-meters record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findUsageMetersById(id); }
}