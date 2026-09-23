// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';

import { HrCommandController } from '@/backend_manager/modules/backend_manager/hr/hr-command.controller';
import { HrQueryController } from '@/backend_manager/modules/backend_manager/hr/hr-query.controller';
import { HrRepository } from '@/backend_manager/modules/backend_manager/hr/repositories/hr-repository';
import { HrCreatePayrollService } from '@/backend_manager/modules/backend_manager/hr/services/hr-create-payroll.service';
import { HrCreateStaffService } from '@/backend_manager/modules/backend_manager/hr/services/hr-create-staff.service';
import { HrDeleteStaffService } from '@/backend_manager/modules/backend_manager/hr/services/hr-delete-staff.service';
import { HrFetchHrSummaryService } from '@/backend_manager/modules/backend_manager/hr/services/hr-fetch-hr-summary.service';
import { HrFetchLedgerService } from '@/backend_manager/modules/backend_manager/hr/services/hr-fetch-ledger.service';
import { HrFetchPayrollsService } from '@/backend_manager/modules/backend_manager/hr/services/hr-fetch-payrolls.service';
import { HrFetchStaffAttendanceService } from '@/backend_manager/modules/backend_manager/hr/services/hr-fetch-staff-attendance.service';
import { HrFetchStaffByIdService } from '@/backend_manager/modules/backend_manager/hr/services/hr-fetch-staff-by-id.service';
import { HrFetchStaffService } from '@/backend_manager/modules/backend_manager/hr/services/hr-fetch-staff.service';
import { HrGeneratePayrollsService } from '@/backend_manager/modules/backend_manager/hr/services/hr-generate-payrolls.service';
import { HrGiveStaffAdvanceService } from '@/backend_manager/modules/backend_manager/hr/services/hr-give-staff-advance.service';
import { HrOrchestratorService } from '@/backend_manager/modules/backend_manager/hr/services/hr-orchestrator.service';
import { HrPayStaffDueService } from '@/backend_manager/modules/backend_manager/hr/services/hr-pay-staff-due.service';
import { HrUpdatePayrollStatusService } from '@/backend_manager/modules/backend_manager/hr/services/hr-update-payroll-status.service';
import { HrUpdatePayrollService } from '@/backend_manager/modules/backend_manager/hr/services/hr-update-payroll.service';
import { HrUpdateStaffService } from '@/backend_manager/modules/backend_manager/hr/services/hr-update-staff.service';

@Module({
  controllers: [HrQueryController, HrCommandController],
  providers: [HrCreateStaffService, HrUpdateStaffService, HrDeleteStaffService, HrGeneratePayrollsService, HrCreatePayrollService, HrUpdatePayrollService, HrUpdatePayrollStatusService, HrGiveStaffAdvanceService, HrPayStaffDueService, HrFetchStaffService, HrFetchStaffByIdService, HrFetchPayrollsService, HrFetchHrSummaryService, HrFetchLedgerService, HrFetchStaffAttendanceService, HrRepository, HrOrchestratorService],
  exports: [HrRepository],
})
export class HrModule {}
