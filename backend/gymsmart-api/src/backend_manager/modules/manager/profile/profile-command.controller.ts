// RESPONSIBILITY: Owns the Manager profile command/write HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { ProfileQueryDto } from '@/modules/manager/profile/dtos/profile-query.dto';
import { ProfileUpdatePasswordRequestDto } from '@/modules/manager/profile/dtos/profile-update-password.request.dto';
import { ProfileUpdatePasswordResponseDto } from '@/modules/manager/profile/dtos/profile-update-password.response.dto';
import { ProfileUpdatePasswordService } from '@/modules/manager/profile/services/profile-update-password.service';
import { ProfileUpdateProfileRequestDto } from '@/modules/manager/profile/dtos/profile-update-profile.request.dto';
import { ProfileUpdateProfileResponseDto } from '@/modules/manager/profile/dtos/profile-update-profile.response.dto';
import { ProfileUpdateProfileService } from '@/modules/manager/profile/services/profile-update-profile.service';

@Controller('manager')
@ApiTags('Manager profile')
@Roles(CoreRole.MANAGER)
export class ProfileCommandController {
  constructor(private readonly updateProfileService: ProfileUpdateProfileService, private readonly updatePasswordService: ProfileUpdatePasswordService) {}

  // SLA: STANDARD
  @Patch("profile/password")
  @ApiOperation({ summary: 'updatePassword for Manager profile' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.OK, type: ProfileUpdatePasswordResponseDto })
  updatePassword(@Body() dto: ProfileUpdatePasswordRequestDto): Promise<ProfileUpdatePasswordResponseDto> {  return this.updatePasswordService.updatePassword(dto) as Promise<ProfileUpdatePasswordResponseDto>;  }


  // SLA: STANDARD
  @Patch("profile")
  @ApiOperation({ summary: 'updateProfile for Manager profile' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.OK, type: ProfileUpdateProfileResponseDto })
  updateProfile(@Body() dto: ProfileUpdateProfileRequestDto): Promise<ProfileUpdateProfileResponseDto> {  return this.updateProfileService.updateProfile(dto) as Promise<ProfileUpdateProfileResponseDto>;  }


}
