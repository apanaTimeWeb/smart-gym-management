// RESPONSIBILITY: Encapsulates local UI state for the Invoices page (filtering, modal state, derived stats).
// DATA FLOW: useSuperadminInvoicesStore -> useSuperadminInvoicesPage -> SuperadminInvoicesClient
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invoicesApi } from '@/app/superadmin/invoices/superadmin_invoices_api/superadmin_invoices_api';
import toast from 'react-hot-toast';

export function useSuperadminInvoicesPage() {
  const queryClient = useQueryClient();

  const { data: invoicesRes, isLoading: invoicesLoading, isError: invoicesError } = useQuery({
    queryKey: ['superadmin', 'invoices'],
    queryFn: () => invoicesApi.fetchInvoices(),
  });

  const { data: tenantsRes } = useQuery({
    queryKey: ['superadmin', 'invoices', 'tenants'],
    queryFn: () => invoicesApi.fetchTenants(),
  });

  const invoices = invoicesRes?.data || [];
  const tenants = tenantsRes?.data || [];
  const fetchState = invoicesLoading ? 'loading' : invoicesError ? 'error' : 'success';
  const error = invoicesError ? 'Failed to load invoices' : null;

  const logManualPaymentMutation = useMutation({
    mutationFn: (data: { gymId: string, amount: number, planName: string }) => 
      invoicesApi.createManualPayment({
        gymId: data.gymId,
        amount: data.amount,
        planName: data.planName,
        currency: 'INR',
      }),
    onSuccess: (res) => {
      if (res.success && res.data) {
        queryClient.setQueryData(['superadmin', 'invoices'], (oldData: any) => {
          if (!oldData?.data) return oldData;
          return { ...oldData, data: [res.data, ...oldData.data] };
        });
        toast.success(res.message || 'Payment logged successfully');
      } else {
        toast.error(res.message || 'Failed to log payment');
      }
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to log payment');
    }
  });

  const handleLogManualPayment = (gymId: string, amount: number, planName: string) => {
    return logManualPaymentMutation.mutateAsync({ gymId, amount, planName });
  };

  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [gymSearchTerm, setGymSearchTerm] = useState('');

  const [isGymDropdownOpen, setIsGymDropdownOpen] = useState(false);
  const [selectedGymId, setSelectedGymId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

  const filteredInvoices = useMemo(() => {
    const lower = search.toLowerCase();
    return invoices.filter((i) => {
      const matchSearch = ((i.tenantName || '').toLowerCase().includes(lower) || (i.id || '').toLowerCase().includes(lower));
      const matchStatus = statusFilter ? i.status === statusFilter : true;
      let matchDate = true;
      if (startDate && endDate && i.issuedAt && startDate !== 'this_month' && startDate !== 'this_week' && startDate !== 'this_year' && startDate !== 'today') {
        const iDate = new Date(i.issuedAt);
        const sDate = new Date(startDate);
        const eDate = new Date(endDate);
        if (!isNaN(iDate.getTime()) && !isNaN(sDate.getTime()) && !isNaN(eDate.getTime())) {
          eDate.setHours(23, 59, 59, 999);
          matchDate = iDate >= sDate && iDate <= eDate;
        }
      }
      return matchSearch && matchStatus && matchDate;
    });
  }, [invoices, search, statusFilter, startDate, endDate]);

  const filteredTenantsForDropdown = useMemo(
    () => tenants.filter((t) => (t.name || '').toLowerCase().includes(gymSearchTerm.toLowerCase())),
    [tenants, gymSearchTerm]
  );

  const selectedGym = tenants.find((t) => t.id === selectedGymId);

  const totalRevenue = useMemo(
    () => invoices.filter((i) => i.status === 'PAID').reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0),
    [invoices]
  );

  const failedRevenue = useMemo(
    () => invoices.filter((i) => i.status === 'FAILED').reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0),
    [invoices]
  );

  const pendingRevenue = useMemo(
    () => invoices.filter((i) => i.status === 'PENDING').reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0),
    [invoices]
  );

  const overdueCount = useMemo(
    () => invoices.filter((i) => i.status === 'OVERDUE').length,
    [invoices]
  );

  const handleSelectGym = (id: string) => {
    setSelectedGymId(id);
    setIsGymDropdownOpen(false);
    setGymSearchTerm('');
  };

  return {
    fetchState,
    error,
    invoices,
    filteredInvoices,
    filteredTenantsForDropdown,
    selectedGym,
    totalRevenue,
    failedRevenue,
    search,
    setSearch,
    showAddModal,
    setShowAddModal,
    gymSearchTerm,
    setGymSearchTerm,
    isGymDropdownOpen,
    setIsGymDropdownOpen,
    paymentMethod,
    setPaymentMethod,
    handleSelectGym,
    statusFilter,
    setStatusFilter,
    startDate,
    endDate,
    pendingRevenue,
    overdueCount,
    handleLogManualPayment,
  };
}
