'use client';
import { useSuperadminWhiteLabelingDomains } from '../white-labeling_hooks/useSuperadminWhiteLabeling';
import { useSuperadminWhiteLabelingStore } from '../white-labeling_store/useSuperadminWhiteLabelingStore';
import SuperadminWhiteLabelingTable from './SuperadminWhiteLabelingTable';
import SuperadminWhiteLabelingDrawer from './SuperadminWhiteLabelingDrawer';
import { Search, Globe, Filter } from 'lucide-react';
import { useMemo } from 'react';

export default function SuperadminWhiteLabelingMain() {
  const { data: response, isLoading, isError, error } = useSuperadminWhiteLabelingDomains();
  const { searchQuery, setSearchQuery, statusFilter, setStatusFilter, selectedDomainId } = useSuperadminWhiteLabelingStore();

  const domains = response?.data || [];

  const filteredDomains = useMemo(() => {
    return domains.filter(domain => {
      const matchesSearch = domain.gymName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            domain.domain.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || domain.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [domains, searchQuery, statusFilter]);

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-4">
        <div className="h-10 w-48 bg-card rounded-md animate-pulse"></div>
        <div className="h-64 w-full bg-card rounded-xl border border-border animate-pulse"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-danger-bg border border-danger/20 rounded-xl p-6 text-center text-danger">
        <p className="font-semibold text-lg">Failed to load custom domains</p>
        <p className="text-sm mt-1">{error?.message || 'Please try again later.'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header and KPIs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Globe className="w-6 h-6 text-brand" />
            White-Labeling & Domains
          </h1>
          <p className="text-secondary text-sm mt-1">Manage custom domains and branding for tenant gyms.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-card p-4 rounded-xl border border-border">
        
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
          <input
            type="text"
            placeholder="Search by gym name or domain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand motion-safe:transition-shadow"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-secondary shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full sm:w-40 bg-input border border-border rounded-lg text-sm text-primary py-2 px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand motion-safe:transition-shadow"
            aria-label="Filter by status"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        
      </div>

      {/* Table */}
      <SuperadminWhiteLabelingTable domains={filteredDomains} />

      {/* Drawer */}
      {selectedDomainId && <SuperadminWhiteLabelingDrawer domains={domains} />}
      
    </div>
  );
}
