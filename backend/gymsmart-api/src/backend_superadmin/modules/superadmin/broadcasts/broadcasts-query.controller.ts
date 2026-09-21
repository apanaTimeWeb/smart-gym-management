// RESPONSIBILITY: Owns GET endpoints for the broadcasts feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { BroadcastsQueryDto } from '@/backend_superadmin/modules/superadmin/broadcasts/dtos/broadcasts-query.dto';
import { BroadcastsListService } from '@/backend_superadmin/modules/superadmin/broadcasts/services/broadcasts-list.service';
import { BroadcastsFindService } from '@/backend_superadmin/modules/superadmin/broadcasts/services/broadcasts-find.service';
import { BroadcastsResponseDto } from '@/backend_superadmin/modules/superadmin/broadcasts/responses/broadcasts-response.dto';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('broadcasts')
@Controller('/superadmin/broadcasts')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class BroadcastsQueryController {
  constructor(private readonly listService: BroadcastsListService, private readonly findService: BroadcastsFindService) {}
  /** Returns a paginated broadcasts list. */
  // SLA: STANDARD
  @Get()
  @ApiResponse({ type: [BroadcastsResponseDto] })
  async findAll(@Query() query: BroadcastsQueryDto): Promise<BroadcastsResponseDto[]> { return await this.listService.findBroadcastsPage(query); }
  /** Returns one broadcasts record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: BroadcastsResponseDto })
  async findOne(@Param('id') id: string): Promise<BroadcastsResponseDto> { return await this.findService.findBroadcastsById(id); }
}
