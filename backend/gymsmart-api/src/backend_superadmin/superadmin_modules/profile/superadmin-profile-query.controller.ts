// RESPONSIBILITY: Owns HTTP transport for the profile-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminProfileQueryDto } from '@/backend_superadmin/superadmin_modules/profile/dtos/superadmin-profile-query.dto';
import { SuperadminProfileListService } from '@/backend_superadmin/superadmin_modules/profile/services/superadmin-profile-list.service';
import { SuperadminProfileFindService } from '@/backend_superadmin/superadmin_modules/profile/services/superadmin-profile-find.service';

@ApiTags('profile')
@Controller('/superadmin/profile')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminProfileQueryController {
  constructor(private readonly listService: SuperadminProfileListService, private readonly findService: SuperadminProfileFindService) {}
  /** Returns one profile record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findProfileById(id); }
}