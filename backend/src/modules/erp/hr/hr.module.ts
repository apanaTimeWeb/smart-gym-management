import { Module } from '@nestjs/common';


import { Staff } from '@/modules/erp/hr/entities/staff.entity';
import { Payroll } from '@/modules/erp/hr/entities/payroll.entity';
import { HrRepository } from '@/modules/erp/hr/hr.repository';

import { StaffService } from '@/modules/erp/hr/services/staff.service';
import { PayrollService } from '@/modules/erp/hr/services/payroll.service';
import { HrStatsService } from '@/modules/erp/hr/services/hr-stats.service';

import { StaffController } from '@/modules/erp/hr/controllers/staff.controller';
import { PayrollController } from '@/modules/erp/hr/controllers/payroll.controller';
import { HrStatsController } from '@/modules/erp/hr/controllers/hr-stats.controller';

@Module({
  imports: [],
  controllers: [StaffController, PayrollController, HrStatsController],
  providers: [HrRepository, StaffService, PayrollService, HrStatsService],
})
export class HrModule {}
