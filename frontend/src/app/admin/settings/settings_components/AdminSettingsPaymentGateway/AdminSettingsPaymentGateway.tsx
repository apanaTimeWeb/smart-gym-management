"use client";
// RESPONSIBILITY: Manages the Payment Gateway settings tab.
import type { PaymentGatewaySettingsType } from '@/app/admin/settings/settings_types/AdminSettingsTypes';
import { useAdminSettingsPaymentGatewayForm } from '@/app/admin/settings/settings_context/useAdminSettingsForms';
import { Save, RefreshCw, CreditCard, Receipt } from 'lucide-react';
import { AdminSettingsToggleSwitch } from '@/app/admin/settings/settings_components/AdminSettingsShared/AdminSettingsToggleSwitch';

export function AdminSettingsPaymentGateway({ initialData }: { initialData: PaymentGatewaySettingsType }) {
  const { form, formValues, mutation } = useAdminSettingsPaymentGatewayForm(initialData);

  const onSubmit = (data: PaymentGatewaySettingsType) => mutation.mutate(data);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card rounded-xl shadow-card border border-border mt-6">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-bold text-primary text-lg">Payment Gateway</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => form.reset(initialData)}
            disabled={!form.formState.isDirty || mutation.isPending}
            className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-input text-secondary flex items-center gap-2 motion-safe:transition-colors disabled:opacity-50 motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          >
            <RefreshCw size={14} /> Reset
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-4 py-2 text-sm bg-primary text-on-primary rounded-lg font-medium flex items-center gap-2 disabled:opacity-70 hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          >
            <Save size={14} /> {mutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-input rounded-xl border border-border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-subtle flex items-center justify-center">
                <CreditCard size={16} className="text-primary" />
              </div>
              <p className="text-sm font-semibold text-primary">Razorpay</p>
            </div>
            <div className="w-48">
              <AdminSettingsToggleSwitch
                checked={formValues.razorpayEnabled ?? initialData.razorpayEnabled}
                onChange={(v: boolean) => form.setValue('razorpayEnabled', v, { shouldDirty: true })}
                label=""
              />
            </div>
          </div>
          {formValues.razorpayEnabled && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-secondary mb-1">Key ID</label>
                <input
                  type="text"
                  {...form.register('razorpayKeyId')}
                  placeholder="rzp_live_..."
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-secondary mb-1">Webhook Secret</label>
                <input
                  type="password"
                  {...form.register('razorpayWebhookSecret')}
                  placeholder="whsec_..."
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary"
                />
              </div>
            </div>
          )}
        </div>

        <div className="bg-input rounded-xl border border-border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-success-bg flex items-center justify-center">
                <Receipt size={16} className="text-success" />
              </div>
              <p className="text-sm font-semibold text-primary">UPI / QR Code</p>
            </div>
            <div className="w-48">
              <AdminSettingsToggleSwitch
                checked={formValues.upiEnabled ?? initialData.upiEnabled}
                onChange={(v: boolean) => form.setValue('upiEnabled', v, { shouldDirty: true })}
                label=""
              />
            </div>
          </div>
          {formValues.upiEnabled && (
            <div>
              <label className="block text-xs font-medium text-secondary mb-1">UPI ID</label>
              <input
                type="text"
                {...form.register('upiId')}
                placeholder="yourgym@upi"
                className="w-full px-3 py-2 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary"
              />
            </div>
          )}
        </div>

        <div className="space-y-3 pt-2 border-t border-border">
          <p className="text-sm font-semibold text-primary">Receipt Settings</p>
          <div className="flex items-center justify-between p-3 bg-input rounded-xl border border-border">
            <AdminSettingsToggleSwitch
              checked={formValues.cashEnabled ?? initialData.cashEnabled}
              onChange={(v: boolean) => form.setValue('cashEnabled', v, { shouldDirty: true })}
              label="Accept Cash Payments"
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-input rounded-xl border border-border">
            <AdminSettingsToggleSwitch
              checked={formValues.autoReceiptEnabled ?? initialData.autoReceiptEnabled}
              onChange={(v: boolean) => form.setValue('autoReceiptEnabled', v, { shouldDirty: true })}
              label="Auto-generate receipt on payment"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Receipt Number Prefix</label>
            <input
              type="text"
              {...form.register('receiptPrefix')}
              maxLength={6}
              placeholder="GS"
              className="w-32 px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary font-mono uppercase"
            />
            {form.formState.errors.receiptPrefix && <p className="text-xs text-danger mt-1">{form.formState.errors.receiptPrefix.message as string}</p>}
            <p className="text-xs text-secondary mt-1">e.g. prefix GS → receipt GS-00123</p>
          </div>
        </div>
      </div>
    </form>
  );
}