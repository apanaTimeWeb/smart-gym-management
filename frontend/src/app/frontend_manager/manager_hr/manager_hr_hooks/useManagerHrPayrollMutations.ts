'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerHrApi } from '@/app/frontend_manager/manager_hr/manager_hr_api/ManagerHrApi';
import { ManagerHrQueryKeys } from '@/app/frontend_manager/manager_hr/manager_hr_constants/ManagerHrQueryKeys';
import { HR_PENDING_STATUS } from '@/app/frontend_manager/manager_hr/manager_hr_constants/ManagerHrSharedConstants';
import { downloadManagerHrStaffCsv, printManagerHrPayslip } from '@/app/frontend_manager/manager_hr/manager_hr_utils/ManagerHrExportUtils';
import { toManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/ManagerMoney';
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/frontend_manager/manager_infrastructure/ManagerErrorMessage';
import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';
import type { Staff, Payroll } from '@/app/frontend_manager/manager_hr/manager_hr_types/ManagerHrTypes';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates hr feature state and its documented UI/API boundary through useManagerHrPayrollMutations.
 * @dependencies Uses ManagerHrApi, ManagerHrExportUtils, ManagerMoney, ManagerHrTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerHrPayrollMutations owns the hr feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerHrPayrollMutations(
  staff: Staff[],
  payrolls: Payroll[],
  setShowPayrollModal: (value: boolean) => void,
  setSaving: (value: boolean) => void,
  showToast: (message: string, type: ManagerToastType) => void,
) {
  const queryClient = useQueryClient();

  const bulkGeneratePayrollMutation = useMutation({
    mutationFn: ({ month, idempotencyKey }: { month: string; idempotencyKey: string }) => ManagerHrApi.generatePayrolls(month, idempotencyKey),
    onMutate: () => setSaving(true),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ManagerHrQueryKeys.payrolls() });
      queryClient.invalidateQueries({ queryKey: ManagerHrQueryKeys.summary() });
      showToast(response.message, 'success');
    },
    onError: (error) => { if (error instanceof Error && error.message) showToast(error.message, 'error'); },
    onSettled: () => setSaving(false) });

  const savePayrollMutation = useMutation({
    mutationFn: async (data: Partial<Payroll> & { amount?: string | number; idempotencyKey: string }) => {
      const staffMember = staff.find((item) => String(item.id) === String(data.staffId));
      if (!staffMember) throw new Error(MANAGER_GENERIC_ERROR_MESSAGE); // Impossible UI state: backend remains the authority for user-visible validation messages.
      const amount = toManagerMinorUnits(Number(data.amount || 0));
      const paidAmount = toManagerMinorUnits(Number(data.paidAmount || 0));
      const payload = {
        ...data,
        amount,
        paidAmount,
        pendingAmount: Math.max(0, amount - paidAmount),
        status: Math.max(0, amount - paidAmount) === 0 ? 'Paid' : HR_PENDING_STATUS,
        paidAt: paidAmount > 0 ? new Date() : undefined,
        staff: { name: staffMember.name, role: staffMember.role } };
      return ManagerHrApi.createPayroll(payload, data.idempotencyKey);
    },
    onMutate: () => setSaving(true),
    onSuccess: (response) => {
      if (!response.data) return;
      queryClient.invalidateQueries({ queryKey: ManagerHrQueryKeys.payrolls() });
      queryClient.invalidateQueries({ queryKey: ManagerHrQueryKeys.summary() });
      showToast(response.message, 'success');
      setShowPayrollModal(false);
    },
    onError: (error) => { if (error instanceof Error && error.message) showToast(error.message, 'error'); },
    onSettled: () => setSaving(false) });

  const markPayrollPaidMutation = useMutation({
    mutationFn: async ({ id, amount, idempotencyKey }: { id: string; amount: number; idempotencyKey: string }) => {
      const payroll = payrolls.find((item) => String(item.id) === String(id));
      if (!payroll) throw new Error(MANAGER_GENERIC_ERROR_MESSAGE); // Stale client state: do not invent a user-facing message; the normal row flow always supplies a record.
      const paidAmount = (payroll.paidAmount || 0) + amount;
      const pendingAmount = Math.max(0, payroll.amount - paidAmount);
      return ManagerHrApi.updatePayroll(id, { paidAmount, pendingAmount, status: pendingAmount === 0 ? 'Paid' : HR_PENDING_STATUS }, idempotencyKey);
    },
    onSuccess: (response) => {
      if (!response.data) return;
      queryClient.invalidateQueries({ queryKey: ManagerHrQueryKeys.payrolls() });
      queryClient.invalidateQueries({ queryKey: ManagerHrQueryKeys.summary() });
      showToast(response.message, 'success');
    },
    onError: (error) => { if (error instanceof Error && error.message) showToast(error.message, 'error'); } });

  const giveAdvanceMutation = useMutation({
    mutationFn: ({ data, idempotencyKey }: { data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }; idempotencyKey: string }) => ManagerHrApi.giveStaffAdvance(data, idempotencyKey),
    onMutate: () => setSaving(true),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ManagerHrQueryKeys.staff() });
      showToast(response.message, 'success');
    },
    onError: (error) => { if (error instanceof Error && error.message) showToast(error.message, 'error'); },
    onSettled: () => setSaving(false) });

  const payDueMutation = useMutation({
    mutationFn: ({ data, idempotencyKey }: { data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }; idempotencyKey: string }) => ManagerHrApi.payStaffDue(data, idempotencyKey),
    onMutate: () => setSaving(true),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ManagerHrQueryKeys.staff() });
      queryClient.invalidateQueries({ queryKey: ManagerHrQueryKeys.summary() });
      showToast(response.message, 'success');
    },
    onError: (error) => { if (error instanceof Error && error.message) showToast(error.message, 'error'); },
    onSettled: () => setSaving(false) });

  const bulkGeneratePayroll = async (month: string, idempotencyKey: string) => { await bulkGeneratePayrollMutation.mutateAsync({ month, idempotencyKey }); };
  const downloadPayslip = async (payrollId: string) => {
    const payroll = payrolls.find((item) => item.id === payrollId);
    if (payroll) printManagerHrPayslip(payroll);
  };
  const exportStaff = () => downloadManagerHrStaffCsv(staff);

  return {
    savePayroll: async (data: Partial<Payroll> & { amount?: string | number; idempotencyKey: string }) => { await savePayrollMutation.mutateAsync(data); },
    markPayrollPaid: async (id: string, amount: number, idempotencyKey: string) => { await markPayrollPaidMutation.mutateAsync({ id, amount, idempotencyKey }); },
    bulkGeneratePayroll, downloadPayslip, exportStaff,
    giveAdvance: async (data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }, idempotencyKey: string) => { await giveAdvanceMutation.mutateAsync({ data, idempotencyKey }); },
    payDue: async (data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }, idempotencyKey: string) => { await payDueMutation.mutateAsync({ data, idempotencyKey }); } };
}
