import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '@/modules/members/entities/member.entity';
import { Payment } from '@/modules/finance/entities/payment.entity';
import { Plan } from '@/modules/plans/entities/plan.entity';

import { SalesRepository } from './sales.repository';

import { SalesOverviewController } from './controllers/sales-overview.controller';
import { SalesMembershipReportController } from './controllers/sales-membership-report.controller';
import { SalesPendingPaymentsController } from './controllers/sales-pending-payments.controller';
import { SalesAllMembershipsController } from './controllers/sales-all-memberships.controller';

import { SalesOverviewService } from './services/sales-overview.service';
import { SalesMembershipReportService } from './services/sales-membership-report.service';
import { SalesPendingPaymentsService } from './services/sales-pending-payments.service';
import { SalesAllMembershipsService } from './services/sales-all-memberships.service';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Payment, Plan])],
  controllers: [
    SalesOverviewController,
    SalesMembershipReportController,
    SalesPendingPaymentsController,
    SalesAllMembershipsController,
  ],
  providers: [
    SalesRepository,
    SalesOverviewService,
    SalesMembershipReportService,
    SalesPendingPaymentsService,
    SalesAllMembershipsService,
  ],
})
export class SalesModule {}
