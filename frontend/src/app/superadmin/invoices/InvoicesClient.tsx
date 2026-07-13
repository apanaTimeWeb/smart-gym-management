'use client';
// RESPONSIBILITY: Root orchestrator for the Invoices page. Composes sub-components and passes state from useInvoicesPage. No inline business logic.

import { Receipt, Search, Filter, DollarSign, ArrowUpRight, AlertCircle, Plus, X } from 'lucide-react';
import { SearchableDropdown } from '@/app/erp/erp_components/ErpShared/SearchableDropdown';
import { useInvoicesPage } from '@/app/superadmin/invoices/invoices_components/useInvoicesPage';
import InvoicesEmptyState from '@/app/superadmin/invoices/invoices_components/InvoicesEmptyState/InvoicesEmptyState';
import type { SaaSInvoice } from '@/app/superadmin/superadmin_types/superadmin_types';

const STATUS_COLORS: Record<SaaSInvoice['status'], string> = {
  PAID: 'text-success bg-success/10',
  PENDING: 'text-warning bg-warning/10',
  FAILED: 'text-destructive bg-destructive/10',
};

export default function InvoicesClient() {
  const {
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
  } = useInvoicesPage();

  if (fetchState === 'loading') return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-card rounded w-64" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-28 bg-card rounded-xl border border-border" />
        <div className="h-28 bg-card rounded-xl border border-border" />
      </div>
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="h-12 bg-border/30" />
        {[...Array(6)].map((_, i) => <div key={i} className="h-12 border-t border-border" />)}
      </div>
    </div>
  );

  if (error) return <div className="p-8 text-center text-destructive">Error loading data.</div>;

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">SaaS Revenue & Invoices</h1>
          <p className="text-secondary mt-1">Track actual payments from gym owners via Stripe/Razorpay.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-input text-foreground border border-border px-4 py-2 rounded-lg font-medium hover:bg-border transition-all duration-200 ease-in-out flex items-center gap-2"
          >
            <Plus size={18} /> Log Manual Payment
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-hover transition-all duration-200 ease-in-out flex items-center gap-2">
            <ArrowUpRight size={18} /> Export CSV
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-in-out">
          <div className="p-4 bg-success/10 rounded-xl text-success"><DollarSign size={32} /></div>
          <div>
            <p className="text-sm font-medium text-secondary">Total Collected (This Month)</p>
            <p className="text-3xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-card border border-destructive/30 rounded-xl p-6 flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-in-out">
          <div className="p-4 bg-destructive/10 rounded-xl text-destructive"><AlertCircle size={32} /></div>
          <div>
            <p className="text-sm font-medium text-secondary">Failed Payments</p>
            <p className="text-3xl font-bold text-destructive">${failedRevenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
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
          <button className="flex items-center gap-2 px-4 py-2 bg-input border border-border rounded-lg text-sm font-medium text-secondary hover:text-foreground transition-colors">
            <Filter size={16} /> Filter Failed
          </button>
        </div>

        {filteredInvoices.length === 0 ? (
          <InvoicesEmptyState onLogPaymentClick={() => setShowAddModal(true)} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-full">
              <thead>
                <tr className="bg-header border-b border-border text-sm">
                  <th className="p-4 font-semibold text-secondary">Invoice ID</th>
                  <th className="p-4 font-semibold text-secondary">Gym (Tenant)</th>
                  <th className="p-4 font-semibold text-secondary">Plan</th>
                  <th className="p-4 font-semibold text-secondary">Amount</th>
                  <th className="p-4 font-semibold text-secondary">Status</th>
                  <th className="p-4 font-semibold text-secondary">Date</th>
                  <th className="p-4 font-semibold text-secondary text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-input transition-colors cursor-pointer">
                    <td className="p-4 text-sm font-mono text-secondary">{inv.id}</td>
                    <td className="p-4 text-sm font-bold text-foreground">{inv.tenantName}</td>
                    <td className="p-4 text-sm text-secondary">{inv.planName}</td>
                    <td className="p-4 text-sm font-bold text-foreground">${inv.amount.toFixed(2)} {inv.currency}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${STATUS_COLORS[inv.status]}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-secondary">{new Date(inv.date).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <button className="text-sm font-medium text-primary hover:underline flex items-center gap-1 justify-end w-full">
                        <Receipt size={14} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Log Manual Payment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Log Manual Payment</h2>
              <button onClick={() => setShowAddModal(false)} className="text-secondary hover:text-foreground transition-colors" aria-label="Close modal">
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Searchable Gym Dropdown */}
              <div className="relative">
                <label className="block text-sm font-medium text-secondary mb-1.5">Select Gym (Tenant)</label>
                <div
                  className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground cursor-pointer flex justify-between items-center hover:border-primary transition-colors"
                  onClick={() => setIsGymDropdownOpen(!isGymDropdownOpen)}
                >
                  <span className={selectedGym ? 'text-foreground' : 'text-secondary'}>
                    {selectedGym ? `${selectedGym.name} (${selectedGym.plan})` : '-- Choose Gym --'}
                  </span>
                  <span className="text-secondary text-xs">▼</span>
                </div>
                {isGymDropdownOpen && (
                  <div className="absolute z-30 top-[calc(100%+4px)] left-0 right-0 bg-card border border-border rounded-lg shadow-2xl overflow-hidden max-h-64 flex flex-col animate-in fade-in zoom-in-95 duration-100">
                    <div className="p-2 border-b border-border bg-header">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-secondary" />
                        <input
                          type="text"
                          placeholder="Search gym by name..."
                          className="w-full pl-8 pr-3 py-1.5 bg-input border border-border rounded text-sm text-foreground focus:outline-none focus:border-primary"
                          value={gymSearchTerm}
                          onChange={(e) => setGymSearchTerm(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          autoFocus
                        />
                      </div>
                    </div>
                    <div className="overflow-y-auto p-1">
                      {filteredTenantsForDropdown.map((t) => (
                        <div
                          key={t.id}
                          className="px-3 py-2.5 text-sm text-foreground hover:bg-input hover:text-primary cursor-pointer rounded-md transition-colors"
                          onClick={() => handleSelectGym(t.id)}
                        >
                          <span className="font-bold">{t.name}</span>
                          <span className="text-secondary text-xs ml-1">({t.plan})</span>
                        </div>
                      ))}
                      {filteredTenantsForDropdown.length === 0 && (
                        <div className="px-3 py-6 text-center text-sm text-disabled font-medium">No gyms found</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">Amount (₹ / $)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                  <input type="number" placeholder="e.g. 4999" className="w-full pl-9 pr-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1.5">Payment Method</label>
                  <SearchableDropdown
                    value={paymentMethod}
                    onChange={(val) => setPaymentMethod(String(val))}
                    options={[
                      { label: 'UPI', value: 'UPI' },
                      { label: 'Cash', value: 'CASH' },
                      { label: 'Bank Transfer', value: 'BANK_TRANSFER' },
                      { label: 'Other / Offline', value: 'OFFLINE' },
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1.5">Reference ID</label>
                  <input type="text" placeholder="e.g. TXN123456" className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">Date & Time Received</label>
                <input type="datetime-local" className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
            </div>

            <div className="p-5 border-t border-border bg-header flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-input border border-border text-foreground rounded-lg text-sm font-medium hover:bg-border transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-all duration-200 ease-in-out active:scale-95"
              >
                Save Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
