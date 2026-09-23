// RESPONSIBILITY: Owns HTTP transport for the profile-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminRateLimitGuard } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-rate-limit.guard';
import { SuperadminProfileCreateService } from '@/backend_superadmin/superadmin_modules/profile/services/superadmin-profile-create.service';
import { SuperadminProfileCreateDto } from '@/backend_superadmin/superadmin_modules/profile/dtos/superadmin-profile-create.dto';
import { SuperadminProfileUpdateService } from '@/backend_superadmin/superadmin_modules/profile/services/superadmin-profile-update.service';
import { SuperadminProfileUpdateDto } from '@/backend_superadmin/superadmin_modules/profile/dtos/superadmin-profile-update.dto';
import { SuperadminProfileDeleteService } from '@/backend_superadmin/superadmin_modules/profile/services/superadmin-profile-delete.service';

@ApiTags('profile')
@Controller('/superadmin/profile')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminProfileCommandController {
  constructor(private readonly createService: SuperadminProfileCreateService, private readonly updateService: SuperadminProfileUpdateService, private readonly deleteService: SuperadminProfileDeleteService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create profile' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successful response.' })
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminRateLimitGuard)
    async create(@Body() body: SuperadminProfileCreateDto): Promise<unknown> { return this.createService.createProfile(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update profile' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @UseGuards(SuperadminRateLimitGuard)
    async update(@Param('id') id: string, @Body() body: SuperadminProfileUpdateDto): Promise<unknown> { return this.updateService.updateProfile(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove profile' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteProfile(id); }

}