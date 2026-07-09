import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Payment } from '@/modules/finance/entities/payment.entity';
import { Member } from '@/modules/members/entities/member.entity';
import { FinanceRepository } from '@/modules/finance/services/finance.repository';

import { PaymentService } from '@/modules/finance/services/payment.service';
import { FinanceSummaryService } from '@/modules/finance/services/finance-summary.service';
import { MemberRegisteredListener } from './listeners/member-registered.listener';

import { PaymentController } from '@/modules/finance/controllers/payment.controller';
import { FinanceSummaryController } from '@/modules/finance/controllers/finance-summary.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Member])],
  controllers: [
    PaymentController,
    FinanceSummaryController,
  ],
  providers: [
    FinanceRepository,
    PaymentService,
    FinanceSummaryService,
    MemberRegisteredListener,
  ],
})
export class FinanceModule {}
