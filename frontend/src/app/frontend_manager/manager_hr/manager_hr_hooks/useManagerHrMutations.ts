import { useManagerHrPayrollMutations } from '@/app/frontend_manager/manager_hr/manager_hr_hooks/useManagerHrPayrollMutations';
import { useManagerHrStaffMutations } from '@/app/frontend_manager/manager_hr/manager_hr_hooks/useManagerHrStaffMutations';
import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';
import type { Staff, Payroll } from '@/app/frontend_manager/manager_hr/manager_hr_types/ManagerHrTypes';



/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates hr feature state and its documented UI/API boundary through useManagerHrMutations.
 * @dependencies Uses useManagerHrPayrollMutations, useManagerHrStaffMutations, ManagerHrTypes, ManagerToastTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerHrMutations owns the hr feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerHrMutations(
  staff: Staff[],
  payrolls: Payroll[],
  editId: string | null,
  setShowModal: (value: boolean) => void,
  setShowPayrollModal: (value: boolean) => void,
  setSaving: (value: boolean) => void,
  showToast: (message: string, type: ManagerToastType) => void,
) {
  const staffMutations = useManagerHrStaffMutations(staff, editId, setShowModal, setSaving, showToast);
  const payrollMutations = useManagerHrPayrollMutations(staff, payrolls, setShowPayrollModal, setSaving, showToast);

  return { ...staffMutations, ...payrollMutations };
}
