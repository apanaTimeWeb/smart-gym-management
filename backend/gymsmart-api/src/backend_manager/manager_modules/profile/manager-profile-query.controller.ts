// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';

import { ManagerProfileFetchProfileResponseDto } from '@/backend_manager/manager_modules/profile/profile_responses/manager-profile-fetch-profile.response.dto';
import { ManagerProfileQueryDto } from '@/backend_manager/manager_modules/profile/profile_dtos/manager-profile-query.dto';
import { ManagerProfileFindProfileService } from '@/backend_manager/manager_modules/profile/profile_services/manager-profile-find-profile.service';

@Controller('manager')
@ApiTags('Manager profile')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerProfileQueryController {
  constructor(private readonly fetchProfileService: ManagerProfileFindProfileService) {}

  // SLA: STANDARD
  @Get("profile")
  @ApiOperation({ summary: 'findProfile for Manager profile' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerProfileFetchProfileResponseDto })
  findProfile(@Query() query: ManagerProfileQueryDto): ReturnType<ManagerProfileFindProfileService['findProfile']> { return this.fetchProfileService.findProfile(query); }


}

export { ManagerProfileQueryController as ProfileQueryController };
