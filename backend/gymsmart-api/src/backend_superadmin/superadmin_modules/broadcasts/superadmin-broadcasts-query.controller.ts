// RESPONSIBILITY: Owns HTTP transport for the broadcasts-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminBroadcastsQueryDto } from '@/backend_superadmin/superadmin_modules/broadcasts/dtos/superadmin-broadcasts-query.dto';
import { SuperadminBroadcastsListService } from '@/backend_superadmin/superadmin_modules/broadcasts/services/superadmin-broadcasts-list.service';
import { SuperadminBroadcastsFindService } from '@/backend_superadmin/superadmin_modules/broadcasts/services/superadmin-broadcasts-find.service';
import { SuperadminBroadcastsResponseDto } from '@/backend_superadmin/superadmin_modules/broadcasts/responses/superadmin-broadcasts-response.dto';

@ApiTags('broadcasts')
@Controller('/superadmin/broadcasts')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminBroadcastsQueryController {
  constructor(private readonly listService: SuperadminBroadcastsListService, private readonly findService: SuperadminBroadcastsFindService) {}
  /** Returns a paginated broadcasts list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ type: [SuperadminBroadcastsResponseDto] })
  async findAll(@Query() query: SuperadminBroadcastsQueryDto): Promise<unknown> { return await this.listService.findBroadcastsPage(query); }
  /** Returns one broadcasts record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: SuperadminBroadcastsResponseDto })
  async findOne(@Param('id') id: string): Promise<SuperadminBroadcastsResponseDto> { return await this.findService.findBroadcastsById(id); }
}