'use client';
// RESPONSIBILITY: Encapsulates local UI state for the Invoices page (filtering, modal state, derived stats).
// DATA FLOW: useSuperadminInvoicesStore -> useSuperadminInvoicesPage -> SuperadminInvoicesClient
import { useState, useMemo } from 'react';
import { useSuperadminUrlState } from '@/app/superadmin/superadmin_utils/useSuperadminUrlState';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invoicesApi } from '@/app/superadmin/invoices/superadmin_invoices_api/superadmin_invoices_api';
import toast from 'react-hot-toast';
import { calculateSuperadminInvoiceMetrics } from '@/app/superadmin/invoices/invoices_utils/SuperadminInvoicesMetrics';
import { useSuperadminDebouncedValue } from '@/app/superadmin/superadmin_utils/useSuperadminDebouncedValue';

export function useSuperadminInvoicesPage() {
  const queryClient = useQueryClient();

  const { getParam, setParam } = useSuperadminUrlState();

  const startDate = getParam('startDate', '');
  const endDate = getParam('endDate', '');
  const search = getParam('search', '');
  const debouncedSearch = useSuperadminDebouncedValue(search);
  const statusFilter = getParam('statusFilter', '');
  const currentPage = Number(getParam('page', '1'));
  const pageLimit = Number(getParam('limit', '10'));

  const setSearch = (val: string) => {
    setParam('search', val);
    setParam('page', '1');
  };
  const setStatusFilter = (val: string | null) => {
    setParam('statusFilter', val ?? '');
    setParam('page', '1');
  };
  const setPage = (page: number) => setParam('page', String(page));

  const [showAddModal, setShowAddModal] = useState(false);
  const [gymSearchTerm, setGymSearchTerm] = useState('');
  const [isGymDropdownOpen, setIsGymDropdownOpen] = useState(false);
  const [selectedGymId, setSelectedGymId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const queryParams = useMemo(() => {
    const p: Record<string, string> = {};
    if (debouncedSearch) p.search = debouncedSearch;
    if (statusFilter) p.status = statusFilter;
    if (startDate) p.startDate = startDate;
    if (endDate) p.endDate = endDate;
    p.page = String(currentPage);
    p.limit = String(pageLimit);
    return p;
  }, [debouncedSearch, statusFilter, startDate, endDate, currentPage, pageLimit]);

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
  const total = invoicesRes?.meta?.total || invoices.length;
  const error = isError ? (queryError instanceof Error ? queryError.message : '') : null;

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
        queryClient.invalidateQueries({ queryKey: ['superadmin', 'invoices'] });
        toast.success(res.message, { id: 'superadmin-toast-bddec4ac4d' });
      } else {
        toast.error(res.message, { id: 'superadmin-toast-812ab1a64a' });
      }
    },
    onError: (err: Error) => {
      toast.error(err.message, { id: 'superadmin-toast-a2194697fd' });
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

  const { totalRevenue, failedRevenue, pendingRevenue, overdueCount } = useMemo(() => calculateSuperadminInvoiceMetrics(invoices), [invoices]);

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
    currentPage,
    pageLimit,
    setPage,
    total,
  };
}

