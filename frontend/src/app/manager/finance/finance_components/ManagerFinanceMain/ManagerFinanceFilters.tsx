// RESPONSIBILITY: Renders the Manager FinanceFilters presentation layer for the Manager module.
﻿'use client';
import { Search, Download, FileText, RefreshCw } from 'lucide-react';
import ManagerFinanceDateFilterDropdown from '@/app/manager/finance/finance_components/ManagerFinanceDateFilterDropdown/ManagerFinanceDateFilterDropdown';
import { useManagerFinanceLogic } from '@/app/manager/finance/finance_hooks/ManagerUseManagerFinanceLogic';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';


export default function ManagerFinanceFilters() {
  const {
    search, setSearch,
    statusFilter, setStatusFilter,
    methodFilter, setMethodFilter,
    setCurrentPage, reload, exportCSV, exportPDF
  } = useManagerFinanceLogic();

  return (
    <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3 p-4 border-b border-border">
      <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
        <div className="relative w-full sm:w-64">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            type="text"
            placeholder="Search payments..."
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-4 py-2 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:border-primary"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <ManagerFinanceDateFilterDropdown />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 w-full xl:w-auto justify-start xl:justify-end">
        <div className="w-40">
          <ManagerSearchableDropdown
            value={statusFilter}
            onChange={(val) => { setStatusFilter(val.toString()); setCurrentPage(1); }}
            options={[
              { value: 'ALL', label: 'All Status' },
              { value: 'PAID', label: 'Paid' },
              { value: 'PENDING', label: 'Pending' },
              { value: 'REFUNDED', label: 'Refunded' },
            ]}
            className="bg-input"
          />
        </div>
        <div className="w-44">
          <ManagerSearchableDropdown
            value={methodFilter}
            onChange={(val) => { setMethodFilter(val.toString()); setCurrentPage(1); }}
            options={[
              { value: 'ALL', label: 'All Methods' },
              { value: 'UPI', label: 'UPI' },
              { value: 'Cash', label: 'Cash' },
              { value: 'Card', label: 'Card' },
              { value: 'NetBanking', label: 'NetBanking' },
            ]}
            className="bg-input"
          />
        </div>
        <button onClick={exportCSV}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-primary text-on-primary hover:opacity-90 motion-safe:transition-opacity">
          <Download size={18} /> CSV
        </button>
        <button onClick={exportPDF}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-info text-on-info hover:opacity-90 motion-safe:transition-opacity">
          <FileText size={18} /> PDF
        </button>
        <button onClick={reload}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-input border border-border text-secondary hover:text-primary motion-safe:transition-colors">
          <RefreshCw size={18} /> Refresh
        </button>
      </div>
    </div>
  );
}

