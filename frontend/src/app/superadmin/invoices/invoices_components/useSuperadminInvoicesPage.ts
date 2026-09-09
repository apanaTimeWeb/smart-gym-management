// RESPONSIBILITY: Encapsulates local UI state for the Invoices page (filtering, modal state, derived stats).
// DATA FLOW: useSuperadminInvoicesStore -> useSuperadminInvoicesPage -> SuperadminInvoicesClient
'use client';
import { useState, useMemo, useEffect } from 'react';
import { useSuperadminInvoicesStore } from '@/app/superadmin/invoices/invoices_store/useSuperadminInvoicesStore';

export function useSuperadminInvoicesPage() {
  const { invoices, tenants, fetchState, error, fetchData } = useSuperadminInvoicesStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [gymSearchTerm, setGymSearchTerm] = useState('');

  // Bug 2 Fix: Trigger fetch when modal opens if tenants are missing or just fetch to ensure fresh data
  useEffect(() => {
    if (showAddModal) {
      fetchData();
    }
  }, [showAddModal, fetchData]);

  const [isGymDropdownOpen, setIsGymDropdownOpen] = useState(false);
  const [selectedGymId, setSelectedGymId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredInvoices = useMemo(() => {
    const lower = search.toLowerCase();
    return invoices.filter((i) => {
      const matchSearch = ((i.tenantName || '').toLowerCase().includes(lower) || (i.id || '').toLowerCase().includes(lower));
      const matchStatus = statusFilter ? i.status === statusFilter : true;
      let matchDate = true;
      if (startDate && endDate && i.issuedAt) {
        const iDate = new Date(i.issuedAt);
        const sDate = new Date(startDate);
        const eDate = new Date(endDate);
        eDate.setHours(23, 59, 59, 999);
        matchDate = iDate >= sDate && iDate <= eDate;
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
    setStartDate,
    endDate,
    setEndDate,
    pendingRevenue,
    overdueCount,
  };
}

