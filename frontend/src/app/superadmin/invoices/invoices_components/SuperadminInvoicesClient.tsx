'use client';
// RESPONSIBILITY: Root orchestrator for the Invoices page. Composes sub-components and passes state from useSuperadminInvoicesPage. No inline business logic.

import { Search, Filter } from 'lucide-react';
import { useSuperadminInvoicesPage } from '@/app/superadmin/invoices/invoices_components/useSuperadminInvoicesPage';
import SuperadminInvoicesHeader from '@/app/superadmin/invoices/invoices_components/SuperadminInvoicesHeader/SuperadminInvoicesHeader';
import SuperadminInvoicesStatsBar from '@/app/superadmin/invoices/invoices_components/SuperadminInvoicesStatsBar/SuperadminInvoicesStatsBar';
import SuperadminInvoicesTable from '@/app/superadmin/invoices/invoices_components/SuperadminInvoicesTable/SuperadminInvoicesTable';
import SuperadminInvoicesEmptyState from '@/app/superadmin/invoices/invoices_components/SuperadminInvoicesEmptyState/SuperadminInvoicesEmptyState';
import SuperadminInvoicesLogPaymentModal from '@/app/superadmin/invoices/invoices_components/SuperadminInvoicesLogPaymentModal/SuperadminInvoicesLogPaymentModal';
import SuperadminInvoicesAgingReport from '@/app/superadmin/invoices/invoices_components/SuperadminInvoicesAgingReport/SuperadminInvoicesAgingReport';
import SuperadminDateRangePicker from '@/app/superadmin/superadmin_components/SuperadminDateRangePicker';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import toast from 'react-hot-toast';
import { useState } from 'react';

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'PAID', label: 'Paid' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'OVERDUE', label: 'Overdue' },
  { value: 'FAILED', label: 'Failed' },
];

export default function SuperadminInvoicesClient() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'AGING'>('ALL');
  const {
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
    setStartDate,
    endDate,
    setEndDate,
    pendingRevenue,
    overdueCount,
  } = useSuperadminInvoicesPage();

  if (fetchState === 'loading') return (
    <div className="space-y-6 motion-safe:animate-pulse">
      <div className="h-8 bg-card rounded  w-full sm:w-64 " />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-28 bg-card rounded-xl border border-border" />
        <div className="h-28 bg-card rounded-xl border border-border" />
      </div>
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="h-12 bg-border/30" />
        {[...Array(6)].map((_, i) => <div key={`skeleton-${i}`} className="h-12 border-t border-border" />)}
      </div>
    </div>
  );

  if (error) return <div className="p-8 text-center text-danger">Error loading data.</div>;

  return (
    <div className="space-y-6 relative">
      <SuperadminInvoicesHeader onLogPaymentClick={() => setShowAddModal(true)} />
      
      <SuperadminInvoicesStatsBar 
        totalRevenue={totalRevenue} 
        failedRevenue={failedRevenue} 
        pendingRevenue={pendingRevenue}
        overdueCount={overdueCount}
      />

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 justify-between items-center bg-input/20">
          <div className="flex bg-input border border-border rounded-lg p-1 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`flex-1 md:flex-none px-4 py-2 text-sm rounded-md font-medium motion-safe:transition-colors ${activeTab === 'ALL' ? 'bg-background text-foreground shadow-sm' : 'text-secondary hover:text-foreground hover:bg-background/50'}`}
            >
              All Invoices
            </button>
            <button
              onClick={() => setActiveTab('AGING')}
              className={`flex-1 md:flex-none px-4 py-2 text-sm rounded-md font-medium motion-safe:transition-colors ${activeTab === 'AGING' ? 'bg-background text-foreground shadow-sm' : 'text-secondary hover:text-foreground hover:bg-background/50'}`}
            >
              Aging Report
            </button>
          </div>
        </div>

        {activeTab === 'AGING' ? (
          <SuperadminInvoicesAgingReport invoices={invoices} />
        ) : (
          <>
            <div className="p-4 border-b border-border flex gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                <input
                  type="text"
                  placeholder="Search by invoice ID or gym name..."
                  className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <SuperadminDateRangePicker 
                  onRangeChange={(start, end) => {
                    setStartDate(start);
                    setEndDate(end);
                  }}
                />
                <div className="w-40 border-none bg-input rounded-lg">
                  <SearchableDropdown
                    options={STATUS_OPTIONS}
                    value={statusFilter || ''}
                    onChange={(val) => setStatusFilter(val ? String(val) : null)}
                    className="bg-transparent border-border"
                  />
                </div>
              </div>
            </div>

            {filteredInvoices.length === 0 ? (
              <SuperadminInvoicesEmptyState onLogPaymentClick={() => setShowAddModal(true)} />
            ) : (
              <SuperadminInvoicesTable 
                onLogPaymentClick={() => setShowAddModal(true)}
                invoices={filteredInvoices} 
              />
            )}
          </>
        )}
      </div>


      {showAddModal && (
        <SuperadminInvoicesLogPaymentModal
          onClose={() => setShowAddModal(false)}
          selectedGym={selectedGym}
          isGymDropdownOpen={isGymDropdownOpen}
          setIsGymDropdownOpen={setIsGymDropdownOpen}
          gymSearchTerm={gymSearchTerm}
          setGymSearchTerm={setGymSearchTerm}
          filteredTenantsForDropdown={filteredTenantsForDropdown}
          handleSelectGym={handleSelectGym}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          onSave={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}
