'use client';
/**
 * RESPONSIBILITY: React component SuperadminPlansMain owned by the superadmin_plans feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Feature-local Zustand UI state only
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_plans/superadmin_plans_store/useSuperadminPlansStore, @/app/frontend_superadmin/superadmin_plans/superadmin_plans_components/SuperadminPlansList, @/app/frontend_superadmin/superadmin_plans/superadmin_plans_components/SuperadminPlansPlanCreateModal, @/app/frontend_superadmin/superadmin_plans/superadmin_plans_components/SuperadminPlansPlanEditModal
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: SuperadminPlansMain.tsx is the root client entry for the Plans page. Reads the feature-local Zustand store to open the create-plan modal.
import { useTranslations } from 'next-intl';

import SuperadminPlansList from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_components/SuperadminPlansList';
import SuperadminPlansPlanCreateModal from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_components/SuperadminPlansPlanCreateModal';
import SuperadminPlansPlanEditModal from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_components/SuperadminPlansPlanEditModal';
import { useSuperadminPlansStore } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_store/useSuperadminPlansStore';


/**
 * @description SuperadminPlansMain.tsx is the root client entry for the Plans page. Reads the feature-local Zustand store to open the create-plan modal.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminPlansMain() {
  const t = useTranslations('superadmin_plans');
    const openCreateModal = useSuperadminPlansStore(state => state.openCreateModal);
    return (<div className="space-y-8" data-testid="superadmin_plans-superadmin-plans-main-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">{t('ui.subscription_plans_220d816e')}</h1>
          <p className="text-secondary mt-1">{t('ui.manage_pricing_tiers_and_limits_for_gyms_b565ab9a')}</p>
        </div>
        <button onClick={openCreateModal} className="bg-primary text-on-primary px-4 py-2 rounded-lg font-medium hover:bg-primary-hover motion-safe:transition-colors motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_plans-superadmin-plans-main-main-create-new-plan">
          {t('ui.create_new_plan_ec496c23')}</button>
      </div>

      <SuperadminPlansList />
      <SuperadminPlansPlanCreateModal />
      <SuperadminPlansPlanEditModal />
    </div>);
}
