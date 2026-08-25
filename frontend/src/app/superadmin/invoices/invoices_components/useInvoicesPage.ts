// RESPONSIBILITY: Encapsulates local UI state for the Invoices page (filtering, modal state, derived stats).
// DATA FLOW: useInvoicesStore -> useInvoicesPage -> InvoicesClient
'use client';
import { useState, useMemo, useEffect } from 'react';
import { useInvoicesStore } from '@/app/superadmin/invoices/invoices_store/useInvoicesStore';

export function useInvoicesPage() {
  const { invoices, tenants, fetchState, error, fetchData } = useInvoicesStore();

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

  const filteredInvoices = useMemo(() => {
    const lower = search.toLowerCase();
    return invoices.filter(
      (i) =>
        i.tenantName?.toLowerCase().includes(lower) ||
        i.id?.toLowerCase().includes(lower)
    );
  }, [invoices, search]);

  const filteredTenantsForDropdown = useMemo(
    () => tenants.filter((t) => t.name?.toLowerCase().includes(gymSearchTerm.toLowerCase())),
    [tenants, gymSearchTerm]
  );

  const selectedGym = tenants.find((t) => t.id === selectedGymId);

  const totalRevenue = useMemo(
    () => invoices.filter((i) => i.status === 'PAID').reduce((acc, curr) => acc + curr.amount, 0),
    [invoices]
  );

  const failedRevenue = useMemo(
    () => invoices.filter((i) => i.status === 'FAILED').reduce((acc, curr) => acc + curr.amount, 0),
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
  };
}

