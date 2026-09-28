// RESPONSIBILITY: Owns all Trainer Earnings read endpoints.
// FLOW: HTTP /trainer/earnings* → query service → canonical response interceptor.

import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { TrainerEarningsHistoryResponseDto, TrainerEarningsKpisResponseDto, TrainerEarningsOverviewResponseDto, TrainerEarningsPendingPayoutResponseDto } from '@/backend_trainer/backend_trainer_modules/trainer_earnings/earnings_dtos/trainer-earnings-response.dto';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types';
import { CoreRoles } from '@/backend_trainer/backend_core/core_security/core-roles.decorator';
import { TrainerEarningsQueryDto } from '@/backend_trainer/backend_trainer_modules/trainer_earnings/earnings_dtos/trainer-earnings-query.dto';
import { TrainerEarningsQueryService } from '@/backend_trainer/backend_trainer_modules/trainer_earnings/earnings_services/trainer-earnings-query.service';


/**
 * Intent: Defines the TrainerEarningsQueryController boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@ApiTags('trainer/earnings')
@Controller('trainer/earnings')
export class TrainerEarningsQueryController {
  constructor(private readonly service: TrainerEarningsQueryService) {}

  // SLA: STANDARD
  @ApiOperation({ summary: 'Get Trainer earnings overview' })
  @Get()
  @CoreRoles(CoreRole.TRAINER)@ApiQuery({ type: TrainerEarningsQueryDto })

  @ApiResponse({ status: HttpStatus.OK, type: TrainerEarningsOverviewResponseDto })
  /** Returns the combined earnings page contract. */
  async list(@Query() query: TrainerEarningsQueryDto) {
    return this.service.findAll(query);
  }

  // SLA: STANDARD
  @ApiOperation({ summary: 'Get Trainer earnings KPIs' })
  @Get('kpis')
  @CoreRoles(CoreRole.TRAINER)@ApiQuery({ type: TrainerEarningsQueryDto })

  @ApiResponse({ status: HttpStatus.OK, type: TrainerEarningsKpisResponseDto })
  /** Returns only Trainer earnings KPI data. */
  async kpis(@Query() query: TrainerEarningsQueryDto) {
    return this.service.findKpis(query);
  }

  // SLA: STANDARD
  @ApiOperation({ summary: 'Get Trainer pending payouts' })
  @Get('pending')
  @CoreRoles(CoreRole.TRAINER)
  @ApiResponse({ status: HttpStatus.OK, type: TrainerEarningsPendingPayoutResponseDto, isArray: true })
  /** Returns pending payout rows. */
  async pending() {
    return this.service.findPendingPayouts();
  }

  // SLA: STANDARD
  @ApiOperation({ summary: 'Get Trainer earnings history' })
  @Get('history')
  @CoreRoles(CoreRole.TRAINER)@ApiQuery({ type: TrainerEarningsQueryDto })

  @ApiResponse({ status: HttpStatus.OK, type: TrainerEarningsHistoryResponseDto })
  /** Returns paginated history rows. */
  async history(@Query() query: TrainerEarningsQueryDto) {
    return this.service.findHistory(query);
  }
}
