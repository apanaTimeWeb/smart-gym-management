import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Payment } from '@/modules/erp/finance/entities/payment.entity';
import { Member } from '@/modules/erp/members/entities/member.entity';
import { FinanceRepository } from '@/modules/erp/finance/finance.repository';

import { PaymentService } from '@/modules/erp/finance/services/payment.service';
import { FinanceSummaryService } from '@/modules/erp/finance/services/finance-summary.service';
import { MemberRegisteredListener } from './listeners/member-registered.listener';

import { PaymentController } from '@/modules/erp/finance/controllers/payment.controller';
import { FinanceSummaryController } from '@/modules/erp/finance/controllers/finance-summary.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Member])],
  controllers: [PaymentController, FinanceSummaryController],
  providers: [
    FinanceRepository,
    PaymentService,
    FinanceSummaryService,
    MemberRegisteredListener,
  ],
})
export class FinanceModule {}
