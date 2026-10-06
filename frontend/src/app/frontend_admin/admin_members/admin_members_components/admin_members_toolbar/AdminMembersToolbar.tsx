"use client";
// RESPONSIBILITY: Renders the search, status filter, branch filter, and expiry filter toolbar for Admin Members.
import { useTranslations } from 'next-intl';

import type { AdminMembersExpiryFilter } from '@/app/frontend_admin/admin_members/admin_members_types/AdminMembersUiTypes';
import type { AdminMembersStatusFilter } from '@/app/frontend_admin/admin_members/admin_members_types/AdminMembersTypes';
import { Search } from 'lucide-react';
import { useAdminMembersStore } from '@/app/frontend_admin/admin_members/admin_members_store/useAdminMembersStore';
import { useAdminMembersBranchReference } from '@/app/frontend_admin/admin_members/admin_members_hooks/useAdminMembersBranchReference';
import { AdminLayoutSearchableDropdown } from '@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_searchable_dropdown/AdminLayoutSearchableDropdown';
import { MEMBER_GENDER_OPTIONS, MEMBER_PLAN_OPTIONS, MEMBER_STATUS_OPTIONS, EXPIRY_FILTER_OPTIONS } from '@/app/frontend_admin/admin_members/admin_members_constants/AdminMembersConstants';
import type { MemberStatus } from '@/app/frontend_admin/admin_members/admin_members_types/AdminMembersTypes';
import type { AdminMembersBranchReference } from '@/app/frontend_admin/admin_members/admin_members_types/AdminMembersBranchReferenceTypes';

import type { AdminMembersToolbarProps } from '@/app/frontend_admin/admin_members/admin_members_types/AdminMembersToolbarPropsTypes';


/**
 * AdminMembersToolbar renders the admin members toolbar UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminMembersToolbar: Renders the search, status filter, branch filter, and expiry filter toolbar for Admin Members.
 * @dependencies Consumes AdminMembersUiTypes, useAdminMembersStore, useAdminMembersBranchReference, AdminLayoutSearchableDropdown, AdminMembersConstants.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminMembersToolbar() {
  const t = useTranslations();


  const { search, setSearch, statusFilter, setStatusFilter, branchFilter, setBranchFilter, expiryFilter, setExpiryFilter, genderFilter, setGenderFilter, planFilter, setPlanFilter } = useAdminMembersStore();
  const { data: branches = [] } = useAdminMembersBranchReference();

  const branchOptions = [
    { value: 'all', label: t('members.AdminAuditRepair.allBranches') },
    ...(branches as AdminMembersBranchReference[]).map((b) => ({ value: b.id, label: b.name })),
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
      <div className="relative flex-1 min-w-48">
        <span className="absolute inset-y-0 left-3 flex items-center"><Search size={18} className="text-secondary pointer-events-none"  strokeWidth={2}/></span>
        <input
          type="text"
          placeholder={t('members.admin_members_toolbar.text_9fd6edc02a')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-input border border-border rounded-xl text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary placeholder:text-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
          aria-label={t('members.admin_members_toolbar.text_a1d97aee95')}
         data-testid="admin_members-admin_members-toolbar-control"/>
      </div>
      <div className="w-full sm:w-44">
        <AdminLayoutSearchableDropdown
          options={MEMBER_STATUS_OPTIONS.map((o) => ({ value: o.value, label: t(o.labelKey) }))}
          value={statusFilter}
          onChange={(v) => setStatusFilter(v as AdminMembersStatusFilter)}
          placeholder={t('members.admin_members_toolbar.text_6b308de777')}
         testId="admin_members-admin_members-toolbar-change"/>
      </div>
      <div className="w-full sm:w-48">
        <AdminLayoutSearchableDropdown
          options={branchOptions}
          value={branchFilter}
          onChange={(v) => setBranchFilter(v as string)}
          placeholder={t('members.admin_members_toolbar.text_0bf51d9a45')}
         testId="admin_members-admin_members-toolbar-change-2"/>
      </div>
      <div className="w-full sm:w-52 flex gap-2">
        <AdminLayoutSearchableDropdown
          options={EXPIRY_FILTER_OPTIONS.map((o) => ({ value: o.value, label: t(o.labelKey) }))}
          value={expiryFilter}
          onChange={(v) => setExpiryFilter(v as AdminMembersExpiryFilter)}
          placeholder={t('members.admin_members_toolbar.text_5a8d375693')}
         testId="admin_members-admin_members-toolbar-change-3"/>
      </div>
      <div className="w-full sm:w-40">
        <AdminLayoutSearchableDropdown
          options={MEMBER_GENDER_OPTIONS.map((o) => ({ value: o.value, label: t(o.labelKey) }))}
          value={genderFilter}
          onChange={(v) => setGenderFilter(v as string)}
          placeholder={t('members.admin_members_toolbar.text_1632205ebc')}
         testId="admin_members-admin_members-toolbar-change-4"/>
      </div>
      <div className="w-full sm:w-44">
        <AdminLayoutSearchableDropdown
          options={MEMBER_PLAN_OPTIONS.map((o) => ({ value: o.value, label: t(o.labelKey) }))}
          value={planFilter}
          onChange={(v) => setPlanFilter(v as string)}
          placeholder={t('members.admin_members_toolbar.text_5f1f815bea')}
         testId="admin_members-admin_members-toolbar-change-5"/>
      </div>

    </div>
  );
}