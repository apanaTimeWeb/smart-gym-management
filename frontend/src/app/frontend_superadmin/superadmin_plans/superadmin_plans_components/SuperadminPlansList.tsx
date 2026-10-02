'use client';
import { formatCurrency as SuperadminPlansFormatCurrency } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_utils/SuperadminPlansFormatCurrency';
// RESPONSIBILITY: Renders and composes SuperadminPlansList for the owning feature module; business logic and API transport remain in module-owned hooks/services.
'use client';// DATA FLOW: superadminApi -> useQuery -> SuperadminPlansList
import { Check, Edit2, Trash2, Loader2, Archive } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import { useSuperadminPlansList } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_hooks/useSuperadminPlansList';

import type { SubscriptionPlan } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_types/SuperadminPlansTypes';


/** @description Renders the plans list surface from TanStack Query data and delegates row actions to the owning module. @dependencies Consumes feature-owned query state and plan action callbacks. @edge-case Keeps loading/empty/error states explicit instead of rendering partial stale records. */
export default function SuperadminPlansList() {
  const t = useTranslations('superadmin_plans');
    const locale = useLocale();

    const { plans, isPending, isError, deleteMutation, archiveMutation, openEditModal, confirmPlanDestructiveAction } = useSuperadminPlansList();
    if (isPending) {
        return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (<div key={`skeleton-${i}`} className="h-64 bg-card border border-border rounded-xl motion-safe:animate-pulse"/>))}
      </div>);
    }
    if (isError) {
        return <div className="p-8 text-center text-danger">{t('ui.error_loading_plans_fd7909c9')}</div>;
    }
    return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan: SubscriptionPlan) => {
            const isDeleting = deleteMutation.isPending && deleteMutation.variables?.id === plan.id;
            return (<div key={plan.id} className="bg-card border border-border rounded-xl p-6 flex flex-col relative overflow-hidden group hover:border-focus motion-safe:transition-colors motion-safe:duration-base">
            {plan.isArchived && (<div className="absolute top-0 left-0 bg-surface-hover text-secondary px-3 py-1 text-xs font-bold rounded-br-lg">
                {t('ui.archived_75b8b0f4')}</div>)}
            <div className="absolute top-0 right-0 bg-primary-subtle text-primary px-3 py-1 text-xs font-bold rounded-bl-lg">
              {plan.activeTenants ?? 0} {t('ui.gyms_active_4920a3e4')}</div>

            <div className="mb-4">
              <h2 className="text-xl font-bold text-primary">{plan.name}</h2>
              <div className="flex items-end gap-1 mt-2">
                <span className="text-3xl font-extrabold text-primary">{SuperadminPlansFormatCurrency(Number(plan.priceMonthly), plan.currency || 'INR', locale)}</span>
                <span className="text-secondary font-medium mb-1">{t('ui.mo_14331570')}</span>
              </div>
            </div>

            <div className="space-y-3 flex-1 mb-6">
              <p className="text-sm text-secondary font-medium pb-2 border-b border-border">
                {t('ui.max_members_675c60aa')}<span className="text-primary">{plan.maxMembers}</span>
              </p>
              <p className="text-sm text-secondary font-medium pb-2 border-b border-border">
                {t('ui.max_staff_d35f8519')}<span className="text-primary">{plan.maxStaff}</span>
              </p>
              <p className="text-sm text-secondary font-medium pb-2 border-b border-border">
                {t('ui.db_limit_gb_8738c0c7')}<span className="text-primary">{plan.dbLimitGb ?? 'Unlimited'}</span>
              </p>
              <p className="text-sm text-secondary font-medium pb-2 border-b border-border">
                {t('ui.binary_limit_gb_7822511b')}<span className="text-primary">{plan.binaryLimitGb ?? 'Unlimited'}</span>
              </p>
              <div className="pt-2">
                {plan.features?.map((feat: string, idx: number) => (<div key={feat} className="flex items-center gap-2 mb-2 text-sm text-secondary">
                    <Check size={18} className="text-success shrink-0"/>
                    {feat}
                  </div>))}
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => openEditModal(plan)} disabled={isDeleting || deleteMutation.isPending} aria-label={t('ui.edit_plan_aria', { name: plan.name })} className="flex-1 py-2.5 flex items-center justify-center bg-input hover:bg-primary-subtle hover:text-on-primary text-primary rounded-xl motion-safe:transition-colors border border-border disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_plans-superadmin-plans-list-superadmin-plans-list-button">
                <Edit2 size={18}/>
              </button>
              <button onClick={() => confirmPlanDestructiveAction(plan)} disabled={isDeleting || deleteMutation.isPending || archiveMutation.isPending} aria-label={t('ui.delete_or_archive_plan_aria', { name: plan.name })} title={(plan.activeTenants ?? 0) > 0 ? t('ui.archive_plan_title') : t('ui.delete_plan_title')} className="flex-1 py-2.5 flex items-center justify-center bg-input hover:bg-danger-bg text-secondary rounded-xl motion-safe:transition-colors border border-border disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_plans-plans-list-delete-or-archive">
                {isDeleting || archiveMutation.isPending
                    ? <Loader2 size={18} className="motion-safe:animate-spin"/>
                    : (plan.activeTenants ?? 0) > 0
                        ? <Archive size={18}/>
                        : <Trash2 size={18}/>}
              </button>
            </div>
          </div>);
        })}
    </div>);
}
