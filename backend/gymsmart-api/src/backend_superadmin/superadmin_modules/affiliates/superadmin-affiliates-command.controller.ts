// RESPONSIBILITY: Owns HTTP transport for the affiliates-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminRateLimitGuard } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-rate-limit.guard';
import { SuperadminAffiliatesCreateService } from '@/backend_superadmin/superadmin_modules/affiliates/services/superadmin-affiliates-create.service';
import { SuperadminAffiliatesCreateDto } from '@/backend_superadmin/superadmin_modules/affiliates/dtos/superadmin-affiliates-create.dto';
import { SuperadminAffiliatesUpdateService } from '@/backend_superadmin/superadmin_modules/affiliates/services/superadmin-affiliates-update.service';
import { SuperadminAffiliatesUpdateDto } from '@/backend_superadmin/superadmin_modules/affiliates/dtos/superadmin-affiliates-update.dto';
import { SuperadminAffiliatesDeleteService } from '@/backend_superadmin/superadmin_modules/affiliates/services/superadmin-affiliates-delete.service';
import { SuperadminAffiliatesStatusService } from '@/backend_superadmin/superadmin_modules/affiliates/services/superadmin-affiliates-status.service';
import { SuperadminAffiliatesPayoutService } from '@/backend_superadmin/superadmin_modules/affiliates/services/superadmin-affiliates-payout.service';
import { SuperadminAffiliatesStatusDto } from '@/backend_superadmin/superadmin_modules/affiliates/dtos/superadmin-affiliates-status.dto';
import { SuperadminAffiliatesResponseDto } from '@/backend_superadmin/superadmin_modules/affiliates/responses/superadmin-affiliates-response.dto';

@ApiTags('affiliates')
@Controller('/superadmin/affiliates')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminAffiliatesCommandController {
  constructor(private readonly createService: SuperadminAffiliatesCreateService, private readonly updateService: SuperadminAffiliatesUpdateService, private readonly deleteService: SuperadminAffiliatesDeleteService, private readonly statusService: SuperadminAffiliatesStatusService, private readonly payoutService: SuperadminAffiliatesPayoutService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create affiliates' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminAffiliatesResponseDto })
    async create(@Body() body: SuperadminAffiliatesCreateDto): Promise<SuperadminAffiliatesResponseDto> { return this.createService.createAffiliates(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update affiliates' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminAffiliatesResponseDto })
    async update(@Param('id') id: string, @Body() body: SuperadminAffiliatesUpdateDto): Promise<SuperadminAffiliatesResponseDto> { return this.updateService.updateAffiliates(id, body); }

  /** Pays the affiliate's current pending commission. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post(':id/pay')
  @ApiResponse({ type: SuperadminAffiliatesResponseDto })
  async pay(@Param('id') id: string): Promise<SuperadminAffiliatesResponseDto> { return this.payoutService.pay(id); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove affiliates' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteAffiliates(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus affiliates' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/status')
    @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminAffiliatesResponseDto })
    async changeStatus(@Param('id') id: string, @Body() body: SuperadminAffiliatesStatusDto): Promise<SuperadminAffiliatesResponseDto> { return this.statusService.changeAffiliatesStatus(id, body.status); }

}