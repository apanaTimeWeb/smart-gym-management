// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, HttpStatus, Patch } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { CoreRequireIdempotencyKey } from '@/backend_manager/core/idempotency/core-require-idempotency-key.decorator';

import { ProfileUpdatePasswordRequestDto } from '@/backend_manager/modules/backend_manager/profile/dtos/profile-update-password.request.dto';
import { ProfileUpdatePasswordResponseDto } from '@/backend_manager/modules/backend_manager/profile/dtos/profile-update-password.response.dto';
import { ProfileUpdateProfileRequestDto } from '@/backend_manager/modules/backend_manager/profile/dtos/profile-update-profile.request.dto';
import { ProfileUpdateProfileResponseDto } from '@/backend_manager/modules/backend_manager/profile/dtos/profile-update-profile.response.dto';
import { ProfileUpdatePasswordService } from '@/backend_manager/modules/backend_manager/profile/services/profile-update-password.service';
import { ProfileUpdateProfileService } from '@/backend_manager/modules/backend_manager/profile/services/profile-update-profile.service';

@Controller('manager')
@ApiTags('Manager profile')
@Roles(CoreRole.MANAGER)
export class ProfileCommandController {
  constructor(private readonly updateProfileService: ProfileUpdateProfileService, private readonly updatePasswordService: ProfileUpdatePasswordService) {}

  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Patch("profile/password")
  @ApiOperation({ summary: 'updatePassword for Manager profile' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ProfileUpdatePasswordResponseDto })
  updatePassword(@Body() dto: ProfileUpdatePasswordRequestDto): ReturnType<ProfileUpdatePasswordService['updatePassword']> { return this.updatePasswordService.updatePassword(dto as any); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Patch("profile")
  @ApiOperation({ summary: 'updateProfile for Manager profile' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ProfileUpdateProfileResponseDto })
  updateProfile(@Body() dto: ProfileUpdateProfileRequestDto): ReturnType<ProfileUpdateProfileService['updateProfile']> { return this.updateProfileService.updateProfile(dto as any); }


}
