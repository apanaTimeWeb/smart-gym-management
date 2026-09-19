// DATA FLOW: HR UI → feature mutation hooks → ManagerHrApi → TanStack Query cache → HR UI.
/** Manages UseHrMutations for the Manager module. */
import type { Staff, Payroll, HrSummary } from '@/app/manager/hr/hr_types/ManagerHrTypes';
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';
import { useManagerHrStaffMutations } from '@/app/manager/hr/hr_hooks/ManagerUseManagerHrStaffMutations';
import { useManagerHrPayrollMutations } from '@/app/manager/hr/hr_hooks/ManagerUseManagerHrPayrollMutations';

type ManagerStaffUpdater = (updater: Staff[] | ((previous: Staff[]) => Staff[])) => void;
type ManagerPayrollUpdater = (updater: Payroll[] | ((previous: Payroll[]) => Payroll[])) => void;
type ManagerSummaryUpdater = (updater: HrSummary | null | ((previous: HrSummary | null) => HrSummary | null)) => void;

export function useManagerHrMutations(
  staff: Staff[],
  payrolls: Payroll[],
  setStaff: ManagerStaffUpdater,
  setPayrolls: ManagerPayrollUpdater,
  setSummary: ManagerSummaryUpdater,
  editId: string | null,
  setShowModal: (value: boolean) => void,
  setShowPayrollModal: (value: boolean) => void,
  setSaving: (value: boolean) => void,
  showToast: (message: string, type: ManagerToastType) => void,
) {
  const staffMutations = useManagerHrStaffMutations(staff, setStaff, setSummary, editId, setShowModal, setSaving, showToast);
  const payrollMutations = useManagerHrPayrollMutations(staff, payrolls, setStaff, setPayrolls, setSummary, setShowPayrollModal, setSaving, showToast);

  return { ...staffMutations, ...payrollMutations };
}
