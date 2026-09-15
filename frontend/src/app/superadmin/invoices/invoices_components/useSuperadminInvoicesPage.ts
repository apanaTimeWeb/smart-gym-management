// RESPONSIBILITY: Encapsulates local UI state for the Invoices page (filtering, modal state, derived stats).
// DATA FLOW: useSuperadminInvoicesStore -> useSuperadminInvoicesPage -> SuperadminInvoicesClient
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invoicesApi } from '@/app/superadmin/invoices/superadmin_invoices_api/superadmin_invoices_api';
import toast from 'react-hot-toast';

export function useSuperadminInvoicesPage() {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [gymSearchTerm, setGymSearchTerm] = useState('');
  const [isGymDropdownOpen, setIsGymDropdownOpen] = useState(false);
  const [selectedGymId, setSelectedGymId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const queryParams = useMemo(() => {
    const p: Record<string, string> = {};
    if (search) p.search = search;
    if (statusFilter) p.status = statusFilter;
    if (startDate) p.startDate = startDate;
    if (endDate) p.endDate = endDate;
    return p;
  }, [search, statusFilter, startDate, endDate]);

  const { data: invoicesRes, isLoading, isError, error: queryError } = useQuery({
    queryKey: ['superadmin', 'invoices', queryParams],
    queryFn: () => invoicesApi.fetchInvoices(queryParams),
  });

  const { data: tenantsRes } = useQuery({
    queryKey: ['superadmin', 'invoices', 'tenants'],
    queryFn: () => invoicesApi.fetchTenants(),
  });

  const invoices = invoicesRes?.data || [];
  const filteredInvoices = invoices; // Server-side filtering applied
  const tenants = tenantsRes?.data || [];
  const error = isError ? 'Failed to load invoices' : null;

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
        queryClient.setQueryData(['superadmin', 'invoices'], (oldData: unknown) => {
          if (!oldData?.data) return oldData;
          return { ...oldData, data: [res.data, ...oldData.data] };
        });
        toast.success(res.message || 'Payment logged successfully');
      } else {
        toast.error(res.message || 'Failed to log payment');
      }
    },
    onError: (err: unknown) => {
      toast.error(err.message || 'Failed to log payment');
    }
  });

  const handleLogManualPayment = (gymId: string, amount: number, planName: string) => {
    return logManualPaymentMutation.mutateAsync({ gymId, amount, planName });
  };

  // filtering moved to server

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
    isLoading,
    isError,
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
