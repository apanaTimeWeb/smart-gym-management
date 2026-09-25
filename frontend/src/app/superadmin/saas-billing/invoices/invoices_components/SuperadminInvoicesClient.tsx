// RESPONSIBILITY: Root orchestrator for the Invoices page. Composes sub-components and passes state from useSuperadminInvoicesPage. No inline business logic.
'use client';
import { Search, Filter } from 'lucide-react';
import { useSuperadminInvoicesPage } from '@/app/superadmin/saas-billing/invoices/invoices_components/useSuperadminInvoicesPage';
import SuperadminInvoicesHeader from '@/app/superadmin/saas-billing/invoices/invoices_components/SuperadminInvoicesHeader/SuperadminInvoicesHeader';
import SuperadminInvoicesStatsBar from '@/app/superadmin/saas-billing/invoices/invoices_components/SuperadminInvoicesStatsBar/SuperadminInvoicesStatsBar';
import SuperadminInvoicesTable from '@/app/superadmin/saas-billing/invoices/invoices_components/SuperadminInvoicesTable/SuperadminInvoicesTable';
import SuperadminInvoicesEmptyState from '@/app/superadmin/saas-billing/invoices/invoices_components/SuperadminInvoicesEmptyState/SuperadminInvoicesEmptyState';
import SuperadminInvoicesLogPaymentModal from '@/app/superadmin/saas-billing/invoices/invoices_components/SuperadminInvoicesLogPaymentModal/SuperadminInvoicesLogPaymentModal';
import SuperadminInvoicesAgingReport from '@/app/superadmin/saas-billing/invoices/invoices_components/SuperadminInvoicesAgingReport/SuperadminInvoicesAgingReport';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { SUPERADMIN_INVOICE_STATUS_OPTIONS } from '@/app/superadmin/saas-billing/invoices/invoices_utils/SuperadminInvoicesConstants';
import type { InvoicesTab } from '@/app/superadmin/saas-billing/invoices/invoices_types/SuperadminInvoicesClientTypes';

export default function SuperadminInvoicesClient() {
    const [activeTab, setActiveTab] = useState<InvoicesTab>('ALL');
    const { isPending, error, invoices, filteredInvoices, filteredTenantsForDropdown, selectedGym, totalRevenue, failedRevenue, search, setSearch, showAddModal, setShowAddModal, gymSearchTerm, setGymSearchTerm, isGymDropdownOpen, setIsGymDropdownOpen, paymentMethod, setPaymentMethod, handleSelectGym, statusFilter, setStatusFilter, pendingRevenue, overdueCount, handleLogManualPayment, currentPage, pageLimit, setPage, total, } = useSuperadminInvoicesPage();
    if (isPending)
        return (<div className="space-y-6 motion-safe:animate-pulse">
      <div className="h-8 bg-card rounded  w-full sm:w-64 "/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-28 bg-card rounded-xl border border-border"/>
        <div className="h-28 bg-card rounded-xl border border-border"/>
      </div>
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="h-12 bg-surface-highlight"/>
        {[...Array(6)].map((_, i) => <div key={`skeleton-${i}`} className="h-12 border-t border-border"/>)}
      </div>
    </div>);
    if (error)
        return <div className="p-8 text-center text-danger">{error}</div>;
    return (<div className="space-y-6 relative">
      <SuperadminInvoicesHeader onLogPaymentClick={() => setShowAddModal(true)}/>
      
      <SuperadminInvoicesStatsBar totalRevenue={totalRevenue} failedRevenue={failedRevenue} pendingRevenue={pendingRevenue} overdueCount={overdueCount} currency="INR"/>

      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 justify-between items-center bg-input">
          <div className="flex bg-input border border-border rounded-lg p-1 w-full md:w-auto">
            <button onClick={() => setActiveTab('ALL')} className={`flex-1 md:flex-none px-4 py-2 text-sm rounded-md font-medium motion-safe:transition-colors ${activeTab === 'ALL' ? 'bg-page text-primary shadow-card' : 'text-secondary hover:text-primary hover:bg-page'}`}>
              All Invoices
            </button>
            <button onClick={() => setActiveTab('AGING')} className={`flex-1 md:flex-none px-4 py-2 text-sm rounded-md font-medium motion-safe:transition-colors ${activeTab === 'AGING' ? 'bg-page text-primary shadow-card' : 'text-secondary hover:text-primary hover:bg-page'}`}>
              Aging Report
            </button>
          </div>
        </div>

        {activeTab === 'AGING' ? (<SuperadminInvoicesAgingReport invoices={invoices}/>) : (<>
            <div className="p-4 border-b border-border flex gap-4">
              <div className="relative flex-1 max-w-md">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"/>
                <input type="text" placeholder="Search by invoice ID or gym name..." className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-primary" value={search} onChange={(e) => setSearch(e.target.value)}/>
              </div>
              <div className="flex gap-2">
                <div className="w-40 border-none bg-input rounded-lg">
                  <SearchableDropdown options={SUPERADMIN_INVOICE_STATUS_OPTIONS as any} value={statusFilter || ''} onChange={(val) => setStatusFilter(val ? String(val) : null)} className="bg-transparent border-border"/>
                </div>
              </div>
            </div>

            {filteredInvoices.length === 0 ? (<SuperadminInvoicesEmptyState onLogPaymentClick={() => setShowAddModal(true)}/>) : (<SuperadminInvoicesTable onLogPaymentClick={() => setShowAddModal(true)} invoices={filteredInvoices} currentPage={currentPage} totalPages={Math.ceil(total / pageLimit) || 1} onPageChange={setPage}/>)}
          </>)}
      </div>


      {showAddModal && (<SuperadminInvoicesLogPaymentModal onClose={() => setShowAddModal(false)} selectedGym={selectedGym} isGymDropdownOpen={isGymDropdownOpen} setIsGymDropdownOpen={setIsGymDropdownOpen} gymSearchTerm={gymSearchTerm} setGymSearchTerm={setGymSearchTerm} filteredTenantsForDropdown={filteredTenantsForDropdown} handleSelectGym={handleSelectGym} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} onSave={async (amount: number) => {
                if (!selectedGym) {
                    return;
                    return;
                }
                const recorded = await handleLogManualPayment(selectedGym.id, amount, selectedGym.plan);
                if (recorded) setShowAddModal(false);
            }}/>)}
    </div>);
}

export type { InvoicesTab } from '@/app/superadmin/saas-billing/invoices/invoices_types/SuperadminInvoicesClientTypes';
