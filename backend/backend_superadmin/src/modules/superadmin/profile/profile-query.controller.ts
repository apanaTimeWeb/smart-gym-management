// RESPONSIBILITY: Owns GET endpoints for the profile feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { ProfileQueryDto } from '@/modules/superadmin/profile/dtos/profile-query.dto';
import { ProfileListService } from '@/modules/superadmin/profile/services/profile-list.service';
import { ProfileFindService } from '@/modules/superadmin/profile/services/profile-find.service';

@ApiTags('profile')
@Controller('/superadmin/profile')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class ProfileQueryController {
  constructor(private readonly listService: ProfileListService, private readonly findService: ProfileFindService) {}
  /** Returns one profile record. */
  // SLA: FAST
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findProfileById(id); }
}
