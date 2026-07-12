import { Module } from '@nestjs/common';


import { Member } from '@/modules/erp/members/entities/member.entity';
import { Payment } from '@/modules/erp/finance/entities/payment.entity';
import { Staff } from '@/modules/erp/hr/entities/staff.entity';
import { Product } from '@/modules/erp/store/entities/product.entity';
import { Inquiry } from '@/modules/erp/inquiries/entities/inquiry.entity';

import { DashboardRepository } from './dashboard.repository';

import { DashboardKpiController } from './controllers/dashboard-kpi.controller';
import { DashboardChartsController } from './controllers/dashboard-charts.controller';
import { DashboardRecentController } from './controllers/dashboard-recent.controller';

import { DashboardKpiService } from './services/dashboard-kpi.service';
import { DashboardChartsService } from './services/dashboard-charts.service';
import { DashboardRecentService } from './services/dashboard-recent.service';

@Module({
  imports: [
    
  ],
  controllers: [
    DashboardKpiController,
    DashboardChartsController,
    DashboardRecentController,
  ],
  providers: [
    DashboardRepository,
    DashboardKpiService,
    DashboardChartsService,
    DashboardRecentService,
  ],
})
export class DashboardModule {}
