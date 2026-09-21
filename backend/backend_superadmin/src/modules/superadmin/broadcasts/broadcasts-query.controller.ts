// RESPONSIBILITY: Owns GET endpoints for the broadcasts feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { BroadcastsQueryDto } from '@/modules/superadmin/broadcasts/dtos/broadcasts-query.dto';
import { BroadcastsListService } from '@/modules/superadmin/broadcasts/services/broadcasts-list.service';
import { BroadcastsFindService } from '@/modules/superadmin/broadcasts/services/broadcasts-find.service';

@ApiTags('broadcasts')
@Controller('/superadmin/broadcasts')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class BroadcastsQueryController {
  constructor(private readonly listService: BroadcastsListService, private readonly findService: BroadcastsFindService) {}
  /** Returns a paginated broadcasts list. */
  // SLA: STANDARD
  @Get()
  async findAll(@Query() query: BroadcastsQueryDto): Promise<unknown> { return await this.listService.findBroadcastsPage(query); }
  /** Returns one broadcasts record. */
  // SLA: FAST
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findBroadcastsById(id); }
}
