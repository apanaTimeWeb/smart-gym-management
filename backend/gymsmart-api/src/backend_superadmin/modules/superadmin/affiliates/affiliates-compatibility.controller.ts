// RESPONSIBILITY: Preserves the legacy frontend API namespace during the contract transition for Affiliates.
// FLOW: /superadmin/affiliates -> compatibility controller -> same orchestrators/services as /api/v1/superadmin/affiliates.

import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Version, VERSION_NEUTRAL, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';

import { AffiliatesQueryDto } from '@/backend_superadmin/modules/superadmin/affiliates/dtos/affiliates-query.dto';
import { AffiliatesListService } from '@/backend_superadmin/modules/superadmin/affiliates/services/affiliates-list.service';
import { AffiliatesFindService } from '@/backend_superadmin/modules/superadmin/affiliates/services/affiliates-find.service';
import { AffiliatesPayoutService } from '@/backend_superadmin/modules/superadmin/affiliates/services/affiliates-payout.service';

import { AffiliatesCreateDto } from '@/backend_superadmin/modules/superadmin/affiliates/dtos/affiliates-create.dto';
import { AffiliatesUpdateDto } from '@/backend_superadmin/modules/superadmin/affiliates/dtos/affiliates-update.dto';
import { AffiliatesCreateService } from '@/backend_superadmin/modules/superadmin/affiliates/services/affiliates-create.service';
import { AffiliatesUpdateService } from '@/backend_superadmin/modules/superadmin/affiliates/services/affiliates-update.service';
import { AffiliatesStatusService } from '@/backend_superadmin/modules/superadmin/affiliates/services/affiliates-status.service';
import { AffiliatesDeleteService } from '@/backend_superadmin/modules/superadmin/affiliates/services/affiliates-delete.service';

@ApiTags('Affiliates-Compatibility')
@Controller({ path: 'superadmin/affiliates', version: VERSION_NEUTRAL })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class AffiliatesCompatibilityController {
  constructor(
    private readonly listService: AffiliatesListService,
    private readonly findService: AffiliatesFindService,
    private readonly payoutService: AffiliatesPayoutService,
    private readonly createService: AffiliatesCreateService,
    private readonly updateService: AffiliatesUpdateService,
    private readonly statusService: AffiliatesStatusService,
    private readonly deleteService: AffiliatesDeleteService
  ) {}

  @Get('payout-history')
  @Version(VERSION_NEUTRAL)
  async payoutHistory() { return this.payoutService.history(); }

  @Get()
  @Version(VERSION_NEUTRAL)
  async findAll(@Query() query: AffiliatesQueryDto) { return await this.listService.findAffiliatesPage(query); }

  @Get(':id')
  @Version(VERSION_NEUTRAL)
  async findOne(@Param('id') id: string) { return await this.findService.findAffiliatesById(id); }

  @Post()
  @Version(VERSION_NEUTRAL)
  @HttpCode(HttpStatus.CREATED)
  @RequireIdempotencyKey()
  async create(@Body() body: AffiliatesCreateDto) { return this.createService.createAffiliates(body); }

  @Patch(':id')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  async update(@Param('id') id: string, @Body() body: AffiliatesUpdateDto) { return this.updateService.updateAffiliates(id, body); }

  @Patch(':id/status')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  async changeStatus(@Param('id') id: string, @Body() body: { status: string }) { return this.statusService.changeAffiliatesStatus(id, body.status); }

  @Delete(':id')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) { await this.deleteService.deleteAffiliates(id); }

  @Post(':id/pay')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  async pay(@Param('id') id: string) { return this.payoutService.pay(id); }
}
