import { Module } from '@nestjs/common';
import { AttendanceModule } from '@/modules/erp/attendance/attendance.module';
import { AuditModule } from '@/modules/erp/audit/audit.module';
import { DashboardModule } from '@/modules/erp/dashboard/dashboard.module';
import { FinanceModule } from '@/modules/erp/finance/finance.module';
import { HrModule } from '@/modules/erp/hr/hr.module';
import { InquiriesModule } from '@/modules/erp/inquiries/inquiries.module';
import { LibraryModule } from '@/modules/erp/library/library.module';
import { MembersModule } from '@/modules/erp/members/members.module';
import { PlansModule } from '@/modules/erp/plans/plans.module';
import { SalesModule } from '@/modules/erp/sales/sales.module';
import { SettingsModule } from '@/modules/erp/settings/settings.module';
import { StoreModule } from '@/modules/erp/store/store.module';
import { WorkoutModule } from '@/modules/erp/workout/workout.module';

@Module({
  imports: [
    AttendanceModule,
    AuditModule,
    DashboardModule,
    FinanceModule,
    HrModule,
    InquiriesModule,
    LibraryModule,
    MembersModule,
    PlansModule,
    SalesModule,
    SettingsModule,
    StoreModule,
    WorkoutModule,
  ],
})
export class ErpModule {}
