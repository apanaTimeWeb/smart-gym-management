// RESPONSIBILITY: Provides optional Trainer-local infrastructure exports without redefining master or global application connections.
// FLOW: TrainerDomainModule → CoreInfrastructureModule exports → feature modules.

import { Module } from '@nestjs/common';
import { CoreInfrastructureModule } from '@/backend_trainer/backend_core/core-infrastructure.module';


/**
 * Intent: Defines the TrainerCoreModule boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Module({
  imports: [CoreInfrastructureModule],
  exports: [CoreInfrastructureModule],
})
export class TrainerCoreModule {}
