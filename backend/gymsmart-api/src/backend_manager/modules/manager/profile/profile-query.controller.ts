// RESPONSIBILITY: Owns the Manager profile query/read HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { ProfileFetchProfileResponseDto } from '@/modules/manager/profile/dtos/profile-fetch-profile.response.dto';
import { ProfileFetchProfileService } from '@/modules/manager/profile/services/profile-fetch-profile.service';
import { ProfileQueryDto } from '@/modules/manager/profile/dtos/profile-query.dto';

@Controller('manager')
@ApiTags('Manager profile')
@Roles(CoreRole.MANAGER)
export class ProfileQueryController {
  constructor(private readonly fetchProfileService: ProfileFetchProfileService) {}

  // SLA: STANDARD
  @Get("profile")
  @ApiOperation({ summary: 'fetchProfile for Manager profile' })
  @ApiResponse({ status: HttpStatus.OK, type: ProfileFetchProfileResponseDto })
  fetchProfile(@Query() query: ProfileQueryDto): Promise<ProfileFetchProfileResponseDto> {  return this.fetchProfileService.fetchProfile(query) as Promise<ProfileFetchProfileResponseDto>;  }


}
