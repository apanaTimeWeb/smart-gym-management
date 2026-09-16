'use client';
// RESPONSIBILITY: Renders the Add Member form specifically for converting a lead within the Inquiries page.
import { useEffect, useState } from 'react';
import { X, Save } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { useInquiriesContext } from '@/app/manager/inquiries/inquiries_context/ManagerInquiriesContext';
import { INQUIRIES_CYCLE_LABELS, getPriceForCycleSnapshot, EMPTY_CONVERT_FORM, INQUIRIES_GENDER_OPTIONS, type PlanSnapshot } from '@/app/manager/inquiries/inquiries_utils/ManagerInquiriesConvertConstants';
import { ConvertLeadSchema, type ConvertLeadFormValues } from '@/app/manager/inquiries/inquiries_types/ManagerConvertLeadSchema';
import ManagerConvertLeadSuccess from '@/app/manager/inquiries/inquiries_components/ConvertLeadModal/ManagerConvertLeadSuccess';
import ManagerConvertLeadForm from '@/app/manager/inquiries/inquiries_components/ConvertLeadModal/ManagerConvertLeadForm';
import { useInquiryPlansSnapshotQuery } from '@/app/manager/inquiries/inquiries_api/ManagerUseManagerInquiriesQueries';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_utils/ManagerUnsavedChangesGuard';

export default function ManagerConvertLeadModal() {
  const { convertLead: activeLead, closeConvert, updateStatus, convertLeadMutation } = useInquiriesContext();
  const isOpen = !!activeLead;
  
  const { data: plansData, isLoading: plansLoading } = useInquiryPlansSnapshotQuery();
  const plans = (plansData || []) as PlanSnapshot[];
  
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


  const useFormReturn = useForm<ConvertLeadFormValues>({
    resolver: zodResolver(ConvertLeadSchema),
    defaultValues: EMPTY_CONVERT_FORM
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useFormReturn;

  useEffect(() => {
    if (activeLead) {
      reset({
        ...EMPTY_CONVERT_FORM,
        name: activeLead.name,
        phone: activeLead.phone,
        email: activeLead.email || '',
      });
    }
  }, [activeLead, reset]);

  const watchPlanId = watch('planId') as string | undefined;
  const watchBillingCycle = watch('billingCycle') as string;
  const watchCustomDays = watch('customDays') as number;
  const watchJoinDate = watch('joinDate') as string;

  useEffect(() => {
    if (watchPlanId && watchBillingCycle) {
      const selectedPlan = plans.find(p => p.id.toString() === watchPlanId.toString()) as PlanSnapshot | undefined;
      const price = getPriceForCycleSnapshot(selectedPlan, watchBillingCycle, Number(watchCustomDays) || 0);
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
        
        useFormReturn.setValue('expiryDate', ed.toISOString().split('T')[0] || '', { shouldValidate: true });
      }
    }
  }, [watchJoinDate, watchBillingCycle, watchCustomDays, useFormReturn]);

  const onSubmit = async (data: ConvertLeadFormValues) => {
    setSaving(true);
    try {
      const total = data.totalAmount || 0;
      const paid = data.paidAmount || 0;
      const pendingAmount = total - paid;
      const res = await convertLeadMutation({ id: activeLead?.id ?? '', data: { ...data, pendingAmount, status: 'ACTIVE' } });
      
      // Update the inquiry status to CONVERTED locally and via API
      if (activeLead) {
        await updateStatus(activeLead.id, 'CONVERTED');
        
        const planName = plans.find(p => p.id.toString() === data.planId?.toString())?.name || 'Membership';
        setSuccessData({
          gymId: res?.data?.memberId || 'N/A',
          name: data.name,
          phone: data.phone,
          planName,
          joinDate: data.joinDate || '',
          expiryDate: data.expiryDate || '',
          paidAmount: paid,
          pendingAmount: pendingAmount,
          aadhaar: data.aadhaar,
        });
      } else {
        closeConvert();
      }
    } catch (e) {
      // Error handled by the api wrapper in catch block
    } finally {
      setSaving(false);
    }
  };

  useManagerUnsavedChangesGuard(errors && Object.keys(errors).length > 0 && isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-foreground/60">
      <div className="bg-card rounded-2xl shadow-xl w-full max-w-xl overflow-visible border border-border max-h-full flex flex-col">
        
        <div className="sticky top-0 bg-card px-6 py-4 border-b border-border flex items-center justify-between z-10 rounded-t-2xl">
          <div>
            <h3 className="text-lg font-bold text-primary">Convert to Member</h3>
            <p className="text-xs text-secondary mt-0.5">Complete admission for {activeLead?.name}</p>
          </div>
          <button onClick={closeConvert} className="p-2 rounded-full hover:bg-primary/10 motion-safe:transition-colors text-secondary hover:text-primary">
            <X size={20} />
          </button>
        </div>

        {successData ? (
          <ManagerConvertLeadSuccess 
            successData={successData} 
            closeConvert={closeConvert} 
          />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto flex-1 custom-scrollbar p-4 flex flex-col gap-4">
            <ManagerConvertLeadForm 
              useFormReturn={useFormReturn}
              plans={plans}
              watchPlanId={watchPlanId}
              watchBillingCycle={watchBillingCycle}
              watchCustomDays={watchCustomDays}
            />

            <div className="flex gap-3 pt-4 border-t border-border mt-2">
              <button
                type="button"
                onClick={closeConvert}
                className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-primary hover:bg-primary-subtle motion-safe:transition-all duration-200 active:scale-95"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-primary text-primary-foreground flex items-center justify-center gap-2 disabled:opacity-70 hover:bg-primary-hover motion-safe:transition-all duration-200 active:scale-95"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full motion-safe:animate-spin" />
                ) : (
                  <><Save size={15} /> Convert Inquiry</>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
