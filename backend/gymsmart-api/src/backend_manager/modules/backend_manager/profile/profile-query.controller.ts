// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

import { ProfileFetchProfileResponseDto } from '@/backend_manager/modules/backend_manager/profile/dtos/profile-fetch-profile.response.dto';
import { ProfileQueryDto } from '@/backend_manager/modules/backend_manager/profile/dtos/profile-query.dto';
import { ProfileFetchProfileService } from '@/backend_manager/modules/backend_manager/profile/services/profile-fetch-profile.service';

@Controller('manager')
@ApiTags('Manager profile')
@Roles(CoreRole.MANAGER)
export class ProfileQueryController {
  constructor(private readonly fetchProfileService: ProfileFetchProfileService) {}

  // SLA: STANDARD
  @Get("profile")
  @ApiOperation({ summary: 'fetchProfile for Manager profile' })
  @ApiResponse({ status: HttpStatus.OK, type: ProfileFetchProfileResponseDto })
  fetchProfile(@Query() query: ProfileQueryDto): ReturnType<ProfileFetchProfileService['fetchProfile']> { return this.fetchProfileService.fetchProfile(query as any); }


}
