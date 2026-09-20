// RESPONSIBILITY: Renders the manual referral modal using the dedicated Referral form hook.
'use client';
import { X, Loader2 } from 'lucide-react';
import { useManagerReferralsForm } from '@/app/manager/referrals/referrals_hooks/ManagerUseManagerReferralsForm';
import type { ManagerReferralFormValues } from '@/app/manager/referrals/referrals_types/ManagerReferralsFormTypes';


export default function ManagerReferralsAddModal() {
  const { isAddModalOpen, isCreating, form, submit, handleClose } = useManagerReferralsForm();
  if (!isAddModalOpen) return null;
  const fields: Array<[keyof ManagerReferralFormValues, string]> = [['referrerName', 'Member Name'], ['referrerId', 'Member ID'], ['refereeName', 'Inquiry Name'], ['refereePhone', 'Phone Number']];
  return <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay backdrop-blur-sm"><div className="bg-card border border-border w-full max-w-md rounded-xl shadow-card flex flex-col max-h-full overflow-hidden"><div className="flex items-center justify-between p-4 border-b border-border bg-input"><h2 className="text-lg font-bold text-primary">Log New Referral</h2><button type="button" aria-label="Close referral form" onClick={handleClose} className="p-1 text-secondary rounded-md motion-safe:transition-colors"><X size={18} /></button></div><form id="manager-referral-form" onSubmit={submit} className="p-4 overflow-y-auto space-y-4">{fields.map(([field, label]) => { const error = form.formState.errors[field]; return <div key={field}><label htmlFor={`manager-referral-${String(field)}`} className="block text-sm font-medium text-primary mb-1">{label} *</label><input id={`manager-referral-${String(field)}`} type={field === 'refereePhone' ? 'tel' : 'text'} {...form.register(field)} className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary" />{error && <p className="text-xs text-danger mt-1">{String(error.message ?? '')}</p>}</div>; })}</form><div className="p-4 border-t border-border bg-input flex justify-end gap-2"><button type="button" onClick={handleClose} className="px-4 py-2 text-sm font-medium text-secondary motion-safe:transition-colors">Cancel</button><button type="submit" form="manager-referral-form" disabled={isCreating} className="min-w-32 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-bold disabled:opacity-50 motion-safe:transition-colors">{isCreating ? <Loader2 size={18} className="motion-safe:animate-spin" /> : 'Save Referral'}</button></div></div></div>;
}
