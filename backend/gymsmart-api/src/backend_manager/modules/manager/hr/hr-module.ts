// RESPONSIBILITY: Registers the isolated Manager hr feature boundary.
// FLOW: ManagerDomainModule -> HrModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { HrCommandController } from '@/modules/manager/hr/hr-command.controller';
import { HrCreatePayrollService } from '@/modules/manager/hr/services/hr-create-payroll.service';
import { HrCreateStaffService } from '@/modules/manager/hr/services/hr-create-staff.service';
import { HrDeleteStaffService } from '@/modules/manager/hr/services/hr-delete-staff.service';
import { HrFetchHrSummaryService } from '@/modules/manager/hr/services/hr-fetch-hr-summary.service';
import { HrFetchLedgerService } from '@/modules/manager/hr/services/hr-fetch-ledger.service';
import { HrFetchPayrollsService } from '@/modules/manager/hr/services/hr-fetch-payrolls.service';
import { HrFetchStaffAttendanceService } from '@/modules/manager/hr/services/hr-fetch-staff-attendance.service';
import { HrFetchStaffByIdService } from '@/modules/manager/hr/services/hr-fetch-staff-by-id.service';
import { HrFetchStaffService } from '@/modules/manager/hr/services/hr-fetch-staff.service';
import { HrGeneratePayrollsService } from '@/modules/manager/hr/services/hr-generate-payrolls.service';
import { HrGiveStaffAdvanceService } from '@/modules/manager/hr/services/hr-give-staff-advance.service';
import { HrOrchestratorService } from '@/modules/manager/hr/services/hr-orchestrator.service';
import { HrPayStaffDueService } from '@/modules/manager/hr/services/hr-pay-staff-due.service';
import { HrQueryController } from '@/modules/manager/hr/hr-query.controller';
import { HrRepository } from '@/modules/manager/hr/repositories/hr-repository';
import { HrUpdatePayrollService } from '@/modules/manager/hr/services/hr-update-payroll.service';
import { HrUpdatePayrollStatusService } from '@/modules/manager/hr/services/hr-update-payroll-status.service';
import { HrUpdateStaffService } from '@/modules/manager/hr/services/hr-update-staff.service';

@Module({
  controllers: [HrQueryController, HrCommandController],
  providers: [HrCreateStaffService, HrUpdateStaffService, HrDeleteStaffService, HrGeneratePayrollsService, HrCreatePayrollService, HrUpdatePayrollService, HrUpdatePayrollStatusService, HrGiveStaffAdvanceService, HrPayStaffDueService, HrFetchStaffService, HrFetchStaffByIdService, HrFetchPayrollsService, HrFetchHrSummaryService, HrFetchLedgerService, HrFetchStaffAttendanceService, HrRepository, HrOrchestratorService],
  exports: [HrRepository],
})
export class HrModule {}
