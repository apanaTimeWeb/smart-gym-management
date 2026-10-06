"use client";
// RESPONSIBILITY: Search + filter toolbar for the Blacklist module.
import { useTranslations } from 'next-intl';

import { Search, Plus } from 'lucide-react';
import { useState } from 'react';
import { useAdminBlacklistStore } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_store/useAdminBlacklistStore';
import { useAdminBlacklistLogic } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_hooks/useAdminBlacklistLogic';
import { BLACKLIST_SCOPE_OPTIONS, BLACKLIST_GYM_OPTIONS } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_constants/AdminBlacklistConstants';
import { AdminLayoutSearchableDropdown } from '@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_searchable_dropdown/AdminLayoutSearchableDropdown';

/**
 * AdminBlacklistToolbar renders the admin blacklist toolbar UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminBlacklistToolbar: Search + filter toolbar for the Blacklist module.
 * @dependencies Consumes useAdminBlacklistStore, useAdminBlacklistLogic, AdminBlacklistConstants, AdminLayoutSearchableDropdown.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminBlacklistToolbar() {
  const t = useTranslations();

  const { scopeFilter, setScopeFilter, gymFilter, setGymFilter, setSearch } = useAdminBlacklistStore();
  const { openAdd } = useAdminBlacklistLogic();
  const [localSearch, setLocalSearch] = useState('');

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto">
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center"><Search size={18} className="text-secondary"  strokeWidth={2}/></span>
          <input
            type="text"
            placeholder={t('blacklist.admin_blacklist_toolbar.text_212b62a779')}
            value={localSearch}
            onChange={(e) => { setLocalSearch(e.target.value); setSearch(e.target.value); }}
            className="pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-64 focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
           data-testid="admin_blacklist-admin_blacklist-toolbar-control"/>
        </div>
        <div className="w-40"><AdminLayoutSearchableDropdown options={BLACKLIST_SCOPE_OPTIONS.map((option) => ({ ...option, label: t(option.labelKey) }))} value={scopeFilter} onChange={(v) => setScopeFilter(v as string)} placeholder={t('blacklist.admin_blacklist_toolbar.text_b64efd493e')}  testId="admin_blacklist-admin_blacklist-toolbar-change"/></div>
        <div className="w-40"><AdminLayoutSearchableDropdown options={BLACKLIST_GYM_OPTIONS.map((option) => ({ ...option, label: t(option.labelKey) }))} value={gymFilter} onChange={(v) => setGymFilter(v as string)} placeholder={t('blacklist.admin_blacklist_toolbar.text_1ea6687cfe')}  testId="admin_blacklist-admin_blacklist-toolbar-change-2"/></div>
      </div>
      <button type="button"
        onClick={openAdd}
        className="flex items-center gap-2 px-4 py-2 bg-danger text-on-danger rounded-lg text-sm font-semibold hover:opacity-90 motion-safe:transition-opacity motion-safe:active:scale-95 whitespace-nowrap motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11"
       data-testid="admin_blacklist-admin_blacklist-toolbar-click">
        <Plus size={18}  strokeWidth={2}/>
        {t('blacklist.admin_blacklist_toolbar.text_e0b464e57f')}</button>
    </div>
  );
}