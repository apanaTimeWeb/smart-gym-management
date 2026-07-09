import { Staff } from '@/modules/hr/entities/staff.entity';
import { Payroll } from '@/modules/hr/entities/payroll.entity';

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
