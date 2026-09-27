// RESPONSIBILITY: Owns the backend application module type/interface contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import type { ManagerCoreJsonObject, ManagerCoreJsonValue } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface HrDomainData { id:string; payload:ManagerCoreJsonObject; }
export interface HrPayrollDeductions { [key:string]: ManagerCoreJsonValue; }

import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';

export interface HrSummaryData {
  totalSalaryThisMonth: number;
  totalSalaryPaid: number;
  totalSalaryDue: number;
  totalAdvanceGiven: number;
  pendingPaymentsCount: number;
  totalStaff: number;
  activeStaff: number;
  totalPayrollThisMonth: number;
  paidCount: number;
  currency: string;
}

export interface HrListResult { data: HrDomainData[]; meta: PaginationMeta; }
