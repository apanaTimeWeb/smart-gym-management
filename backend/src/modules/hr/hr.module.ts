import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Staff } from '@/modules/hr/entities/staff.entity';
import { Payroll } from '@/modules/hr/entities/payroll.entity';
import { HrRepository } from '@/modules/hr/services/hr.repository';

import { StaffService } from '@/modules/hr/services/staff.service';
import { PayrollService } from '@/modules/hr/services/payroll.service';
import { HrStatsService } from '@/modules/hr/services/hr-stats.service';

import { StaffController } from '@/modules/hr/controllers/staff.controller';
import { PayrollController } from '@/modules/hr/controllers/payroll.controller';
import { HrStatsController } from '@/modules/hr/controllers/hr-stats.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, Payroll])],
  controllers: [
    StaffController,
    PayrollController,
    HrStatsController,
  ],
  providers: [
    HrRepository,
    StaffService,
    PayrollService,
    HrStatsService,
  ],
})
export class HrModule {}
