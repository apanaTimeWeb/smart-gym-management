// RESPONSIBILITY: Owns HTTP transport for the affiliates-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { AffiliatesCreateService } from '@/backend_superadmin/modules/superadmin/affiliates/services/affiliates-create.service';
import { AffiliatesCreateDto } from '@/backend_superadmin/modules/superadmin/affiliates/dtos/affiliates-create.dto';
import { AffiliatesUpdateService } from '@/backend_superadmin/modules/superadmin/affiliates/services/affiliates-update.service';
import { AffiliatesUpdateDto } from '@/backend_superadmin/modules/superadmin/affiliates/dtos/affiliates-update.dto';
import { AffiliatesDeleteService } from '@/backend_superadmin/modules/superadmin/affiliates/services/affiliates-delete.service';
import { AffiliatesStatusService } from '@/backend_superadmin/modules/superadmin/affiliates/services/affiliates-status.service';
import { AffiliatesPayoutService } from '@/backend_superadmin/modules/superadmin/affiliates/services/affiliates-payout.service';
import { AffiliatesStatusDto } from '@/backend_superadmin/modules/superadmin/affiliates/dtos/affiliates-status.dto';
import { AffiliatesResponseDto } from '@/backend_superadmin/modules/superadmin/affiliates/responses/affiliates-response.dto';

@ApiTags('affiliates')
@Controller('/superadmin/affiliates')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class AffiliatesCommandController {
  constructor(private readonly createService: AffiliatesCreateService, private readonly updateService: AffiliatesUpdateService, private readonly deleteService: AffiliatesDeleteService, private readonly statusService: AffiliatesStatusService, private readonly payoutService: AffiliatesPayoutService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create affiliates' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(RateLimitGuard)
  @ApiResponse({ type: AffiliatesResponseDto })
    async create(@Body() body: AffiliatesCreateDto): Promise<AffiliatesResponseDto> { return this.createService.createAffiliates(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update affiliates' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @UseGuards(RateLimitGuard)
  @ApiResponse({ type: AffiliatesResponseDto })
    async update(@Param('id') id: string, @Body() body: AffiliatesUpdateDto): Promise<AffiliatesResponseDto> { return this.updateService.updateAffiliates(id, body); }

  /** Pays the affiliate's current pending commission. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post(':id/pay')
  @ApiResponse({ type: AffiliatesResponseDto })
  async pay(@Param('id') id: string): Promise<AffiliatesResponseDto> { return this.payoutService.pay(id); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove affiliates' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(RateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteAffiliates(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus affiliates' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/status')
    @UseGuards(RateLimitGuard)
  @ApiResponse({ type: AffiliatesResponseDto })
    async changeStatus(@Param('id') id: string, @Body() body: AffiliatesStatusDto): Promise<AffiliatesResponseDto> { return this.statusService.changeAffiliatesStatus(id, body.status); }

}