// RESPONSIBILITY: Registers the isolated earnings feature slice and its controller/service/repository graph.
// FLOW: Nest bootstrap → TrainerEarningsModule → feature-owned providers/controllers.

import { Module } from '@nestjs/common';
import { TrainerEarningsQueryController } from '@/backend_trainer/backend_trainer_modules/trainer_earnings/earnings_controllers/trainer-earnings-query.controller'; import { TrainerEarningsQueryService } from '@/backend_trainer/backend_trainer_modules/trainer_earnings/earnings_services/trainer-earnings-query.service';  import { TrainerEarningsRepository } from '@/backend_trainer/backend_trainer_modules/trainer_earnings/earnings_repositories/trainer-earnings-repository';

/**
 * Intent: Defines the TrainerEarningsModule boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Module({controllers:[TrainerEarningsQueryController],providers:[TrainerEarningsQueryService,TrainerEarningsRepository]}) export class TrainerEarningsModule {}
