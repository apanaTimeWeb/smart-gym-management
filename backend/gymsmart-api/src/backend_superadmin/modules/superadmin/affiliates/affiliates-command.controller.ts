// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the affiliates feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
import { AffiliatesResponseDto } from '@/backend_superadmin/modules/superadmin/affiliates/responses/affiliates-response.dto';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('affiliates')
@Controller('/superadmin/affiliates')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class AffiliatesCommandController {
  constructor(private readonly createService: AffiliatesCreateService, private readonly updateService: AffiliatesUpdateService, private readonly deleteService: AffiliatesDeleteService, private readonly statusService: AffiliatesStatusService, private readonly payoutService: AffiliatesPayoutService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create affiliates' })
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    @ApiResponse({ type: AffiliatesResponseDto })
    async create(@Body() body: AffiliatesCreateDto): Promise<AffiliatesResponseDto> { return this.createService.createAffiliates(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update affiliates' })
  @Patch(':id')
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    @ApiResponse({ type: AffiliatesResponseDto })
    async update(@Param('id') id: string, @Body() body: AffiliatesUpdateDto): Promise<AffiliatesResponseDto> { return this.updateService.updateAffiliates(id, body); }

  /** Pays the affiliate's current pending commission. */
  @RequireIdempotencyKey()
  @Post(':id/pay')
  @ApiResponse({ type: AffiliatesResponseDto })
  async pay(@Param('id') id: string): Promise<AffiliatesResponseDto> { return this.payoutService.pay(id); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove affiliates' })
  @Delete(':id')
    @UseGuards(RateLimitGuard)
    @RequireIdempotencyKey()
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteAffiliates(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus affiliates' })
  @Patch(':id/status')
    @UseGuards(RateLimitGuard)
    @ApiResponse({ type: AffiliatesResponseDto })
    async changeStatus(@Param('id') id: string, @Body() body: { status: string }): Promise<AffiliatesResponseDto> { return this.statusService.changeAffiliatesStatus(id, body.status); }

}
