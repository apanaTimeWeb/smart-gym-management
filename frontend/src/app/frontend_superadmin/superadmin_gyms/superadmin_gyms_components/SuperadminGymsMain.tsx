'use client';
import SuperadminGymsToolbar from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_components/superadmin_gyms_toolbar/SuperadminGymsToolbar';
import SuperadminGymsTable from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_components/superadmin_gyms_table/SuperadminGymsTable';
import SuperadminGymsCalendar from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_components/superadmin_gyms_calendar/SuperadminGymsCalendar';
import { useTranslations } from 'next-intl';
import { useSuperadminGymsStore } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_store/useSuperadminGymsStore';
import { useUrlState } from '@/hooks/useUrlState';
import { Plus } from 'lucide-react';
import { SUPERADMIN_GYMS_STATUS_FILTER_OPTIONS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_constants/SuperadminGymsFilterConstants';
/**

 * RESPONSIBILITY: React component SuperadminGymsMain owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: next/link, lucide-react, @/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_url_config, @/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_components/superadmin_gyms_toolbar/SuperadminGymsToolbar, @/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_components/superadmin_gyms_table/SuperadminGymsTable, @/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_components/superadmin_gyms_calendar/SuperadminGymsCalendar, @/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_constants/SuperadminGymsFilterConstants, @/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_store/useSuperadminGymsStore
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Root orchestrator for the Gyms page. Renders the layout, toolbar, and table.
import Link from 'next/link';

import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_url_config';
import { SuperadminLayoutErrorBoundary } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_error_boundary/SuperadminLayoutErrorBoundary';



/**
 * @description Owns the SuperadminGymsMain responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminGymsMain() {
  const t = useTranslations('superadmin_gyms');
    const viewMode = useSuperadminGymsStore(state => state.viewMode);
    const { getParam, setParam } = useUrlState();
    const statusFilter = getParam('statusFilter', 'All');
    
    return (<div className="space-y-6" data-testid="superadmin_gyms-superadmin-gyms-main-page">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">{t('ui.gyms_e88a3380')}</h1>
          <p className="text-secondary mt-1">{t('ui.manage_your_saas_clients_subscriptions_and_a_95ea8e0a')}</p>
        </div>
        <Link href={MODULE_URLS.PAGES.ADD} className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-on-primary px-4 py-2 rounded-lg font-medium motion-safe:transition-colors shadow-card" data-testid="superadmin_gyms-superadmin-gyms-main-main-onboard-new-gym">
          <Plus size={18}/>
          {t('ui.onboard_new_gym_01dd398f')}</Link>
      </div>

      <div className="flex w-full overflow-x-auto border-b border-border hide-scrollbar">
        {SUPERADMIN_GYMS_STATUS_FILTER_OPTIONS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setParam('statusFilter', value)}
            className={`whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 motion-safe:transition-colors focus-visible:outline-none focus-visible:bg-surface-hover ${
              statusFilter === value
                ? 'border-focus text-primary'
                : 'border-transparent text-secondary hover:text-primary hover:border-border'
            }`}
           data-testid={`gyms-superadmin-gyms-main-status-${value.toLowerCase()}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="bg-page border border-border rounded-xl overflow-hidden shadow-card">
        <SuperadminGymsToolbar />
        <SuperadminLayoutErrorBoundary variant="inline">
          {viewMode === 'calendar' ? <SuperadminGymsCalendar /> : <SuperadminGymsTable />}
        </SuperadminLayoutErrorBoundary>
      </div>
    </div>);
}
