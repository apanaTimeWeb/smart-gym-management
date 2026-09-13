import type { Staff, Payroll, HrSummary } from '@/app/manager/hr/hr_types/ManagerHrTypes';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { useManagerHrStaffMutations } from '@/app/manager/hr/hr_context/useManagerHrStaffMutations';
import { useManagerHrPayrollMutations } from '@/app/manager/hr/hr_context/useManagerHrPayrollMutations';

export function useManagerHrMutations(
  staff: Staff[],
  payrolls: Payroll[],
  setStaff: React.Dispatch<React.SetStateAction<Staff[]>>,
  setPayrolls: React.Dispatch<React.SetStateAction<Payroll[]>>,
  setSummary: React.Dispatch<React.SetStateAction<HrSummary | null>>,
  editId: string | null,
  setShowModal: (s: boolean) => void,
  setShowPayrollModal: (s: boolean) => void,
  setSaving: (s: boolean) => void,
  showToast: (msg: string, t: ToastType) => void
) {
  const staffMutations = useManagerHrStaffMutations(
    staff, setStaff, setSummary, editId, setShowModal, setSaving, showToast
  );

  const payrollMutations = useManagerHrPayrollMutations(
    staff, payrolls, setStaff, setPayrolls, setSummary, setShowPayrollModal, setSaving, showToast
  );

  return {
    ...staffMutations,
    ...payrollMutations
  };
}
