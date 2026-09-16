// DATA FLOW: Payroll UI action → useMutation → ManagerHrApi → TanStack Query cache → HR UI.
/** Manages UseHrPayrollMutations for the Manager module. */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Staff, Payroll, HrSummary } from '@/app/manager/hr/hr_types/ManagerHrTypes';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { hrApi } from '@/app/manager/hr/hr_api/ManagerHrApi';
import { downloadManagerHrStaffCsv, printManagerHrPayslip } from '@/app/manager/hr/hr_utils/ManagerHrExportUtils';

export function useManagerHrPayrollMutations(
  staff: Staff[],
  payrolls: Payroll[],
  setStaff: (updater: Staff[] | ((previous: Staff[]) => Staff[])) => void,
  setPayrolls: (updater: Payroll[] | ((previous: Payroll[]) => Payroll[])) => void,
  _setSummary: (updater: HrSummary | null | ((previous: HrSummary | null) => HrSummary | null)) => void,
  setShowPayrollModal: (value: boolean) => void,
  setSaving: (value: boolean) => void,
  showToast: (message: string, type: ToastType) => void,
) {
  const queryClient = useQueryClient();

  const bulkGeneratePayrollMutation = useMutation({
    mutationFn: (month: string) => hrApi.generatePayrolls(month),
    onMutate: () => setSaving(true),
    onSuccess: (response) => {
      const generated = response.data?.payrolls ?? [];
      if (generated.length) setPayrolls((previous) => [...generated, ...previous]);
      showToast(response.message, 'success');
    },
    onError: (error) => showToast(error instanceof Error ? error.message : 'Request failed', 'error'),
    onSettled: () => setSaving(false),
  });

  const savePayrollMutation = useMutation({
    mutationFn: async (data: Partial<Payroll> & { amount?: string | number }) => {
      const staffMember = staff.find((item) => String(item.id) === String(data.staffId));
      if (!staffMember) throw new Error('Staff member is required');
      const amount = Number(data.amount || 0);
      const paidAmount = Number(data.paidAmount || 0);
      const payload = {
        ...data,
        amount,
        paidAmount,
        pendingAmount: Math.max(0, amount - paidAmount),
        status: Math.max(0, amount - paidAmount) === 0 ? 'Paid' : 'PENDING',
        paidAt: paidAmount > 0 ? new Date().toISOString() : undefined,
        staff: { name: staffMember.name, role: staffMember.role },
      };
      return hrApi.createPayroll(payload);
    },
    onMutate: () => setSaving(true),
    onSuccess: (response) => {
      if (!response.data) return;
      setPayrolls((previous) => [response.data as Payroll, ...previous]);
      queryClient.invalidateQueries({ queryKey: ['manager', 'hr', 'summary'] });
      showToast(response.message, 'success');
      setShowPayrollModal(false);
    },
    onError: (error) => showToast(error instanceof Error ? error.message : 'Request failed', 'error'),
    onSettled: () => setSaving(false),
  });

  const markPayrollPaidMutation = useMutation({
    mutationFn: async ({ id, amount }: { id: string; amount: number }) => {
      const payroll = payrolls.find((item) => String(item.id) === String(id));
      if (!payroll) throw new Error('Payroll record not found');
      const paidAmount = (payroll.paidAmount || 0) + amount;
      const pendingAmount = Math.max(0, payroll.amount - paidAmount);
      return hrApi.updatePayroll(id, { paidAmount, pendingAmount, status: pendingAmount === 0 ? 'Paid' : 'PENDING' });
    },
    onSuccess: (response) => {
      if (!response.data) return;
      if (response.data) {
        setPayrolls((previous) => previous.map((item) => String(item.id) === String(response.data?.id) ? response.data as Payroll : item));
      }
      showToast(response.message, 'success');
    },
    onError: (error) => showToast(error instanceof Error ? error.message : 'Request failed', 'error'),
  });

  const giveAdvanceMutation = useMutation({
    mutationFn: (data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }) => hrApi.giveAdvance(data),
    onMutate: () => setSaving(true),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['manager', 'hr', 'staff'] });
      showToast(response.message, 'success');
    },
    onError: (error) => showToast(error instanceof Error ? error.message : 'Request failed', 'error'),
    onSettled: () => setSaving(false),
  });

  const payDueMutation = useMutation({
    mutationFn: (data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }) => hrApi.payDue(data),
    onMutate: () => setSaving(true),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['manager', 'hr', 'staff'] });
      queryClient.invalidateQueries({ queryKey: ['manager', 'hr', 'summary'] });
      showToast(response.message, 'success');
    },
    onError: (error) => showToast(error instanceof Error ? error.message : 'Request failed', 'error'),
    onSettled: () => setSaving(false),
  });

  const bulkGeneratePayroll = async (month: string) => { await bulkGeneratePayrollMutation.mutateAsync(month); };
  const downloadPayslip = async (payrollId: string) => {
    const payroll = payrolls.find((item) => item.id === payrollId);
    if (payroll) printManagerHrPayslip(payroll);
  };
  const exportStaff = () => downloadManagerHrStaffCsv(staff);

  return {
    savePayroll: (data: Partial<Payroll> & { amount?: string | number }) => savePayrollMutation.mutate(data),
    markPayrollPaid: (id: string, amount: number) => markPayrollPaidMutation.mutate({ id, amount }),
    bulkGeneratePayroll, downloadPayslip, exportStaff,
    giveAdvance: (data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }) => giveAdvanceMutation.mutate(data),
    payDue: (data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }) => payDueMutation.mutate(data),
  };
}
