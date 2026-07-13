// RESPONSIBILITY: Encapsulates all state and logic for the Invoices page — filtering, modal state, stats calculations.
// DATA FLOW: useSuperadminData → useInvoicesPage → InvoicesClient
'use client';
import { useState, useMemo } from 'react';
import { useSuperadminData } from '@/app/superadmin/superadmin_utils/useSuperadminData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import type { SaaSInvoice, Tenant } from '@/app/superadmin/superadmin_types/superadmin_types';

export function useInvoicesPage() {
  const { data, fetchState, error } = useSuperadminData<{ invoices: SaaSInvoice[]; tenants: Tenant[] }>(
    SuperadminUrlConfig.BACKEND_API.INVOICES_BASE
  );

  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [gymSearchTerm, setGymSearchTerm] = useState('');
  const [isGymDropdownOpen, setIsGymDropdownOpen] = useState(false);
  const [selectedGymId, setSelectedGymId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const invoices = data?.invoices ?? [];
  const tenants = data?.tenants ?? [];

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
