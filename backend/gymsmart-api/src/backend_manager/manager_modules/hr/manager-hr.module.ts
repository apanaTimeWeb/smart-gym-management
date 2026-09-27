// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';
import { ManagerHrMutationService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-mutation.service';
import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
import { ManagerHrAuthorizationService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-authorization.service';

import { ManagerHrCommandController } from '@/backend_manager/manager_modules/hr/manager-hr-command.controller';
import { ManagerHrQueryController } from '@/backend_manager/manager_modules/hr/manager-hr-query.controller';
import { ManagerHrRepository } from '@/backend_manager/manager_modules/hr/manager-hr.repository';
import { ManagerHrCreatePayrollService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-create-payroll.service';
import { ManagerHrCreateStaffService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-create-staff.service';
import { ManagerHrDeleteStaffService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-delete-staff.service';
import { ManagerHrFindHrSummaryService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-find-hr-summary.service';
import { ManagerHrFindLedgerService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-find-ledger.service';
import { ManagerHrFindPayrollsService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-find-payrolls.service';
import { ManagerHrFindStaffAttendanceService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-find-staff-attendance.service';
import { ManagerHrFindStaffByIdService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-find-staff-by-id.service';
import { ManagerHrFindStaffService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-find-staff.service';
import { ManagerHrGeneratePayrollsService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-generate-payrolls.service';
import { ManagerHrGiveStaffAdvanceService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-give-staff-advance.service';
import { ManagerHrOrchestratorService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-orchestrator.service';
import { ManagerHrPayStaffDueService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-pay-staff-due.service';
import { ManagerHrUpdatePayrollStatusService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-update-payroll-status.service';
import { ManagerHrUpdatePayrollService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-update-payroll.service';
import { ManagerHrUpdateStaffService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-update-staff.service';

@Module({
  controllers: [ManagerHrQueryController, ManagerHrCommandController],
  providers: [ManagerHrMutationService, ManagerHrCreateStaffService, ManagerHrUpdateStaffService, ManagerHrDeleteStaffService, ManagerHrGeneratePayrollsService, ManagerHrCreatePayrollService, ManagerHrUpdatePayrollService, ManagerHrUpdatePayrollStatusService, ManagerHrGiveStaffAdvanceService, ManagerHrPayStaffDueService, ManagerHrFindStaffService, ManagerHrFindStaffByIdService, ManagerHrFindPayrollsService, ManagerHrFindHrSummaryService, ManagerHrFindLedgerService, ManagerHrFindStaffAttendanceService, ManagerHrRepository, ManagerHrOrchestratorService,
  ManagerHrAuthorizationService,
  { provide: `CORE_RESOURCE_AUTHORIZER:hr`, useFactory: (authorization: ManagerHrAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('hr', authorization); return authorization; }, inject: [ManagerHrAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
  ],
  exports: [ManagerHrRepository],
})
export class ManagerHrModule {}

export { ManagerHrModule as HrModule };
