// RESPONSIBILITY: Owns GET endpoints for the usage-meters feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { UsageMetersQueryDto } from '@/modules/superadmin/usage-meters/dtos/usage-meters-query.dto';
import { UsageMetersListService } from '@/modules/superadmin/usage-meters/services/usage-meters-list.service';
import { UsageMetersFindService } from '@/modules/superadmin/usage-meters/services/usage-meters-find.service';

@ApiTags('usage-meters')
@Controller('/superadmin/usage-meters')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class UsageMetersQueryController {
  constructor(private readonly listService: UsageMetersListService, private readonly findService: UsageMetersFindService) {}
  /** Returns one usage-meters record. */
  // SLA: FAST
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findUsageMetersById(id); }
}
