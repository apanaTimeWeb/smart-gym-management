'use client';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
// RESPONSIBILITY: Renders the form fields for converting a lead.
import type { ManagerConvertLeadFormProps } from '@/app/manager/inquiries/inquiries_types/ManagerConvertLeadFormTypes';
import { Controller } from 'react-hook-form';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';
import { INQUIRIES_CYCLE_LABELS, getPriceForCycleSnapshot, INQUIRIES_GENDER_OPTIONS } from '@/app/manager/inquiries/inquiries_utils/ManagerInquiriesConvertConstants';
import type { ConvertLeadFormValues } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesFormTypes';
import { formatCurrencyFromMinorUnits } from '@/lib/formatters';



export default function ManagerConvertLeadForm({
  useFormReturn,
  plans,
  watchPlanId,
  watchBillingCycle,
  watchCustomDays
}: ManagerConvertLeadFormProps) {
  const { register, formState: { errors }, control } = useFormReturn;
  const selectedPlan = plans.find(p => p.id.toString() === watchPlanId?.toString());

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
      {[
        { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Rahul Sharma', fullWidth: true },
        { label: 'Email', key: 'email', type: 'email', placeholder: 'rahul@gmail.com' },
        { label: 'Phone', key: 'phone', type: 'tel', placeholder: '9876543210' },
        { label: 'Address', key: 'address', type: 'text', placeholder: 'Andheri, Mumbai' },
        { label: 'Aadhaar Card', key: 'aadhaar', type: 'text', placeholder: '12-digit Aadhaar (Optional)' },
      ].map(f => (
        <div key={f.key} className={f.fullWidth ? 'sm:col-span-2' : ''}>
          <label className="block text-sm font-medium text-secondary mb-0.5">{f.label}</label>
          <input
            type={f.type}
            placeholder={f.placeholder}
            maxLength={f.key === 'phone' ? 10 : f.key === 'aadhaar' ? 12 : undefined}
            onKeyDown={(e) => {
              if (f.key === 'phone' || f.key === 'aadhaar') {
                if (['e', 'E', '-', '+', '.'].includes(e.key)) e.preventDefault();
                if (e.key.length === 1 && !/^[0-9]$/.test(e.key) && !e.ctrlKey && !e.metaKey) e.preventDefault();
              }
            }}
            {...register(f.key as keyof ConvertLeadFormValues)}
            className={`w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-all motion-safe:duration-200 ${
              errors[f.key as keyof ConvertLeadFormValues] ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
            }`}
          />
          {errors[f.key as keyof ConvertLeadFormValues] && (
            <p className="text-danger text-xs mt-0.5">{errors[f.key as keyof ConvertLeadFormValues]?.message as string}</p>
          )}
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium text-secondary mb-0.5">Gender</label>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <ManagerSearchableDropdown value={field.value || ''} onChange={field.onChange} options={INQUIRIES_GENDER_OPTIONS} />
          )}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-secondary mb-0.5">Plan</label>
        <Controller
          name="planId"
          control={control}
          render={({ field }) => (
            <ManagerSearchableDropdown
              options={plans.map(p => ({ value: p.id, label: p.name }))}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select plan..."
            />
          )}
        />
        {errors.planId && <p className="text-danger text-xs mt-0.5">{errors.planId?.message as string}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary mb-0.5">Billing Cycle</label>
        <Controller
          name="billingCycle"
          control={control}
          render={({ field }) => (
            <ManagerSearchableDropdown
              value={field.value || ''}
              onChange={field.onChange}
              options={Object.entries(INQUIRIES_CYCLE_LABELS).map(([val, label]) => ({ label, value: val }))}
            />
          )}
        />
      </div>
      {watchBillingCycle === 'CUSTOM' && (
        <div>
          <label className="block text-sm font-medium text-secondary mb-0.5">Custom Days</label>
          <input
            type="number"
            min="0"
            onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+') e.preventDefault(); }}
            {...register('customDays')}
            placeholder="e.g. 15"
            className={`w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-all motion-safe:duration-200 ${
              errors.customDays ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
            }`}
          />
          {errors.customDays && <p className="text-danger text-xs mt-0.5">{errors.customDays?.message as string}</p>}
        </div>
      )}

      {watchPlanId && (
        <div className="sm:col-span-2 bg-warning rounded-xl p-3 text-sm border border-warning/30 flex justify-between items-center">
          <div>
            <span className="font-semibold text-on-primary">Calculated Price:</span>
            <span className="text-on-primary ml-1 font-bold">
              {formatCurrencyFromMinorUnits(getPriceForCycleSnapshot(selectedPlan, watchBillingCycle || '', Number(watchCustomDays) || 0), ManagerEnvConfig.currencyCode)}
            </span>
          </div>
          {watchBillingCycle === 'CUSTOM' && (
            <div className="text-on-primary text-xs opacity-80">
              (Per Day: {formatCurrencyFromMinorUnits(selectedPlan?.priceCustom || 0, ManagerEnvConfig.currencyCode)} × {watchCustomDays || 0} days)
            </div>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-secondary mb-0.5">Join Date</label>
        <input type="date" min={new Date().toISOString().split('T')[0]} {...register('joinDate')} className="w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-all motion-safe:duration-200" />
      </div>
      <div>
        <label className="block text-sm font-medium text-secondary mb-0.5">Expiry Date <span className="text-danger">*</span></label>
        <input type="date" disabled min={new Date().toISOString().split('T')[0]} {...register('expiryDate')} className="w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none bg-input text-primary opacity-80 cursor-not-allowed motion-safe:transition-all motion-safe:duration-200" />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary mb-0.5">Total Plan Amount (₹)</label>
        <input type="number" disabled {...register('totalAmount', { valueAsNumber: true })} className="w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none bg-input opacity-80 cursor-not-allowed text-primary" />
      </div>
      <div>
        <label className="block text-sm font-medium text-secondary mb-0.5">Amount Paid (₹)</label>
        <input type="number" min="0" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+') e.preventDefault(); }} {...register('paidAmount', { valueAsNumber: true })} className="w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-all motion-safe:duration-200" />
      </div>
    </div>
  );
}
