// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the gyms feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { GymsCreateService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-create.service';
import { GymsCreateDto } from '@/backend_superadmin/modules/superadmin/gyms/dtos/gyms-create.dto';
import { GymsUpdateService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-update.service';
import { GymsUpdateDto } from '@/backend_superadmin/modules/superadmin/gyms/dtos/gyms-update.dto';
import { GymsDeleteService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-delete.service';
import { GymsStatusService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-status.service';
import { GymsProvisionService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-provision.service';
import { GymsProvisionDto } from '@/backend_superadmin/modules/superadmin/gyms/dtos/gyms-provision.dto';
import { GymsOwnerEmailDto } from '@/backend_superadmin/modules/superadmin/gyms/dtos/gyms-owner-email.dto';
import { GymsResponseDto } from '@/backend_superadmin/modules/superadmin/gyms/responses/gyms-response.dto';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('gyms')
@Controller('/superadmin/gyms')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class GymsCommandController {
  constructor(private readonly createService: GymsCreateService, private readonly updateService: GymsUpdateService, private readonly deleteService: GymsDeleteService, private readonly statusService: GymsStatusService, private readonly provisionService: GymsProvisionService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create gyms' })
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    @ApiResponse({ type: GymsResponseDto })
    async create(@Body() body: GymsCreateDto): Promise<GymsResponseDto> { return (this.createService.createGyms(body)) as unknown as GymsResponseDto; }


  /** Provisions a new isolated tenant using client-owned fields only. */
  @ApiOperation({ summary: 'provision gym' })
  @Post('/provision')
  @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
  @ApiResponse({ type: GymsResponseDto })
  async provision(@Body() body: GymsProvisionDto): Promise<GymsResponseDto> { return (this.provisionService.provisionGym(body)) as unknown as GymsResponseDto; }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update gyms' })
  @Patch(':id')
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    @ApiResponse({ type: GymsResponseDto })
    async update(@Param('id') id: string, @Body() body: GymsUpdateDto): Promise<GymsResponseDto> { return (this.updateService.updateGyms(id, body)) as unknown as GymsResponseDto; }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove gyms' })
  @Delete(':id')
    @UseGuards(RateLimitGuard)
    @RequireIdempotencyKey()
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteGyms(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus gyms' })
  @Patch(':id/status')
    @UseGuards(RateLimitGuard)
    @ApiResponse({ type: GymsResponseDto })
    async changeStatus(@Param('id') id: string, @Body() body: { status: string }): Promise<GymsResponseDto> { return (this.statusService.changeGymsStatus(id, body.status)) as unknown as GymsResponseDto; }

}
