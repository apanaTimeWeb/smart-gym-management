'use client';
// DATA FLOW: Owning feature API/query/store state → useSuperadminInvoicesPage → consuming feature component.
import { useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useUrlState } from '@/hooks/useUrlState';

import { invoicesApi } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_api/SuperadminInvoicesApi';
import { SUPERADMIN_INVOICES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_constants/SuperadminInvoicesQueryKeys';
import { useSuperadminInvoicesManualPayment } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_hooks/useSuperadminInvoicesManualPayment';
import { calculateSuperadminInvoiceMetrics } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_utils/SuperadminInvoicesMetrics';



/**
 * @description Owns URL filter state, invoice and tenant queries, derived metrics, and the UI-facing action contract.
 * @dependencies Uses only the Invoices module query registry, API clients, URL-state infrastructure, and dedicated mutation hook.
 * @edge-case Server-side filtering/pagination stays authoritative; local tenant search is only for narrowing the dropdown options.
 */
export function useSuperadminInvoicesPage() {
  const { getParam, setParam } = useUrlState();
  const startDate = getParam('startDate', '');
  const endDate = getParam('endDate', '');
  const search = getParam('search', '');
  const statusFilter = getParam('statusFilter', '');
  const currentPage = Number(getParam('page', '1'));
  const pageLimit = Number(getParam('limit', '10'));

  const setSearch = (value: string) => {
    setParam('search', value);
    setParam('page', '1');
  };
  const setStatusFilter = (value: string | null) => {
    setParam('statusFilter', value ?? '');
    setParam('page', '1');
  };
  const setPage = (page: number) => setParam('page', String(page));

  const [showAddModal, setShowAddModal] = useState(false);
  const [gymSearchTerm, setGymSearchTerm] = useState('');
  const [isGymDropdownOpen, setIsGymDropdownOpen] = useState(false);
  const [selectedGymId, setSelectedGymId] = useState('');

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (statusFilter) params.status = statusFilter;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    params.page = String(currentPage);
    params.limit = String(pageLimit);
    return params;
  }, [search, statusFilter, startDate, endDate, currentPage, pageLimit]);

  const { data: invoicesRes, isPending, isError, error: queryError } = useQuery({
    queryKey: SUPERADMIN_INVOICES_QUERY_KEYS.list(queryParams),
    queryFn: () => invoicesApi.fetchInvoices(queryParams),
  });
  const { data: tenantsRes } = useQuery({
    queryKey: SUPERADMIN_INVOICES_QUERY_KEYS.tenants,
    queryFn: () => invoicesApi.fetchTenants(),
  });

  const invoices = invoicesRes?.data ?? [];
  const tenants = tenantsRes?.data ?? [];
  const filteredInvoices = invoices;
  const total = invoicesRes?.meta?.total ?? invoices.length;
  const error = queryError ? (queryError instanceof Error ? queryError.message : String(queryError)) : null;
  const filteredTenantsForDropdown = useMemo(
    () => tenants.filter((tenant) => (tenant.name ?? '').toLowerCase().includes(gymSearchTerm.toLowerCase())),
    [tenants, gymSearchTerm],
  );
  const selectedGym = tenants.find((tenant) => tenant.id === selectedGymId);
  const { totalRevenue, failedRevenue, pendingRevenue, overdueCount } = useMemo(
    () => calculateSuperadminInvoiceMetrics(invoices),
    [invoices],
  );
  const { isLoggingPayment, handleLogManualPayment } = useSuperadminInvoicesManualPayment();

  const handleLogManualPaymentAndResetSelection = async (gymId: string, amount: number, planName: string) => {
    const completed = await handleLogManualPayment(gymId, amount, planName);
    if (completed) setSelectedGymId('');
    return completed;
  };

  const handleSelectGym = (id: string) => {
    setSelectedGymId(id);
    setIsGymDropdownOpen(false);
    setGymSearchTerm('');
  };

  return {
    isPending,
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
    isLoggingPayment,
    handleSelectGym,
    statusFilter,
    setStatusFilter,
    startDate,
    endDate,
    pendingRevenue,
    overdueCount,
    handleLogManualPayment: handleLogManualPaymentAndResetSelection,
    currentPage,
    pageLimit,
    setPage,
    total,
  };
}
