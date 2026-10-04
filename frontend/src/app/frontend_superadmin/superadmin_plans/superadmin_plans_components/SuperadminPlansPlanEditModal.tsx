// RESPONSIBILITY: Renders/orchestrates SuperadminPlansPlanEditModal within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminPlansPlanEditModal owned by the superadmin_plans feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useEffect, useForm
 * MODULE DEPENDENCIES: @hookform/resolvers/zod, lucide-react, @/app/frontend_superadmin/superadmin_plans/superadmin_plans_store/useSuperadminPlansStore, @/app/frontend_superadmin/superadmin_plans/superadmin_plans_hooks/useSuperadminPlansPlanMutations, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard, @/app/frontend_superadmin/superadmin_plans/superadmin_plans_schemas/SuperadminPlansSchema, @/app/frontend_superadmin/superadmin_plans/superadmin_plans_types/SuperadminPlansFormTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the modal form for editing an existing subscription plan. Reads/writes via useSuperadminPlansStore.
import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { X, Plus, Trash2, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'sonner';

import { useSuperadminLayoutUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard';
import { useSuperadminPlansPlanMutations } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_hooks/useSuperadminPlansPlanMutations';
import { planFormSchema } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_schemas/SuperadminPlansSchema';
import { useSuperadminPlansStore } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_store/useSuperadminPlansStore';

import type { SuperadminPlansFormValues } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_types/SuperadminPlansFormTypes';
import type { SubmitHandler, Resolver } from 'react-hook-form';


/**
 * @description Owns the SuperadminPlansPlanEditModal responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminPlansPlanEditModal() {
  const t = useTranslations('superadmin_plans');
    const isOpen = useSuperadminPlansStore(state => state.isEditModalOpen);
    const closeEditModal = useSuperadminPlansStore(state => state.closeEditModal);
    const selectedPlan = useSuperadminPlansStore(state => state.selectedPlan);
    const { updatePlan, isUpdating } = useSuperadminPlansPlanMutations();
    const { register, control, handleSubmit, formState: { errors, isDirty }, reset } = useForm<SuperadminPlansFormValues>({
        resolver: zodResolver(planFormSchema) as unknown as Resolver<SuperadminPlansFormValues>,
    });
  useSuperadminLayoutUnsavedChangesGuard(isDirty);
    const { fields, append, remove } = useFieldArray({ control, name: 'features' });
    // Populate form when selectedPlan changes
    // EXPLANATION: Synchronize component state with external dependencies.
    // EFFECT DEPENDENCIES: Documented intentionally.
    // EFFECT INTENT: Synchronize local UI state with the listed inputs and clean up any browser/resource subscription created by this effect.
    useEffect(() => {
        if (selectedPlan && isOpen) {
            reset({
                name: selectedPlan.name,
                priceMonthly: selectedPlan.priceMonthly,
                priceAnnual: selectedPlan.priceAnnual,
                maxMembers: selectedPlan.maxMembers,
                maxStaff: selectedPlan.maxStaff,
                dbLimitGb: selectedPlan.dbLimitGb ?? 1.0,
                binaryLimitGb: selectedPlan.binaryLimitGb ?? 10.0,
                features: selectedPlan.features?.length > 0
                    ? selectedPlan.features.map(f => ({ value: f }))
                    : [{ value: 'Core Gym Management' }],
            });
        }
    }, [selectedPlan, isOpen, reset]);

    if (!isOpen || !selectedPlan)
        return null;
    const isSubmitting = isUpdating;
    const handleSubmitForm: SubmitHandler<SuperadminPlansFormValues> = async (data) => {
      try {
        const response = await updatePlan({ id: selectedPlan!.id, payload: { ...data, features: data.features.map(f => f.value), currency: 'INR', isPublic: true, trialDays: 14, setupFee: 0 } });
        toast.success(response.message, { id: 'superadmin-plan-update' });
        closeEditModal();
      } catch (error: unknown) {
        toast.error(t('ui.plan_update_error_retry_6f1e4c2b'), { id: 'superadmin-plan-update' });
      }
    };
    return (<div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay backdrop-blur-sm p-4" role="dialog" aria-modal="true" data-testid="superadmin_plans-plan-edit-modal-dialog">
      <div className="bg-overlay border border-border rounded-xl w-full max-w-2xl max-h-screen overflow-hidden flex flex-col shadow-dialog">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-primary">{t('ui.edit_subscription_plan_396f9001')}</h2>
          <button onClick={closeEditModal} className="p-2 hover:bg-input rounded-full motion-safe:transition-colors text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-label={t('ui.close_modal_a2071564')} data-testid="superadmin_plans-superadmin-plans-plan-edit-modal-edit-modal-close-modal">
            <X size={18}/>
          </button>
        </div>

        <form onSubmit={handleSubmit(handleSubmitForm)} className="flex-1 overflow-y-auto p-6 space-y-6" data-testid="superadmin_plans-superadminplansplaneditmodal-form-1">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary">{t('ui.plan_name_b356b614')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
            <input {...register('name')} placeholder={t('ui.e_g_pro_tier_cfb8cb80')} className="w-full bg-input border border-border rounded-xl px-4 py-3 text-primary focus:border-focus outline-none motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_plans-superadmin-plans-plan-edit-modal-plan-edit-modal-input"/>
            {errors.name && <p className="text-danger text-xs">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {(['priceMonthly', 'priceAnnual'] as const).map(field => (<div key={field} className="space-y-2">
                <label className="block text-sm font-medium text-secondary">{field === 'priceMonthly' ? t('ui.monthly_price') : t('ui.annual_price')} <span className="text-danger">{t('ui.text_3389dae3')}</span></label>
                <input type="number" min="0" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+')
            e.preventDefault(); }} step="0.01" {...register(field, { valueAsNumber: true })} className="w-full bg-input border border-border rounded-xl px-4 py-3 text-primary focus:border-focus outline-none motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_plans-superadmin-plans-plan-edit-modal-plan-edit-modal-number"/>
                {errors[field] && <p className="text-danger text-xs">{errors[field]?.message}</p>}
              </div>))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {(['maxMembers', 'maxStaff'] as const).map(field => (<div key={field} className="space-y-2">
                <label className="block text-sm font-medium text-secondary">{field === 'maxMembers' ? t('ui.max_members_675c60aa') : t('ui.max_staff_d35f8519')} <span className="text-danger">{t('ui.text_3389dae3')}</span></label>
                <input type="number" min="0" step="1" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+')
            e.preventDefault(); }} {...register(field, { valueAsNumber: true })} className="w-full bg-input border border-border rounded-xl px-4 py-3 text-primary focus:border-focus outline-none motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_plans-superadmin-plans-plan-edit-modal-edit-modal-number-2"/>
                {errors[field] && <p className="text-danger text-xs">{errors[field]?.message}</p>}
              </div>))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {(['dbLimitGb', 'binaryLimitGb'] as const).map(field => (<div key={field} className="space-y-2">
                <label className="block text-sm font-medium text-secondary">{field === 'dbLimitGb' ? 'DB Limit (GB)' : 'Binary Limit (GB)'} <span className="text-danger">{t('ui.text_3389dae3')}</span></label>
                <input type="number" min="0" step="0.1" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+')
            e.preventDefault(); }} {...register(field, { valueAsNumber: true })} className="w-full bg-input border border-border rounded-xl px-4 py-3 text-primary focus:border-focus outline-none motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_plans-superadmin-plans-plan-edit-modal-edit-modal-number-3"/>
                {errors[field] && <p className="text-danger text-xs">{errors[field]?.message}</p>}
              </div>))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-secondary">{t('ui.features_list_ec36d7dd')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
              <button type="button" onClick={() => append({ value: '' })} className="flex items-center gap-1 text-sm text-primary hover:text-primary-hover font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_plans-superadmin-plans-plan-edit-modal-edit-modal-add-feature">
                <Plus size={18} strokeWidth={2}/> {t('ui.add_feature_7a5ba7b8')}</button>
            </div>
            {fields.map((field, index) => (<div key={field.id} className="flex flex-wrap items-center gap-2">
                <input {...register(`features.${index}.value`)} placeholder={t('ui.e_g_advanced_analytics_9e35df0c')} className="flex-1 bg-input border border-border rounded-xl px-4 py-2.5 text-primary focus:border-focus outline-none motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_plans-plan-edit-form-feature-value-input"/>
                {fields.length > 1 && (<button type="button" onClick={() => remove(index)} className="p-2.5 text-secondary hover:text-danger hover:bg-danger-bg rounded-xl motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-label={t('ui.remove_feature_423ab730')} data-testid="superadmin_plans-superadmin-plans-plan-edit-modal-edit-modal-remove-feature">
                    <Trash2 size={18}/>
                  </button>)}
              </div>))}
          </div>
        </form>

        <div className="p-6 border-t border-border bg-sidebar flex justify-end gap-3">
          <button type="button" onClick={closeEditModal} className="px-6 py-2.5 rounded-xl font-medium text-secondary hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_plans-superadmin-plans-plan-edit-modal-plan-edit-modal-cancel">{t('ui.cancel_ea478870')}</button>
          <button onClick={handleSubmit(handleSubmitForm)} disabled={isSubmitting} className="px-6 py-2.5 rounded-xl font-medium bg-primary text-on-primary hover:bg-primary-hover motion-safe:transition-colors disabled:opacity-50 flex items-center gap-2 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_plans-superadmin-plans-plan-edit-modal-plan-edit-modal-button">
            {isSubmitting ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin"/> {t('ui.saving_575f5f86')}</> : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>);
}
