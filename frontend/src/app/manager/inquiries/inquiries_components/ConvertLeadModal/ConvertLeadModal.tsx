// RESPONSIBILITY: Renders the Add Member form specifically for converting a lead within the Inquiries page.
'use client';

import { useEffect, useState } from 'react';
import { X, Save } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { useInquiriesContext } from '@/app/manager/inquiries/inquiries_context/InquiriesContext';
import { useMembersStore } from '@/app/manager/members/members_store/useMembersStore';
import { MEMBERS_CYCLE_LABELS, getPriceForCycle, formatCurrency, MemberSchema, type MemberFormValues, EMPTY_MEMBER_FORM, GENDER_OPTIONS } from '@/app/manager/members/members_utils/MembersSharedConstants';
import type { PlanWithCustom } from '@/app/manager/members/members_types/members_types';

export default function ConvertLeadModal() {
  const { convertLead, closeConvert, updateStatus } = useInquiriesContext();
  
  const loadAll = useMembersStore(s => s.loadAll);
  const saveMember = useMembersStore(s => s.saveMember);
  const plans = useMembersStore(s => s.plans);
  const fetchState = useMembersStore(s => s.fetchState);
  const [saving, setSaving] = useState(false);
  const [successData, setSuccessData] = useState<{
    gymId: string;
    name: string;
    phone: string;
    planName: string;
    joinDate: string;
    expiryDate: string;
    paidAmount: number;
    pendingAmount: number;
    aadhaar?: string;
  } | null>(null);

  useEffect(() => {
    // We only need plans to render the dropdown properly
    if (convertLead && plans.length === 0 && fetchState !== 'loading') {
      loadAll({ page: '1' }).catch(console.error);
    }
  }, [convertLead, plans.length, fetchState, loadAll]);

  const useFormReturn = useForm<MemberFormValues>({
    resolver: zodResolver(MemberSchema),
    defaultValues: EMPTY_MEMBER_FORM
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useFormReturn;

  useEffect(() => {
    if (convertLead) {
      reset({
        ...EMPTY_MEMBER_FORM,
        name: convertLead.name,
        phone: convertLead.phone,
        email: convertLead.email || '',
      });
    }
  }, [convertLead, reset]);

  const watchPlanId = watch('planId') as string | undefined;
  const watchBillingCycle = watch('billingCycle') as string;
  const watchCustomDays = watch('customDays') as number;
  const watchJoinDate = watch('joinDate') as string;

  useEffect(() => {
    if (watchPlanId && watchBillingCycle) {
      const selectedPlan = plans.find(p => p.id.toString() === watchPlanId.toString()) as PlanWithCustom | undefined;
      const price = getPriceForCycle(selectedPlan, watchBillingCycle, Number(watchCustomDays) || 0);
      useFormReturn.setValue('totalAmount', price, { shouldValidate: true });
      useFormReturn.setValue('paidAmount', price, { shouldValidate: true });
    }
  }, [watchPlanId, watchBillingCycle, watchCustomDays, plans, useFormReturn]);

  useEffect(() => {
    if (watchJoinDate && watchBillingCycle) {
      const jd = new Date(watchJoinDate);
      if (!isNaN(jd.getTime())) {
        const ed = new Date(jd);
        if (watchBillingCycle === 'ONE_MONTH') ed.setMonth(ed.getMonth() + 1);
        else if (watchBillingCycle === 'THREE_MONTHS') ed.setMonth(ed.getMonth() + 3);
        else if (watchBillingCycle === 'SIX_MONTHS') ed.setMonth(ed.getMonth() + 6);
        else if (watchBillingCycle === 'TWELVE_MONTHS') ed.setMonth(ed.getMonth() + 12);
        else if (watchBillingCycle === 'CUSTOM' && watchCustomDays) ed.setDate(ed.getDate() + Number(watchCustomDays));
        
        useFormReturn.setValue('expiryDate', ed.toISOString().split('T')[0], { shouldValidate: true });
      }
    }
  }, [watchJoinDate, watchBillingCycle, watchCustomDays, useFormReturn]);

  const onSubmit = async (data: MemberFormValues) => {
    setSaving(true);
    try {
      const total = data.totalAmount || 0;
      const paid = data.paidAmount || 0;
      const pendingAmount = total - paid;
      const res = await saveMember({ ...data, pendingAmount }, null);
      
      // Update the inquiry status to CONVERTED locally and via API
      if (convertLead) {
        await updateStatus(convertLead.id, 'CONVERTED');
        
        const planName = plans.find(p => p.id.toString() === data.planId?.toString())?.name || 'Membership';
        setSuccessData({
          gymId: res.memberId || 'N/A',
          name: data.name,
          phone: data.phone,
          planName,
          joinDate: data.joinDate,
          expiryDate: data.expiryDate,
          paidAmount: paid,
          pendingAmount: pendingAmount,
          aadhaar: data.aadhaar,
        });
      } else {
        closeConvert();
      }
    } catch (e) {
      console.error('Failed to convert', e);
    } finally {
      setSaving(false);
    }
  };

  const handleSendWhatsApp = () => {
    if (!successData || !successData.phone) return;
    const phone = successData.phone.replace(/\D/g, '');
    const finalPhone = phone.length === 10 ? `91${phone}` : phone;
    const aadhaarLine = successData.aadhaar ? `\n• *Aadhaar No:* ${successData.aadhaar}` : '';
    const message = `🎉 *Congratulations ${successData.name}!* 🎉\n\nYour admission at GymSmart is confirmed. Welcome to the fitness family! 💪\n\n*📝 ADMISSION DETAILS*\n• *Gym ID:* ${successData.gymId}\n• *Plan:* ${successData.planName}${aadhaarLine}\n• *Join Date:* ${new Date(successData.joinDate).toLocaleDateString('en-IN')}\n• *Expiry Date:* ${new Date(successData.expiryDate).toLocaleDateString('en-IN')}\n\n*💰 PAYMENT DETAILS*\n• *Paid:* ₹${successData.paidAmount}\n• *Pending:* ₹${successData.pendingAmount}\n\nLet's crush those goals! 🔥`;
    
    const url = `https://wa.me/${finalPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!convertLead) return null;

  const selectedPlan = plans.find(p => p.id.toString() === watchPlanId?.toString()) as PlanWithCustom | undefined;

  if (successData) {
    return (
      <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl shadow-2xl shadow-black/50 w-full max-w-md overflow-hidden border-2 border-success motion-safe:animate-in motion-safe:zoom-in-95">
          <div className="px-8 py-8 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mb-5 border border-success/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h3 className="text-2xl font-black text-foreground mb-2 tracking-tight">Admission Successful!</h3>
            <p className="text-secondary mb-8 text-sm">
              <span className="font-semibold text-primary">{successData.name}</span> is now a member. Gym ID: <strong className="text-success">{successData.gymId}</strong>
            </p>
            
            <div className="w-full space-y-3 mb-8 text-left">
              <div className="bg-input/50 p-4 rounded-xl border border-border">
                <p className="text-sm font-semibold text-foreground mb-3 text-center">Share admission details with member</p>
                <button
                  onClick={handleSendWhatsApp}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-[#25D366]/30 active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Send Welcome WhatsApp
                </button>
              </div>
            </div>

            <button
              onClick={closeConvert}
              className="px-8 py-2.5 text-sm font-bold rounded-xl border border-border text-secondary hover:bg-primary/5 hover:text-primary transition-colors"
            >
              Done & Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-2xl shadow-black/50 w-full max-w-2xl max-h-full overflow-y-auto border-2 border-warning">
        <div className="sticky top-0 px-8 py-5 border-b border-border bg-card flex items-center justify-between z-10">
          <h3 className="text-xl font-bold text-foreground">Convert Lead to Member</h3>
          <button
            type="button"
            onClick={closeConvert}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors text-secondary hover:text-primary"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Rahul Sharma', fullWidth: true },
              { label: 'Email', key: 'email', type: 'email', placeholder: 'rahul@gmail.com' },
              { label: 'Phone', key: 'phone', type: 'tel', placeholder: '9876543210' },
              { label: 'Address', key: 'address', type: 'text', placeholder: 'Andheri, Mumbai' },
              { label: 'Aadhaar Card', key: 'aadhaar', type: 'text', placeholder: '12-digit Aadhaar (Optional)' },
            ].map(f => (
              <div key={f.key} className={f.fullWidth ? 'sm:col-span-2' : ''}>
                <label className="block text-sm font-medium text-secondary mb-1.5">{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  maxLength={f.key === 'phone' ? 10 : f.key === 'aadhaar' ? 12 : undefined}
                  onKeyDown={(e) => {
                    if ((f.key === 'phone' || f.key === 'aadhaar') && ['e', 'E', '-', '+', '.'].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  {...register(f.key as keyof MemberFormValues)}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary transition-all duration-200 ${
                    errors[f.key as keyof MemberFormValues] ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                  }`}
                />
                {errors[f.key as keyof MemberFormValues] && (
                  <p className="text-danger text-xs mt-1.5">{errors[f.key as keyof MemberFormValues]?.message as string}</p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-secondary mb-1.5">Gender</label>
              <Controller
                name="gender"
                control={useFormReturn.control}
                render={({ field }) => (
                  <SearchableDropdown
                    value={field.value || ''}
                    onChange={field.onChange}
                    options={GENDER_OPTIONS}
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1.5">Plan</label>
              <Controller
                name="planId"
                control={useFormReturn.control}
                render={({ field }) => (
                  <SearchableDropdown
                    options={plans.map(p => ({ value: p.id, label: p.name }))}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select plan..."
                  />
                )}
              />
              {errors.planId && (
                <p className="text-danger text-xs mt-1.5">{errors.planId?.message as string}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1.5">Billing Cycle</label>
              <Controller
                name="billingCycle"
                control={useFormReturn.control}
                render={({ field }) => (
                  <SearchableDropdown
                    value={field.value || ''}
                    onChange={field.onChange}
                    options={Object.entries(MEMBERS_CYCLE_LABELS).map(([val, label]) => ({ label, value: val }))}
                  />
                )}
              />
            </div>
            {watchBillingCycle === 'CUSTOM' && (
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">Custom Days</label>
                <input
                  type="number"
                  min="0"
                  onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+') e.preventDefault(); }}
                  {...register('customDays')}
                  placeholder="e.g. 15"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary transition-all duration-200 ${
                    errors.customDays ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                  }`}
                />
                {errors.customDays && (
                  <p className="text-danger text-xs mt-1.5">{errors.customDays?.message as string}</p>
                )}
              </div>
            )}

            {watchPlanId && (
              <div className="sm:col-span-2 bg-warning-bg rounded-xl p-4 text-sm border border-warning/30 flex justify-between items-center">
                <div>
                  <span className="font-semibold text-warning">Calculated Price:</span>
                  <span className="text-warning ml-1 font-bold">
                    {formatCurrency(getPriceForCycle(selectedPlan, watchBillingCycle, Number(watchCustomDays) || 0))}
                  </span>
                </div>
                {watchBillingCycle === 'CUSTOM' && (
                  <div className="text-warning text-xs opacity-80">
                    (Per Day: {formatCurrency(selectedPlan?.priceCustom || 0)} × {watchCustomDays || 0} days)
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-secondary mb-1.5">Join Date</label>
              <input
                type="date"
                {...register('joinDate')}
                className="w-full border rounded-xl px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1.5">Expiry Date</label>
              <input
                type="date"
                {...register('expiryDate')}
                className="w-full border rounded-xl px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1.5">Total Plan Amount (₹)</label>
              <input
                type="number"
                disabled
                {...register('totalAmount', { valueAsNumber: true })}
                className="w-full border rounded-xl px-4 py-3 text-sm focus-visible:outline-none bg-input opacity-80 cursor-not-allowed text-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1.5">Amount Paid (₹)</label>
              <input
                type="number"
                min="0"
                onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+') e.preventDefault(); }}
                {...register('paidAmount', { valueAsNumber: true })}
                className="w-full border rounded-xl px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary transition-all duration-200"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
            <button
              type="button"
              onClick={closeConvert}
              className="px-6 py-2.5 text-sm font-semibold rounded-xl border border-border text-secondary hover:bg-primary/5 hover:text-primary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-70 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95 bg-primary"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full motion-safe:animate-spin" />
              ) : (
                <><Save size={16} /> Convert to Member</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
