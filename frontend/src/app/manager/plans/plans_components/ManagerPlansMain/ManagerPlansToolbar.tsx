// RESPONSIBILITY: Renders search and filter controls for the plans list.
'use client';
import { Search } from 'lucide-react';
import { useManagerPlansLogic } from '@/app/manager/plans/plans_hooks/ManagerUseManagerPlansLogic';


export default function ManagerPlansToolbar() {
  const { search, setSearch, tierFilter, setTierFilter, statusFilter, setStatusFilter } = useManagerPlansLogic();

  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="relative flex-1 max-w-xs">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
        <input
          type="text"
          placeholder="Search plans..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:border-primary"
        />
      </div>
      <select
        value={tierFilter}
        onChange={e => setTierFilter(e.target.value)}
        className="px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:border-primary"
      >
        <option value="ALL">All Tiers</option>
        <option value="BASIC">Basic</option>
        <option value="GOLD">Gold</option>
        <option value="PREMIUM">Premium</option>
      </select>
      <select
        value={statusFilter}
        onChange={e => setStatusFilter(e.target.value)}
        className="px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:border-primary"
      >
        <option value="ALL">All Status</option>
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
      </select>
    </div>
  );
}
