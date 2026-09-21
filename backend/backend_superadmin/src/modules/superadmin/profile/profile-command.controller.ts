// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the profile feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { RateLimitGuard } from '@/core/cache/rate-limit.guard';
import { ProfileCreateService } from '@/modules/superadmin/profile/services/profile-create.service';
import { ProfileCreateDto } from '@/modules/superadmin/profile/dtos/profile-create.dto';
import { ProfileUpdateService } from '@/modules/superadmin/profile/services/profile-update.service';
import { ProfileUpdateDto } from '@/modules/superadmin/profile/dtos/profile-update.dto';
import { ProfileDeleteService } from '@/modules/superadmin/profile/services/profile-delete.service';

@ApiTags('profile')
@Controller('/superadmin/profile')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class ProfileCommandController {
  constructor(private readonly createService: ProfileCreateService, private readonly updateService: ProfileUpdateService, private readonly deleteService: ProfileDeleteService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create profile' })
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    async create(@Body() body: ProfileCreateDto): Promise<unknown> { return this.createService.createProfile(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update profile' })
  @Patch(':id')
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: ProfileUpdateDto): Promise<unknown> { return this.updateService.updateProfile(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove profile' })
  @Delete(':id')
    @UseGuards(RateLimitGuard)
    @RequireIdempotencyKey()
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteProfile(id); }

}
