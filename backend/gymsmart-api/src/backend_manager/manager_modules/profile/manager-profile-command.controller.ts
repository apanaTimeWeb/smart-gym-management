// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, HttpStatus, Patch } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';
import { RequireIdempotencyKey } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-require-idempotency-key.decorator';

import { ManagerProfileUpdatePasswordRequestDto } from '@/backend_manager/manager_modules/profile/profile_dtos/manager-profile-update-password.request.dto';
import { ManagerProfileUpdatePasswordResponseDto } from '@/backend_manager/manager_modules/profile/profile_responses/manager-profile-update-password.response.dto';
import { ManagerProfileUpdateProfileRequestDto } from '@/backend_manager/manager_modules/profile/profile_dtos/manager-profile-update-profile.request.dto';
import { ManagerProfileUpdateProfileResponseDto } from '@/backend_manager/manager_modules/profile/profile_responses/manager-profile-update-profile.response.dto';
import { ManagerProfileUpdatePasswordService } from '@/backend_manager/manager_modules/profile/profile_services/manager-profile-update-password.service';
import { ManagerProfileUpdateProfileService } from '@/backend_manager/manager_modules/profile/profile_services/manager-profile-update-profile.service';

@Controller('manager')
@ApiTags('Manager profile')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerProfileCommandController {
  constructor(private readonly updateProfileService: ManagerProfileUpdateProfileService, private readonly updatePasswordService: ManagerProfileUpdatePasswordService) {}

  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch("profile/password")
  @ApiOperation({ summary: 'updatePassword for Manager profile' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerProfileUpdatePasswordResponseDto })
  updatePassword(@Body() dto: ManagerProfileUpdatePasswordRequestDto): ReturnType<ManagerProfileUpdatePasswordService['updatePassword']> { return this.updatePasswordService.updatePassword(dto); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch("profile")
  @ApiOperation({ summary: 'updateProfile for Manager profile' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerProfileUpdateProfileResponseDto })
  updateProfile(@Body() dto: ManagerProfileUpdateProfileRequestDto): ReturnType<ManagerProfileUpdateProfileService['updateProfile']> { return this.updateProfileService.updateProfile(dto); }


}

export { ManagerProfileCommandController as ProfileCommandController };
