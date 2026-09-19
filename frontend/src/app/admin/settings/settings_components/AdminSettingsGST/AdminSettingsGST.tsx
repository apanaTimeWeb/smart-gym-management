"use client";
// RESPONSIBILITY: Manages the GST & Tax settings tab.
import type { GstTaxSettingsType } from '@/app/admin/settings/settings_types/AdminSettingsTypes';
import { useAdminSettingsGstForm } from '@/app/admin/settings/settings_context/useAdminSettingsForms';
import { Save, RefreshCw } from 'lucide-react';
import { GST_STATE_CODES, TAX_RATE_OPTIONS } from '@/app/admin/settings/settings_utils/AdminSettingsSharedConstants';
import { AdminSettingsToggleSwitch } from '@/app/admin/settings/settings_components/AdminSettingsShared/AdminSettingsToggleSwitch';

export function AdminSettingsGST({ initialData }: { initialData: GstTaxSettingsType }) {
  const { form, formValues, mutation } = useAdminSettingsGstForm(initialData);

  const onSubmit = (data: GstTaxSettingsType) => mutation.mutate(data);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card rounded-xl shadow-card border border-border mt-6">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-bold text-primary text-lg">GST & Tax Settings</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => form.reset(initialData)}
            disabled={!form.formState.isDirty || mutation.isPending}
            className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-input text-secondary flex items-center gap-2 motion-safe:transition-colors disabled:opacity-50 motion-safe:duration-base"
          >
            <RefreshCw size={14} /> Reset
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-4 py-2 text-sm bg-primary text-on-primary rounded-lg font-medium flex items-center gap-2 disabled:opacity-70 hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base"
          >
            <Save size={14} /> {mutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">GST Number (GSTIN)</label>
            <input
              type="text"
              {...form.register('gstNumber')}
              placeholder="27AABCU9603R1ZX"
              maxLength={15}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-primary font-mono uppercase"
            />
            {form.formState.errors.gstNumber && <p className="text-xs text-danger mt-1">{form.formState.errors.gstNumber.message as string}</p>}
            <p className="text-xs text-secondary mt-1">15-character alphanumeric GSTIN</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Business Legal Name</label>
            <input
              type="text"
              {...form.register('businessLegalName')}
              placeholder="As registered with GST"
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-primary"
            />
            {form.formState.errors.businessLegalName && <p className="text-xs text-danger mt-1">{form.formState.errors.businessLegalName.message as string}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Default Tax Rate</label>
            <select
              {...form.register('taxRate')}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-primary"
            >
              {TAX_RATE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">State Code</label>
            <select
              {...form.register('stateCode')}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-primary"
            >
              {GST_STATE_CODES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">HSN / SAC Code</label>
            <input
              type="text"
              {...form.register('hsnCode')}
              placeholder="999311"
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-primary font-mono"
            />
            {form.formState.errors.hsnCode && <p className="text-xs text-danger mt-1">{form.formState.errors.hsnCode.message as string}</p>}
            <p className="text-xs text-secondary mt-1">SAC 999311 = Fitness / Sports services</p>
          </div>
        </div>
        <div className="space-y-3 pt-2 border-t border-border">
          <p className="text-sm font-semibold text-primary">Invoice Options</p>
          <div className="flex items-center justify-between p-3 bg-input rounded-xl border border-border">
            <AdminSettingsToggleSwitch
              checked={formValues.showGstOnInvoice ?? initialData.showGstOnInvoice}
              onChange={(v) => form.setValue('showGstOnInvoice', v, { shouldDirty: true })}
              label="Show GST breakdown on invoices & receipts"
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-input rounded-xl border border-border">
            <AdminSettingsToggleSwitch
              checked={formValues.taxInclusivePricing ?? initialData.taxInclusivePricing}
              onChange={(v) => form.setValue('taxInclusivePricing', v, { shouldDirty: true })}
              label="Prices are tax-inclusive (GST already included in plan price)"
            />
          </div>
        </div>
      </div>
    </form>
  );
}