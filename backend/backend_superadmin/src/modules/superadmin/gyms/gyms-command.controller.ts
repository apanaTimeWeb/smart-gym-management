// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the gyms feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { RateLimitGuard } from '@/core/cache/rate-limit.guard';
import { GymsCreateService } from '@/modules/superadmin/gyms/services/gyms-create.service';
import { GymsCreateDto } from '@/modules/superadmin/gyms/dtos/gyms-create.dto';
import { GymsUpdateService } from '@/modules/superadmin/gyms/services/gyms-update.service';
import { GymsUpdateDto } from '@/modules/superadmin/gyms/dtos/gyms-update.dto';
import { GymsDeleteService } from '@/modules/superadmin/gyms/services/gyms-delete.service';
import { GymsStatusService } from '@/modules/superadmin/gyms/services/gyms-status.service';
import { GymsProvisionService } from '@/modules/superadmin/gyms/services/gyms-provision.service';
import { GymsProvisionDto } from '@/modules/superadmin/gyms/dtos/gyms-provision.dto';
import { GymsOwnerEmailDto } from '@/modules/superadmin/gyms/dtos/gyms-owner-email.dto';

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
    async create(@Body() body: GymsCreateDto): Promise<unknown> { return this.createService.createGyms(body); }


  /** Provisions a new isolated tenant using client-owned fields only. */
  @ApiOperation({ summary: 'provision gym' })
  @Post('/provision')
  @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
  async provision(@Body() body: GymsProvisionDto): Promise<unknown> { return this.provisionService.provisionGym(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update gyms' })
  @Patch(':id')
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: GymsUpdateDto): Promise<unknown> { return this.updateService.updateGyms(id, body); }

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
    async changeStatus(@Param('id') id: string, @Body() body: { status: string }): Promise<unknown> { return this.statusService.changeGymsStatus(id, body.status); }

}
