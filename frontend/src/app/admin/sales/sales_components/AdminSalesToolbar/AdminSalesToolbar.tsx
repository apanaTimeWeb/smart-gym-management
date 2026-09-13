// RESPONSIBILITY: Renders the date filter dropdown (with Custom date range pickers), search input, and export button for the Sales module. Reads/writes state via SalesContext.
'use client';

import { Download, Search } from 'lucide-react';
import { useAdminSalesLogic } from '@/app/admin/sales/sales_context/useAdminSalesLogic';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { AdminDateFilterDropdown } from '@/app/admin/admin_components/AdminShared/AdminDateFilterDropdown';

export default function AdminSalesToolbar() {
  const { search, setSearch, setCurrentPage } = useAdminSalesLogic();
  const [localSearch, setLocalSearch] = useState(search);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => { setLocalSearch(search); }, [search]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== search) {
        setSearch(localSearch);
        
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [localSearch, search, setSearch, setCurrentPage]);



  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-4 space-y-3 mb-5">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        {/* Date Filter Dropdown */}
        <div className="flex items-center gap-3 flex-wrap">
          <AdminDateFilterDropdown />
        </div>

        {/* Search + Export */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input
              value={localSearch}
              onChange={e => setLocalSearch(e.target.value)}
              placeholder="Search..."
              className="pl-9 pr-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-40 sm:w-56 bg-input text-foreground"
            />
          </div>
          <button
            onClick={() => toast.success('Exporting sales report to CSV...')}
            className="flex items-center gap-1.5 px-3 py-2 text-sm border border-border rounded-lg hover:bg-primary-subtle text-secondary transition-colors"
          >
            <Download size={13} /> Export
          </button>
        </div>
      </div>
    </div>
  );
}



