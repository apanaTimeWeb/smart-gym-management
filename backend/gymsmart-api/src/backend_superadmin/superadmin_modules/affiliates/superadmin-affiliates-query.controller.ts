// RESPONSIBILITY: Owns HTTP transport for the affiliates-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminAffiliatesQueryDto } from '@/backend_superadmin/superadmin_modules/affiliates/dtos/superadmin-affiliates-query.dto';
import { SuperadminAffiliatesListService } from '@/backend_superadmin/superadmin_modules/affiliates/services/superadmin-affiliates-list.service';
import { SuperadminAffiliatesFindService } from '@/backend_superadmin/superadmin_modules/affiliates/services/superadmin-affiliates-find.service';
import { SuperadminAffiliatesPayoutService } from '@/backend_superadmin/superadmin_modules/affiliates/services/superadmin-affiliates-payout.service';
import { SuperadminAffiliatesResponseDto, SuperadminAffiliatePayoutRecordDto } from '@/backend_superadmin/superadmin_modules/affiliates/responses/superadmin-affiliates-response.dto';

@ApiTags('affiliates')
@Controller('/superadmin/affiliates')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminAffiliatesQueryController {
  constructor(private readonly listService: SuperadminAffiliatesListService, private readonly findService: SuperadminAffiliatesFindService, private readonly payoutService: SuperadminAffiliatesPayoutService) {}
  /** Returns payout history across active affiliates. */
  // SLA: FAST
  @Get('payout-history')
  @ApiResponse({ type: [SuperadminAffiliatePayoutRecordDto] })
  async payoutHistory(): Promise<SuperadminAffiliatePayoutRecordDto[]> { return this.payoutService.history(); }

  /** Returns a paginated affiliates list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ type: [SuperadminAffiliatesResponseDto] })
  async findAll(@Query() query: SuperadminAffiliatesQueryDto): Promise<unknown> { return await this.listService.findAffiliatesPage(query); }
  /** Returns one affiliates record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: SuperadminAffiliatesResponseDto })
  async findOne(@Param('id') id: string): Promise<SuperadminAffiliatesResponseDto> { return await this.findService.findAffiliatesById(id); }
}