// RESPONSIBILITY: Owns HTTP transport for the affiliates-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { AffiliatesQueryDto } from '@/backend_superadmin/modules/superadmin/affiliates/dtos/affiliates-query.dto';
import { AffiliatesListService } from '@/backend_superadmin/modules/superadmin/affiliates/services/affiliates-list.service';
import { AffiliatesFindService } from '@/backend_superadmin/modules/superadmin/affiliates/services/affiliates-find.service';
import { AffiliatesPayoutService } from '@/backend_superadmin/modules/superadmin/affiliates/services/affiliates-payout.service';
import { AffiliatesResponseDto, AffiliatePayoutRecordDto } from '@/backend_superadmin/modules/superadmin/affiliates/responses/affiliates-response.dto';

@ApiTags('affiliates')
@Controller('/superadmin/affiliates')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class AffiliatesQueryController {
  constructor(private readonly listService: AffiliatesListService, private readonly findService: AffiliatesFindService, private readonly payoutService: AffiliatesPayoutService) {}
  /** Returns payout history across active affiliates. */
  // SLA: FAST
  @Get('payout-history')
  @ApiResponse({ type: [AffiliatePayoutRecordDto] })
  async payoutHistory(): Promise<AffiliatePayoutRecordDto[]> { return this.payoutService.history(); }

  /** Returns a paginated affiliates list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ type: [AffiliatesResponseDto] })
  async findAll(@Query() query: AffiliatesQueryDto): Promise<unknown> { return await this.listService.findAffiliatesPage(query); }
  /** Returns one affiliates record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: AffiliatesResponseDto })
  async findOne(@Param('id') id: string): Promise<AffiliatesResponseDto> { return await this.findService.findAffiliatesById(id); }
}