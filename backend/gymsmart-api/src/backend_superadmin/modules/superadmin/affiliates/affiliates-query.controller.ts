// RESPONSIBILITY: Owns GET endpoints for the affiliates feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { AffiliatesQueryDto } from '@/backend_superadmin/modules/superadmin/affiliates/dtos/affiliates-query.dto';
import { AffiliatesListService } from '@/backend_superadmin/modules/superadmin/affiliates/services/affiliates-list.service';
import { AffiliatesFindService } from '@/backend_superadmin/modules/superadmin/affiliates/services/affiliates-find.service';
import { AffiliatesPayoutService } from '@/backend_superadmin/modules/superadmin/affiliates/services/affiliates-payout.service';
import { AffiliatesResponseDto, AffiliatePayoutRecordDto } from '@/backend_superadmin/modules/superadmin/affiliates/responses/affiliates-response.dto';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('affiliates')
@Controller('/superadmin/affiliates')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class AffiliatesQueryController {
  constructor(private readonly listService: AffiliatesListService, private readonly findService: AffiliatesFindService, private readonly payoutService: AffiliatesPayoutService) {}
  /** Returns payout history across active affiliates. */
  // SLA: STANDARD
  @Get('payout-history')
  @ApiResponse({ type: [AffiliatePayoutRecordDto] })
  async payoutHistory(): Promise<AffiliatePayoutRecordDto[]> { return this.payoutService.history(); }

  /** Returns a paginated affiliates list. */
  // SLA: STANDARD
  @Get()
  @ApiResponse({ type: [AffiliatesResponseDto] })
  async findAll(@Query() query: AffiliatesQueryDto): Promise<AffiliatesResponseDto[]> { return await this.listService.findAffiliatesPage(query); }
  /** Returns one affiliates record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: AffiliatesResponseDto })
  async findOne(@Param('id') id: string): Promise<AffiliatesResponseDto> { return await this.findService.findAffiliatesById(id); }
}
