// RESPONSIBILITY: Renders the membership renewal/upgrade form; all lifecycle and mutation logic live in the form hook.
'use client';
import { X, Save } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { formatCurrency } from '@/app/manager/manager_layout/manager_utils/ManagerFormatCurrency';

import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { useManagerMembersRenewForm } from '@/app/manager/members/members_hooks/ManagerUseManagerMembersRenewForm';
import { MANAGER_MEMBER_MAX_CUSTOM_DAYS, MANAGER_MEMBER_MAX_AMOUNT_MAJOR_UNITS } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';
import { useLocale } from "next-intl";

export default function ManagerRenewModal() {
    const locale = useLocale();
  const { showRenewModal, setShowRenewModal, selectedMember, plans, form, actionType, planId, billingCycle, customDays, selectedPlan, calculatedPrice, paymentMethods, cycleLabels, submit, handleClose } = useManagerMembersRenewForm();
  const { register, control, formState: { errors, isSubmitting } } = form;
  if (!showRenewModal || !selectedMember) return null;
  return <div className="fixed inset-0 bg-overlay-backdrop z-40 flex items-center justify-center p-4">
    <div className="bg-overlay rounded-2xl shadow-dialog w-full max-w-xl max-h-full overflow-y-auto border-2 border-primary">
      <div className="sticky top-0 px-8 py-5 border-b border-border bg-overlay flex items-center justify-between z-10">
        <div><h3 className="text-xl font-bold text-primary">Renew / Upgrade Plan</h3><p className="text-sm text-secondary mt-1">For {selectedMember.name}</p></div>
        <button type="button" onClick={handleClose} aria-label="Close renewal form" className="p-2 rounded-full hover:bg-primary-subtle motion-safe:transition-colors text-secondary hover:text-primary"><X size={18} /></button>
      </div>
      <form onSubmit={submit} className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <fieldset className="sm:col-span-2 flex gap-4 p-1.5 bg-input rounded-xl border border-border w-fit">
            <legend className="sr-only">Membership action</legend>
            <label className={`flex-1 flex text-center cursor-pointer px-4 py-1.5 rounded-lg text-sm font-semibold motion-safe:transition-all ${actionType === 'renew' ? 'bg-primary-subtle text-primary shadow-card' : 'text-secondary hover:text-primary'}`}><input type="radio" value="renew" {...register('actionType')} className="sr-only" />Renew Plan</label>
            <label className={`flex-1 flex text-center cursor-pointer px-4 py-1.5 rounded-lg text-sm font-semibold motion-safe:transition-all ${actionType === 'upgrade' ? 'bg-primary-subtle text-primary shadow-card' : 'text-secondary hover:text-primary'}`}><input type="radio" value="upgrade" {...register('actionType')} className="sr-only" />Upgrade Plan</label>
          </fieldset>
          <div><label className="block text-sm font-medium text-secondary mb-1.5">Plan</label><Controller name="planId" control={control} render={({ field }) => <ManagerSearchableDropdown options={plans.map((plan) => ({ value: String(plan.id), label: plan.name }))} value={field.value} onChange={field.onChange} placeholder="Select plan..." />} />{errors.planId && <p className="text-danger text-xs mt-1">{errors.planId.message}</p>}</div>
          <div><label className="block text-sm font-medium text-secondary mb-1.5">Billing Cycle</label><Controller name="billingCycle" control={control} render={({ field }) => <ManagerSearchableDropdown value={field.value} onChange={field.onChange} options={Object.entries(cycleLabels).map(([value, label]) => ({ value, label: label as string }))} />} />{errors.billingCycle && <p className="text-danger text-xs mt-1">{errors.billingCycle.message}</p>}</div>
          {billingCycle === 'CUSTOM' && <div className="sm:col-span-2"><label htmlFor="manager-renew-custom-days" className="block text-sm font-medium text-secondary mb-1.5">Custom Days</label><input id="manager-renew-custom-days" type="number" min="1" max={MANAGER_MEMBER_MAX_CUSTOM_DAYS} step="1" {...register('customDays', { valueAsNumber: true })} className="w-full border rounded-xl px-4 py-3 text-sm bg-input text-primary border-border" />{errors.customDays && <p className="text-danger text-xs mt-1">{errors.customDays.message}</p>}</div>}
          {planId && <div className="sm:col-span-2 bg-primary-subtle rounded-xl p-4 text-sm border border-focus flex justify-between items-center"><span className="font-semibold text-primary">{actionType === 'renew' ? 'Renewal' : 'Upgrade'} Price</span><span className="text-primary font-bold">{formatCurrency(calculatedPrice, ManagerEnvConfig.currencyCode, locale)}</span>{!selectedPlan && <span className="sr-only">Selected plan details unavailable</span>}</div>}
          <div><label htmlFor="manager-renew-paid" className="block text-sm font-medium text-secondary mb-1.5">Amount Paid </label><input id="manager-renew-paid" type="number" min="0" max={MANAGER_MEMBER_MAX_AMOUNT_MAJOR_UNITS} step="0.01" {...register('paidAmount', { valueAsNumber: true })} className="w-full border rounded-xl px-4 py-3 text-sm bg-input text-primary border-border" />{errors.paidAmount && <p className="text-danger text-xs mt-1">{errors.paidAmount.message}</p>}</div>
          <div><label className="block text-sm font-medium text-secondary mb-1.5">Payment Method</label><Controller name="paymentMethod" control={control} render={({ field }) => <ManagerSearchableDropdown value={field.value} onChange={field.onChange} options={[...paymentMethods]} />} />{errors.paymentMethod && <p className="text-danger text-xs mt-1">{errors.paymentMethod.message}</p>}</div>
          <div className="sm:col-span-2 pt-4 border-t border-border"><label htmlFor="manager-renew-expiry" className="block text-sm font-medium text-secondary mb-1.5">New Expiry Date</label><input id="manager-renew-expiry" type="date" {...register('newExpiryDate')} disabled className="w-full border rounded-xl px-4 py-3 text-sm font-bold bg-success-bg text-success border-success cursor-not-allowed" /><p className="text-xs text-secondary mt-1">Calculated from the selected plan and billing cycle.</p></div>
        </div>
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-border"><button type="button" onClick={handleClose} className="px-6 py-2.5 text-sm font-semibold rounded-xl border border-border text-secondary hover:bg-primary-subtle hover:text-primary motion-safe:transition-colors">Cancel</button><button type="submit" disabled={isSubmitting} className="min-w-40 px-8 py-2.5 rounded-xl text-sm font-bold text-on-success flex items-center justify-center gap-2 disabled:opacity-70 bg-primary-subtle motion-safe:transition-colors">{isSubmitting ? <span className="w-4 h-4 border-2 border-border border-t-on-primary rounded-full motion-safe:animate-spin" /> : <Save size={18} />} {isSubmitting ? 'Processing…' : `Confirm ${actionType === 'renew' ? 'Renewal' : 'Upgrade'}`}</button></div>
      </form>
    </div>
  </div>;
}
