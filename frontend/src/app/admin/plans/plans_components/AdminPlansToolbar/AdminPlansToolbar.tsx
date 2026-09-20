"use client";
// RESPONSIBILITY: Renders Plans search/filter/refresh/create controls using the single Plans logic owner supplied by the module entry point.

import { useEffect, useState } from 'react';
import { Plus, RefreshCw, Search } from 'lucide-react';
import type { PlansContextType } from '@/app/admin/plans/plans_types/AdminPlansTypes';
import { TIERS } from '@/app/admin/plans/plans_utils/AdminPlansSharedConstants';

export default function AdminPlansToolbar({ logic }: { logic: PlansContextType }) {
  const { plans, search, setSearch, tierFilter, setTierFilter, loadPlans, openAdd } = logic;
  const [localSearch, setLocalSearch] = useState(search);

// EFFECT: Synchronizes this component effect with its declared React dependencies in plans/plans_components/AdminPlansToolbar/AdminPlansToolbar.tsx.
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

// EFFECT: Synchronizes this component effect with its declared React dependencies in plans/plans_components/AdminPlansToolbar/AdminPlansToolbar.tsx.
  useEffect(() => {
    if (localSearch === search) return;
    const timer = window.setTimeout(() => setSearch(localSearch), 300);
    return () => window.clearTimeout(timer);
  }, [localSearch, search, setSearch]);

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-card">
      <div className="flex flex-wrap items-center gap-4">
        <p className="hidden text-sm text-secondary sm:block">Active Plans: <span className="font-bold text-primary">{plans.length}</span></p>
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center"><Search size={18} className="text-secondary" aria-hidden="true" /></span>
          <label htmlFor="admin-plans-search" className="sr-only">Search plans</label>
          <input id="admin-plans-search" value={localSearch} onChange={(event) => setLocalSearch(event.target.value)} placeholder="Search plans..." className="w-48 rounded-lg border border-border bg-input py-2 pl-9 pr-3 text-sm text-primary focus-visible:border-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-64" />
        </div>
        <label htmlFor="admin-plans-tier" className="sr-only">Filter plans by tier</label>
        <select id="admin-plans-tier" value={tierFilter} onChange={(event) => setTierFilter(event.target.value)} className="rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <option value="All">All Tiers</option>
          {TIERS.map((tier) => <option key={tier} value={tier}>{tier}</option>)}
        </select>
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => void loadPlans()} aria-label="Refresh plans" className="min-h-11 min-w-11 flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-secondary motion-safe:transition-colors motion-safe:duration-base hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <RefreshCw size={18} aria-hidden="true" />
        </button>
        <button type="button" onClick={openAdd} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary motion-safe:transition-colors motion-safe:duration-base hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <Plus size={18} aria-hidden="true" /> Create Plan
        </button>
      </div>
    </div>
  );
}
