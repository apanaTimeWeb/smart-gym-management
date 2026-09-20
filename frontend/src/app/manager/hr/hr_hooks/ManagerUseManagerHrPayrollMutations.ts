// DATA FLOW: Payroll UI action → useMutation → ManagerHrApi → TanStack Query cache → HR UI.
'use client';
/** Manages UseHrPayrollMutations for the Manager module. */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { hrApi } from '@/app/manager/hr/hr_api/ManagerHrApi';
import { downloadManagerHrStaffCsv, printManagerHrPayslip } from '@/app/manager/hr/hr_utils/ManagerHrExportUtils';
import { toManagerMinorUnits } from '@/app/manager/manager_infrastructure/ManagerMoney';
import type { Staff, Payroll, HrSummary } from '@/app/manager/hr/hr_types/ManagerHrTypes';
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerHrPayrollMutations(
  staff: Staff[],
  payrolls: Payroll[],
  setStaff: (updater: Staff[] | ((previous: Staff[]) => Staff[])) => void,
  setPayrolls: (updater: Payroll[] | ((previous: Payroll[]) => Payroll[])) => void,
  _setSummary: (updater: HrSummary | null | ((previous: HrSummary | null) => HrSummary | null)) => void,
  setShowPayrollModal: (value: boolean) => void,
  setSaving: (value: boolean) => void,
  showToast: (message: string, type: ManagerToastType) => void,
) {
  const queryClient = useQueryClient();

  const bulkGeneratePayrollMutation = useMutation({
    mutationFn: ({ month, idempotencyKey }: { month: string; idempotencyKey: string }) => hrApi.generatePayrolls(month, idempotencyKey),
    onMutate: () => setSaving(true),
    onSuccess: (response) => {
      const generated = response.data?.payrolls ?? [];
      if (generated.length) setPayrolls((previous) => [...generated, ...previous]);
      showToast(response.message, 'success');
    },
    onError: (error) => { if (error instanceof Error && error.message) showToast(error.message, 'error'); },
    onSettled: () => setSaving(false) });

  const savePayrollMutation = useMutation({
    mutationFn: async (data: Partial<Payroll> & { amount?: string | number; idempotencyKey: string }) => {
      const staffMember = staff.find((item) => String(item.id) === String(data.staffId));
      if (!staffMember) throw new Error('Staff member is required');
      const amount = toManagerMinorUnits(Number(data.amount || 0));
      const paidAmount = toManagerMinorUnits(Number(data.paidAmount || 0));
      const payload = {
        ...data,
        amount,
        paidAmount,
        pendingAmount: Math.max(0, amount - paidAmount),
        status: Math.max(0, amount - paidAmount) === 0 ? 'Paid' : 'PENDING',
        paidAt: paidAmount > 0 ? new Date().toISOString() : undefined,
        staff: { name: staffMember.name, role: staffMember.role } };
      return hrApi.createPayroll(payload, data.idempotencyKey);
    },
    onMutate: () => setSaving(true),
    onSuccess: (response) => {
      if (!response.data) return;
      setPayrolls((previous) => [response.data as Payroll, ...previous]);
      queryClient.invalidateQueries({ queryKey: ['manager', 'hr', 'summary'] });
      showToast(response.message, 'success');
      setShowPayrollModal(false);
    },
    onError: (error) => { if (error instanceof Error && error.message) showToast(error.message, 'error'); },
    onSettled: () => setSaving(false) });

  const markPayrollPaidMutation = useMutation({
    mutationFn: async ({ id, amount, idempotencyKey }: { id: string; amount: number; idempotencyKey: string }) => {
      const payroll = payrolls.find((item) => String(item.id) === String(id));
      if (!payroll) throw new Error('Payroll record not found');
      const paidAmount = (payroll.paidAmount || 0) + amount;
      const pendingAmount = Math.max(0, payroll.amount - paidAmount);
      return hrApi.updatePayroll(id, { paidAmount, pendingAmount, status: pendingAmount === 0 ? 'Paid' : 'PENDING' }, idempotencyKey);
    },
    onSuccess: (response) => {
      if (!response.data) return;
      if (response.data) {
        setPayrolls((previous) => previous.map((item) => String(item.id) === String(response.data?.id) ? response.data as Payroll : item));
      }
      showToast(response.message, 'success');
    },
    onError: (error) => { if (error instanceof Error && error.message) showToast(error.message, 'error'); } });

  const giveAdvanceMutation = useMutation({
    mutationFn: ({ data, idempotencyKey }: { data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }; idempotencyKey: string }) => hrApi.giveStaffAdvance(data, idempotencyKey),
    onMutate: () => setSaving(true),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['manager', 'hr', 'staff'] });
      showToast(response.message, 'success');
    },
    onError: (error) => { if (error instanceof Error && error.message) showToast(error.message, 'error'); },
    onSettled: () => setSaving(false) });

  const payDueMutation = useMutation({
    mutationFn: ({ data, idempotencyKey }: { data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }; idempotencyKey: string }) => hrApi.payStaffDue(data, idempotencyKey),
    onMutate: () => setSaving(true),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['manager', 'hr', 'staff'] });
      queryClient.invalidateQueries({ queryKey: ['manager', 'hr', 'summary'] });
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
