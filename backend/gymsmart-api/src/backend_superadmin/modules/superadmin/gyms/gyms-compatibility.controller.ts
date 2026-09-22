// RESPONSIBILITY: Preserves the legacy frontend API namespace during the contract transition for Gyms.
// FLOW: /api/gyms/* -> compatibility controller -> same orchestrators/services as /api/v1/superadmin/gyms.

import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Version, VERSION_NEUTRAL, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';

import { GymsCreateService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-create.service';
import { GymsCreateDto } from '@/backend_superadmin/modules/superadmin/gyms/dtos/gyms-create.dto';
import { GymsUpdateService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-update.service';
import { GymsUpdateDto } from '@/backend_superadmin/modules/superadmin/gyms/dtos/gyms-update.dto';
import { GymsDeleteService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-delete.service';
import { GymsStatusService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-status.service';
import { GymsProvisionService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-provision.service';
import { GymsProvisionDto } from '@/backend_superadmin/modules/superadmin/gyms/dtos/gyms-provision.dto';
import { GymsQueryDto } from '@/backend_superadmin/modules/superadmin/gyms/dtos/gyms-query.dto';
import { GymsListService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-list.service';
import { GymsFindService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-find.service';
import { GymsOperationalService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-operational.service';
import { GymsOwnerEmailDto } from '@/backend_superadmin/modules/superadmin/gyms/dtos/gyms-owner-email.dto';
import { GymsResponseDto } from '@/backend_superadmin/modules/superadmin/gyms/responses/gyms-response.dto';
import { GymsBusinessControlsService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-business-controls.service';
import { GymsBusinessControlsBulkActionDto } from '@/backend_superadmin/modules/superadmin/gyms/dtos/gyms-business-controls-bulk-action.dto';
import { GymsBusinessControlsResponseDto } from '@/backend_superadmin/modules/superadmin/gyms/gyms-business-controls-response.dto';
import { GymDetailBusinessOverviewResponseDto } from '@/backend_superadmin/modules/superadmin/gyms/gym-detail-business-overview-response.dto';
import { GymsBulkActionService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-bulk-action.service';
import { GymsDetailBusinessOverviewService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-detail-business-overview.service';

@ApiTags('Gyms-Compatibility')
@Controller({ path: 'api/gyms', version: VERSION_NEUTRAL })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class GymsCompatibilityController {
  constructor(
    private readonly listService: GymsListService,
    private readonly findService: GymsFindService,
    private readonly createService: GymsCreateService,
    private readonly updateService: GymsUpdateService,
    private readonly deleteService: GymsDeleteService,
    private readonly statusService: GymsStatusService,
    private readonly provisionService: GymsProvisionService,
    private readonly operationalService: GymsOperationalService
  ) {}

  @Get()
  @Version(VERSION_NEUTRAL)
  @ApiOperation({ summary: 'Legacy GET /api/gyms' })
  async findAll(@Query() query: GymsQueryDto) { return await this.listService.findGymsPage(query); }

  @Get('stats')
  @Version(VERSION_NEUTRAL)
  @ApiOperation({ summary: 'Legacy GET /api/gyms/stats' })
  async stats() { return this.operationalService.stats(); }

  @Get('export')
  @Version(VERSION_NEUTRAL)
  @ApiOperation({ summary: 'Legacy GET /api/gyms/export' })
  async export() { return this.operationalService.exportGyms(); }

  @Get(':id')
  @Version(VERSION_NEUTRAL)
  @ApiOperation({ summary: 'Legacy GET /api/gyms/:id' })
  async findOne(@Param('id') id: string) { return await this.findService.findGymsById(id); }

  @Post()
  @Version(VERSION_NEUTRAL)
  @HttpCode(HttpStatus.CREATED)
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'Legacy POST /api/gyms' })
  async create(@Body() body: GymsCreateDto) { return this.createService.createGyms(body); }

  @Post('provision')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'Legacy POST /api/gyms/provision' })
  async provision(@Body() body: GymsProvisionDto) { return this.provisionService.provisionGym(body); }

  @Patch(':id')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'Legacy PATCH /api/gyms/:id' })
  async update(@Param('id') id: string, @Body() body: GymsUpdateDto) { return this.updateService.updateGyms(id, body); }

  @Delete(':id')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Legacy DELETE /api/gyms/:id' })
  async remove(@Param('id') id: string) { await this.deleteService.deleteGyms(id); }

  @Patch(':id/status')
  @Version(VERSION_NEUTRAL)
  @ApiOperation({ summary: 'Legacy PATCH /api/gyms/:id/status' })
  async changeStatus(@Param('id') id: string, @Body() body: { status: string }) { return this.statusService.changeGymsStatus(id, body.status); }

  @Post(':id/email')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'Legacy POST /api/gyms/:id/email' })
  async emailOwner(@Param('id') id: string, @Body() body: GymsOwnerEmailDto) { return this.operationalService.emailOwner(id, body.subject, body.message); }

  @Post(':id/impersonate')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'Legacy POST /api/gyms/:id/impersonate' })
  async impersonate(@Param('id') id: string) { return this.operationalService.impersonate(id); }
}

@ApiTags('Gyms-Special-Compatibility')
@Controller({ path: 'api/superadmin', version: VERSION_NEUTRAL })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class GymsSpecialCompatibilityController {
  constructor(
    private readonly businessControlsService: GymsBusinessControlsService,
    private readonly bulkActionService: GymsBulkActionService,
    private readonly detailBusinessOverviewService: GymsDetailBusinessOverviewService
  ) {}

  @Get('gyms/business-controls')
  @Version(VERSION_NEUTRAL)
  async businessControls(@Query() query: Record<string, string>) { return await this.businessControlsService.findGymsBusinessControls({ query }); }

  @Post('gyms/business-controls')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  async bulkAction(@Body() body: GymsBusinessControlsBulkActionDto) { return await this.bulkActionService.applyGymsBulkAction(body); }

  @Get('gym-detail/business-overview')
  @Version(VERSION_NEUTRAL)
  async detailBusinessOverview(@Query() query: Record<string, string>) { return await this.detailBusinessOverviewService.findGymsDetailBusinessOverview({ query }); }
}
