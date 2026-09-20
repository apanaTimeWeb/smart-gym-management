// RESPONSIBILITY: Renders the Manager StoreFilters presentation layer for the Manager module.
'use client';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';
import { useManagerStoreLogic } from '@/app/manager/store/store_hooks/ManagerUseManagerStoreLogic';
import type { ManagerStoreSortOrder } from '@/app/manager/store/store_types/ManagerStoreTypes';


export default function ManagerStoreFilters() {
  const { startDate, setStartDate, endDate, setEndDate, sortOrder, setSortOrder } = useManagerStoreLogic();

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 border-b border-border">
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        <div className="flex flex-col">
          <label className="text-xs text-secondary uppercase font-semibold mb-1">Start Date</label>
          <input 
            type="date" 
            value={startDate} 
            onChange={e => setStartDate(e.target.value)} 
            className="text-sm px-3 py-2 rounded-lg border border-border bg-input text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs text-secondary uppercase font-semibold mb-1">End Date</label>
          <input 
            type="date" 
            value={endDate} 
            onChange={e => setEndDate(e.target.value)} 
            className="text-sm px-3 py-2 rounded-lg border border-border bg-input text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
      </div>
      <div className="flex flex-col w-full sm:w-auto">
        <label className="text-xs text-secondary uppercase font-semibold mb-1">Sort By Date</label>
        <ManagerSearchableDropdown
          value={sortOrder}
          onChange={(val) => setSortOrder(String(val) as ManagerStoreSortOrder)}
          options={[
            { label: 'Newest First', value: 'DESC' },
            { label: 'Oldest First', value: 'ASC' }
          ]}
        />
      </div>
    </div>
  );
}
