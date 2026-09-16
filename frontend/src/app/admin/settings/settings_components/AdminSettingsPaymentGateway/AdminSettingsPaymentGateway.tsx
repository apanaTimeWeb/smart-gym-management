"use client";
// RESPONSIBILITY: Manages the Payment Gateway settings tab.
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PaymentGatewaySettingsSchema } from '@/app/admin/settings/settings_types/AdminSettings.schema';
import type { PaymentGatewaySettingsType } from '@/app/admin/settings/settings_types/AdminSettingsTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi } from '@/app/admin/settings/settings_api/AdminSettingsApi';
import toast from 'react-hot-toast';
import { Save, RefreshCw, CreditCard, Receipt } from 'lucide-react';
import { useUnsavedChangesGuard } from '@/app/admin/admin_utils/useAdminUnsavedChangesGuard';
import { AdminSettingsToggleSwitch } from '@/app/admin/settings/settings_components/AdminSettingsShared/AdminSettingsToggleSwitch';

export function AdminSettingsPaymentGateway({ initialData }: { initialData: PaymentGatewaySettingsType }) {
  const queryClient = useQueryClient();
  const form = useForm<PaymentGatewaySettingsType>({
    resolver: zodResolver(PaymentGatewaySettingsSchema),
    defaultValues: initialData,
  });

  useUnsavedChangesGuard(form.formState.isDirty);

  const mutation = useMutation({
    mutationFn: (data: PaymentGatewaySettingsType) => settingsApi.updateSettings({ payment: data }),
    onSuccess: (res) => {
      toast.success(res.message, { id: 'settings-payment-save' });
      queryClient.invalidateQueries({ queryKey: ['admin', 'settings'] });
      form.reset(form.getValues());
    },
    onError: (err) => toast.error((err as Error).message, { id: 'settings-payment-save' }),
  });

  const onSubmit = (data: PaymentGatewaySettingsType) => mutation.mutate(data);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card rounded-xl shadow-sm border border-border mt-6">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-bold text-foreground text-lg">Payment Gateway</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => form.reset(initialData)}
            disabled={!form.formState.isDirty || mutation.isPending}
            className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-input text-secondary flex items-center gap-2 motion-safe:transition-colors disabled:opacity-50"
          >
            <RefreshCw size={14} /> Reset
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg font-medium flex items-center gap-2 disabled:opacity-70 hover:bg-primary-hover motion-safe:transition-colors"
          >
            <Save size={14} /> {mutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-input/40 rounded-xl border border-border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <CreditCard size={16} className="text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground">Razorpay</p>
            </div>
            <div className="w-48">
              <AdminSettingsToggleSwitch
                checked={form.watch('razorpayEnabled')}
                onChange={(v) => form.setValue('razorpayEnabled', v, { shouldDirty: true })}
                label=""
              />
            </div>
          </div>
          {form.watch('razorpayEnabled') && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-secondary mb-1">Key ID</label>
                <input
                  type="text"
                  {...form.register('razorpayKeyId')}
                  placeholder="rzp_live_..."
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-secondary mb-1">Webhook Secret</label>
                <input
                  type="password"
                  {...form.register('razorpayWebhookSecret')}
                  placeholder="whsec_..."
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground"
                />
              </div>
            </div>
          )}
        </div>

        <div className="bg-input/40 rounded-xl border border-border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                <Receipt size={16} className="text-success" />
              </div>
              <p className="text-sm font-semibold text-foreground">UPI / QR Code</p>
            </div>
            <div className="w-48">
              <AdminSettingsToggleSwitch
                checked={form.watch('upiEnabled')}
                onChange={(v) => form.setValue('upiEnabled', v, { shouldDirty: true })}
                label=""
              />
            </div>
          </div>
          {form.watch('upiEnabled') && (
            <div>
              <label className="block text-xs font-medium text-secondary mb-1">UPI ID</label>
              <input
                type="text"
                {...form.register('upiId')}
                placeholder="yourgym@upi"
                className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground"
              />
            </div>
          )}
        </div>

        <div className="space-y-3 pt-2 border-t border-border">
          <p className="text-sm font-semibold text-foreground">Receipt Settings</p>
          <div className="flex items-center justify-between p-3 bg-input/40 rounded-xl border border-border">
            <AdminSettingsToggleSwitch
              checked={form.watch('cashEnabled')}
              onChange={(v) => form.setValue('cashEnabled', v, { shouldDirty: true })}
              label="Accept Cash Payments"
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-input/40 rounded-xl border border-border">
            <AdminSettingsToggleSwitch
              checked={form.watch('autoReceiptEnabled')}
              onChange={(v) => form.setValue('autoReceiptEnabled', v, { shouldDirty: true })}
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
              className="w-32 px-3 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground font-mono uppercase"
            />
            {form.formState.errors.receiptPrefix && <p className="text-xs text-danger mt-1">{form.formState.errors.receiptPrefix.message}</p>}
            <p className="text-xs text-secondary mt-1">e.g. prefix GS → receipt GS-00123</p>
          </div>
        </div>
      </div>
    </form>
  );
}