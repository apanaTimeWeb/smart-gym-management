// RESPONSIBILITY: Owns HTTP transport for the gyms-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminRateLimitGuard } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-rate-limit.guard';
import { SuperadminGymsCreateService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-create.service';
import { SuperadminGymsCreateDto } from '@/backend_superadmin/superadmin_modules/gyms/dtos/superadmin-gyms-create.dto';
import { SuperadminGymsUpdateService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-update.service';
import { SuperadminGymsUpdateDto } from '@/backend_superadmin/superadmin_modules/gyms/dtos/superadmin-gyms-update.dto';
import { SuperadminGymsDeleteService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-delete.service';
import { SuperadminGymsStatusService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-status.service';
import { SuperadminGymsProvisionService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-provision.service';
import { SuperadminGymsProvisionDto } from '@/backend_superadmin/superadmin_modules/gyms/dtos/superadmin-gyms-provision.dto';
import { SuperadminGymsOwnerEmailDto } from '@/backend_superadmin/superadmin_modules/gyms/dtos/superadmin-gyms-owner-email.dto';
import { SuperadminGymsStatusDto } from '@/backend_superadmin/superadmin_modules/gyms/dtos/superadmin-gyms-status.dto';
import { SuperadminGymsResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/responses/superadmin-gyms-response.dto';

@ApiTags('gyms')
@Controller('/superadmin/gyms')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminGymsCommandController {
  constructor(private readonly createService: SuperadminGymsCreateService, private readonly updateService: SuperadminGymsUpdateService, private readonly deleteService: SuperadminGymsDeleteService, private readonly statusService: SuperadminGymsStatusService, private readonly provisionService: SuperadminGymsProvisionService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create gyms' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminGymsResponseDto })
    async create(@Body() body: SuperadminGymsCreateDto): Promise<SuperadminGymsResponseDto> { return (this.createService.createGyms(body)) as unknown as SuperadminGymsResponseDto; }


  /** Provisions a new isolated tenant using client-owned fields only. */
  @ApiOperation({ summary: 'provision gym' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('/provision')
  @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminGymsResponseDto })
  async provision(@Body() body: SuperadminGymsProvisionDto): Promise<SuperadminGymsResponseDto> { return (this.provisionService.provisionGym(body)) as unknown as SuperadminGymsResponseDto; }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update gyms' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminGymsResponseDto })
    async update(@Param('id') id: string, @Body() body: SuperadminGymsUpdateDto): Promise<SuperadminGymsResponseDto> { return (this.updateService.updateGyms(id, body)) as unknown as SuperadminGymsResponseDto; }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove gyms' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteGyms(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus gyms' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/status')
    @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminGymsResponseDto })
    async changeStatus(@Param('id') id: string, @Body() body: SuperadminGymsStatusDto): Promise<SuperadminGymsResponseDto> { return (this.statusService.changeGymsStatus(id, body.status)) as unknown as SuperadminGymsResponseDto; }

}