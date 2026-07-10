import { Staff } from '@/modules/erp/hr/entities/staff.entity';
import { Payroll } from '@/modules/erp/hr/entities/payroll.entity';

export interface HrResponse {
  message: string;
  data: Staff | Staff[] | Payroll | Payroll[] | HrSummary | any;
}

export interface HrSummary {
  totalStaff: number;
  activeStaff: number;
  totalPayrollThisMonth: number;
  paidCount: number;
  pendingCount: number;
}
