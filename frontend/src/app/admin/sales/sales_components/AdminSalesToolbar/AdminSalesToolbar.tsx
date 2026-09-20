"use client";
// RESPONSIBILITY: Renders the date filter dropdown (with Custom date range pickers), search input, and export button for the Sales module. Reads/writes state via SalesContext.

import { Download, Search } from 'lucide-react';
import { useAdminSalesLogic } from '@/app/admin/sales/sales_context/useAdminSalesLogic';
import { useState, useEffect } from 'react';
import { AdminSalesDateFilterDropdown } from '@/app/admin/sales/sales_components/AdminSalesDateFilter/AdminSalesDateFilterDropdown';

export default function AdminSalesToolbar() {
  const { search, setSearch, setCurrentPage, overviewData } = useAdminSalesLogic();
  const [localSearch, setLocalSearch] = useState(search);

  /* eslint-disable react-hooks/set-state-in-effect */
// EFFECT: Synchronizes this component effect with its declared React dependencies in sales/sales_components/AdminSalesToolbar/AdminSalesToolbar.tsx.
  useEffect(() => { setLocalSearch(search); }, [search]);
  /* eslint-enable react-hooks/set-state-in-effect */

// EFFECT: Synchronizes this component effect with its declared React dependencies in sales/sales_components/AdminSalesToolbar/AdminSalesToolbar.tsx.
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== search) {
        setSearch(localSearch);
        
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [localSearch, search, setSearch, setCurrentPage]);



  return (
    <div className="bg-card rounded-xl shadow-card border border-border p-4 space-y-3 mb-5">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        {/* Date Filter Dropdown */}
        <div className="flex items-center gap-3 flex-wrap">
          <AdminSalesDateFilterDropdown />
        </div>

        {/* Search + Export */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center"><Search size={15} className="text-secondary" /></span>
            <input
              value={localSearch}
              onChange={e => setLocalSearch(e.target.value)}
              placeholder="Search..."
              className="pl-9 pr-3 py-2 border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-40 sm:w-56 bg-input text-primary"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              const header = 'Date,Revenue,New Members';
              const rows = overviewData.map((item) => `${item.date},${item.revenue},${item.newMembers}`);
              const csv = [header, ...rows].join('\n');
              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const anchor = document.createElement('a');
              anchor.href = url;
              anchor.download = 'admin-sales-overview.csv';
              anchor.click();
              URL.revokeObjectURL(url);
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-sm border border-border rounded-lg hover:bg-primary-subtle text-secondary motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          >
            <Download size={13} /> Export
          </button>
        </div>
      </div>
    </div>
  );
}
