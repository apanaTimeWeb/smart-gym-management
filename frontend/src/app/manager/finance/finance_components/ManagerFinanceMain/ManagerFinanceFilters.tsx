import React from 'react';
import { Search, Download, FileText, RefreshCw } from 'lucide-react';
import { SearchableDropdown } from '@/app/manager/manager_components/ManagerShared/SearchableDropdown';
import { ManagerDateFilterDropdown } from '@/app/manager/manager_components/ManagerShared/ManagerDateFilterDropdown';
import { useFinanceContext } from '@/app/manager/finance/finance_context/ManagerFinanceContext';

export default function ManagerFinanceFilters() {
  const {
    search, setSearch,
    statusFilter, setStatusFilter,
    methodFilter, setMethodFilter,
    setCurrentPage, reload, exportCSV, exportPDF
  } = useFinanceContext();

  return (
    <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3 p-4 border-b border-border">
      <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            type="text"
            placeholder="Search payments..."
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-4 py-2 text-sm bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <ManagerDateFilterDropdown />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 w-full xl:w-auto justify-start xl:justify-end">
        <div className="w-40">
          <SearchableDropdown
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
          <SearchableDropdown
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
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:opacity-90 motion-safe:transition-opacity">
          <Download size={14} /> CSV
        </button>
        <button onClick={exportPDF}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-info text-white hover:opacity-90 motion-safe:transition-opacity">
          <FileText size={14} /> PDF
        </button>
        <button onClick={reload}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-input border border-border text-secondary hover:text-foreground motion-safe:transition-colors">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>
    </div>
  );
}
