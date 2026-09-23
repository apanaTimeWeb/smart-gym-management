// RESPONSIBILITY: Owns HTTP transport for the gyms-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
import { GymsStatusDto } from '@/backend_superadmin/modules/superadmin/gyms/dtos/gyms-status.dto';
import { GymsResponseDto } from '@/backend_superadmin/modules/superadmin/gyms/responses/gyms-response.dto';

@ApiTags('gyms')
@Controller('/superadmin/gyms')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class GymsCommandController {
  constructor(private readonly createService: GymsCreateService, private readonly updateService: GymsUpdateService, private readonly deleteService: GymsDeleteService, private readonly statusService: GymsStatusService, private readonly provisionService: GymsProvisionService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create gyms' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(RateLimitGuard)
  @ApiResponse({ type: GymsResponseDto })
    async create(@Body() body: GymsCreateDto): Promise<GymsResponseDto> { return (this.createService.createGyms(body)) as unknown as GymsResponseDto; }


  /** Provisions a new isolated tenant using client-owned fields only. */
  @ApiOperation({ summary: 'provision gym' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('/provision')
  @UseGuards(RateLimitGuard)
  @ApiResponse({ type: GymsResponseDto })
  async provision(@Body() body: GymsProvisionDto): Promise<GymsResponseDto> { return (this.provisionService.provisionGym(body)) as unknown as GymsResponseDto; }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update gyms' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @UseGuards(RateLimitGuard)
  @ApiResponse({ type: GymsResponseDto })
    async update(@Param('id') id: string, @Body() body: GymsUpdateDto): Promise<GymsResponseDto> { return (this.updateService.updateGyms(id, body)) as unknown as GymsResponseDto; }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove gyms' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(RateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteGyms(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus gyms' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/status')
    @UseGuards(RateLimitGuard)
  @ApiResponse({ type: GymsResponseDto })
    async changeStatus(@Param('id') id: string, @Body() body: GymsStatusDto): Promise<GymsResponseDto> { return (this.statusService.changeGymsStatus(id, body.status)) as unknown as GymsResponseDto; }

}