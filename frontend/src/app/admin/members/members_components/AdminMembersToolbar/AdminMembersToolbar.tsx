"use client";
// RESPONSIBILITY: Renders the search, status filter, branch filter, and expiry filter toolbar for Admin Members.

import type { AdminMembersExpiryFilter } from '@/app/admin/members/members_types/AdminMembersUiTypes';
import { Search, Download } from 'lucide-react';
import { useAdminMembersStore } from '@/app/admin/members/members_store/useAdminMembersStore';
import { useAdminMembersBranchReference } from '@/app/admin/members/members_context/useAdminMembersBranchReference';
import { AdminSearchableDropdown } from '@/app/admin/admin_layout/AdminShared/AdminSearchableDropdown/AdminSearchableDropdown';
import { MEMBER_STATUS_OPTIONS, EXPIRY_FILTER_OPTIONS } from '@/app/admin/members/members_utils/AdminMembersSharedConstants';
import type { MemberStatus } from '@/app/admin/members/members_types/AdminMembersTypes';
import type { AdminMembersBranchReference } from '@/app/admin/members/members_types/AdminMembersBranchReferenceTypes';

import type { AdminMembersToolbarProps } from '@/app/admin/members/members_types/AdminMembersToolbarPropsTypes';


export default function AdminMembersToolbar({ onExportMembers }: AdminMembersToolbarProps) {

  const { search, setSearch, statusFilter, setStatusFilter, branchFilter, setBranchFilter, expiryFilter, setExpiryFilter, genderFilter, setGenderFilter, planFilter, setPlanFilter } = useAdminMembersStore();
  const { data: branches = [] } = useAdminMembersBranchReference();

  const branchOptions = [
    { value: 'all', label: 'All Branches' },
    ...(branches as AdminMembersBranchReference[]).map((b) => ({ value: b.id, label: b.name })),
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
      <div className="relative flex-1 min-w-48">
        <span className="absolute inset-y-0 left-3 flex items-center"><Search size={16} className="text-secondary pointer-events-none" /></span>
        <input
          type="text"
          placeholder="Search by name, email, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-input border border-border rounded-xl text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary placeholder:text-secondary"
          aria-label="Search members"
        />
      </div>
      <div className="w-full sm:w-44">
        <AdminSearchableDropdown
          options={MEMBER_STATUS_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          value={statusFilter}
          onChange={(v) => setStatusFilter(v as MemberStatus | 'all')}
          placeholder="All Status"
        />
      </div>
      <div className="w-full sm:w-48">
        <AdminSearchableDropdown
          options={branchOptions}
          value={branchFilter}
          onChange={(v) => setBranchFilter(v as string)}
          placeholder="All Branches"
        />
      </div>
      <div className="w-full sm:w-52 flex gap-2">
        <AdminSearchableDropdown
          options={EXPIRY_FILTER_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          value={expiryFilter}
          onChange={(v) => setExpiryFilter(v as AdminMembersExpiryFilter)}
          placeholder="All Members"
        />
      </div>
      <div className="w-full sm:w-40">
        <AdminSearchableDropdown
          options={[
            { value: 'all', label: 'All Genders' },
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
            { value: 'Other', label: 'Other' },
          ]}
          value={genderFilter}
          onChange={(v) => setGenderFilter(v as string)}
          placeholder="All Genders"
        />
      </div>
      <div className="w-full sm:w-44">
        <AdminSearchableDropdown
          options={[
            { value: 'all', label: 'All Plans' },
            { value: 'basic', label: 'Monthly Basic' },
            { value: 'pro', label: 'Annual Pro' },
            { value: 'classic', label: 'Quarterly Classic' },
          ]}
          value={planFilter}
          onChange={(v) => setPlanFilter(v as string)}
          placeholder="All Plans"
        />
      </div>
      <div className="flex gap-2 ml-auto">
        <button onClick={() => void onExportMembers()} className="flex items-center gap-2 px-4 py-2 bg-input border border-border rounded-xl text-sm font-semibold hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
          <Download size={16} /> CSV
        </button>
      </div>
    </div>
  );
}