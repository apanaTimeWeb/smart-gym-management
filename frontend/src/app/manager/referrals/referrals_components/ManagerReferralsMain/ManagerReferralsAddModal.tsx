'use client';
// RESPONSIBILITY: RHF + Zod form for manually creating a referral.
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Loader2 } from 'lucide-react';
import { useManagerReferralsLogic } from '@/app/manager/referrals/referrals_context/ManagerUseManagerReferralsLogic';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_utils/ManagerUnsavedChangesGuard';
import { managerReferralFormSchema, type ManagerReferralFormValues } from '@/app/manager/referrals/referrals_utils/ManagerReferralsFormSchema';

const EMPTY: ManagerReferralFormValues = { referrerName: '', referrerId: '', refereeName: '', refereePhone: '' };

export default function ManagerReferralsAddModal() {
  const { isAddModalOpen, setIsAddModalOpen, createReferral, isCreating } = useManagerReferralsLogic();
  const form = useForm<ManagerReferralFormValues>({ resolver: zodResolver(managerReferralFormSchema), defaultValues: EMPTY });
  useEffect(() => { if (!isAddModalOpen) form.reset(EMPTY); }, [isAddModalOpen, form]);
  useManagerUnsavedChangesGuard(isAddModalOpen && form.formState.isDirty);
  if (!isAddModalOpen) return null;
  const submit = form.handleSubmit((values) => createReferral(values));
  return <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay backdrop-blur-sm"><div className="bg-card border border-border w-full max-w-md rounded-xl shadow-lg flex flex-col max-h-full overflow-hidden"><div className="flex items-center justify-between p-4 border-b border-border bg-input/10"><h2 className="text-lg font-bold text-foreground">Log New Referral</h2><button type="button" aria-label="Close referral form" onClick={() => setIsAddModalOpen(false)} className="p-1 text-secondary rounded-md"><X size={20} /></button></div><form id="manager-referral-form" onSubmit={submit} className="p-4 overflow-y-auto space-y-4">
    {[['referrerName','Member Name'],['referrerId','Member ID'],['refereeName','Inquiry Name'],['refereePhone','Phone Number']].map(([field,label]) => { const name = field as keyof ManagerReferralFormValues; const error = form.formState.errors[name]; return <div key={field}><label htmlFor={`manager-referral-${field}`} className="block text-sm font-medium text-foreground mb-1">{label} *</label><input id={`manager-referral-${field}`} type={name === 'refereePhone' ? 'tel' : 'text'} {...form.register(name)} className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground" />{error && <p className="text-xs text-danger mt-1">{String(error.message ?? '')}</p>}</div>; })}
  </form><div className="p-4 border-t border-border bg-input/10 flex justify-end gap-2"><button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm font-medium text-secondary">Cancel</button><button type="submit" form="manager-referral-form" disabled={isCreating} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold disabled:opacity-50">{isCreating ? <Loader2 size={16} className="motion-safe:animate-spin" /> : 'Save Referral'}</button></div></div></div>;
}
