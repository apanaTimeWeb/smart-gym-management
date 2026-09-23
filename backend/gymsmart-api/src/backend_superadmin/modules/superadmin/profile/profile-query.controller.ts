// RESPONSIBILITY: Owns HTTP transport for the profile-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ProfileQueryDto } from '@/backend_superadmin/modules/superadmin/profile/dtos/profile-query.dto';
import { ProfileListService } from '@/backend_superadmin/modules/superadmin/profile/services/profile-list.service';
import { ProfileFindService } from '@/backend_superadmin/modules/superadmin/profile/services/profile-find.service';

@ApiTags('profile')
@Controller('/superadmin/profile')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class ProfileQueryController {
  constructor(private readonly listService: ProfileListService, private readonly findService: ProfileFindService) {}
  /** Returns one profile record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findProfileById(id); }
}