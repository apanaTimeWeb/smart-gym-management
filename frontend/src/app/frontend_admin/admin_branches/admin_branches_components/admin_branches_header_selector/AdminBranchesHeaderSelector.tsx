"use client";
// RESPONSIBILITY: Renders only the authenticated shell's branch-scope selector. Branch data and URL interaction remain in the feature hook.
import { useTranslations } from 'next-intl';
import { Building2 } from 'lucide-react';
import { AdminLayoutSearchableDropdown } from '@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_searchable_dropdown/AdminLayoutSearchableDropdown';
import { useAdminBranchesHeaderSelector } from '@/app/frontend_admin/admin_branches/admin_branches_hooks/useAdminBranchesHeaderSelector';

/**
 * AdminBranchesHeaderSelector renders the branch-scope selector without directly owning API access.
 * @remarks Business query state and URL mutations are delegated to useAdminBranchesHeaderSelector.
 * @description AdminBranchesHeaderSelector: Renders only the authenticated shell's branch-scope selector. Branch data and URL interaction remain in the feature hook.
 * @dependencies Consumes AdminLayoutSearchableDropdown, useAdminBranchesHeaderSelector.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminBranchesHeaderSelector() {
  const t = useTranslations();
  const { branchOptions, selectedBranchId, handleChange } = useAdminBranchesHeaderSelector();
  return (
    <div className="hidden lg:flex items-center gap-2 bg-header border border-border rounded-lg px-3 py-1.5">
      <Building2 size={18} strokeWidth={2} className="text-secondary shrink-0" aria-hidden="true" />
      <AdminLayoutSearchableDropdown
        options={branchOptions}
        value={selectedBranchId}
        onChange={handleChange}
        className="w-52"
        placeholder={t('branches.admin_branches_header_selector.text_fcf716ea9b')}
        testId="admin_branches-admin_branches-header-selector-select"
      />
    </div>
  );
}
