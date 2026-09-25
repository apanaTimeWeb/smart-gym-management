"use client";
// RESPONSIBILITY: Manages the Gym Profile settings form.
import type { GymProfileType } from '@/app/admin/settings/settings_types/AdminSettingsTypes';
import { useAdminSettingsGymProfileForm } from '@/app/admin/settings/settings_context/useAdminSettingsForms';
import { Save, RefreshCw } from 'lucide-react';

export function AdminSettingsGymProfile({ initialData }: { initialData: GymProfileType }) {
  const { form, mutation } = useAdminSettingsGymProfileForm(initialData);

  const onSubmit = (data: GymProfileType) => mutation.mutate(data);

  const fields = [
    { label: 'Gym Name', field: 'gymName' as const, type: 'text' },
    { label: 'Owner Name', field: 'ownerName' as const, type: 'text' },
    { label: 'Phone Number', field: 'phone' as const, type: 'tel' },
    { label: 'Email', field: 'email' as const, type: 'email' },
    { label: 'City', field: 'city' as const, type: 'text' },
    { label: 'GST Number', field: 'gstNumber' as const, type: 'text' },
  ];

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card rounded-xl shadow-card border border-border mt-6">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-bold text-primary text-lg">Gym Profile</h2>
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
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {fields.map(f => (
          <div key={f.field}>
            <label className="block text-sm font-medium text-secondary mb-1">{f.label}</label>
            <input
              type={f.type}
              {...form.register(f.field)}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary"
            />
            {form.formState.errors[f.field] && (
              <p className="text-xs text-danger mt-1">{form.formState.errors[f.field]?.message as string}</p>
            )}
          </div>
        ))}
      </div>
    </form>
  );
}
