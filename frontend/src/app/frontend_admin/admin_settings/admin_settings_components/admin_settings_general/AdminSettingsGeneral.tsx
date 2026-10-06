"use client";
// RESPONSIBILITY: Manages the General Settings tab.
import { useTranslations } from 'next-intl';
import type { GeneralSettingsType } from '@/app/frontend_admin/admin_settings/admin_settings_types/AdminSettingsTypes';
import { useAdminSettingsGeneralForm } from '@/app/frontend_admin/admin_settings/admin_settings_hooks/useAdminSettingsForms';
import { Save, Loader2, RefreshCw } from 'lucide-react';
import { ADMIN_SETTINGS_GENERAL_SELECT_FIELDS, ADMIN_SETTINGS_GENERAL_TOGGLE_FIELDS } from '@/app/frontend_admin/admin_settings/admin_settings_constants/AdminSettingsConstants';
import { AdminSettingsToggleSwitch } from '@/app/frontend_admin/admin_settings/admin_settings_components/admin_settings_shared/AdminSettingsToggleSwitch';
import type { AdminSettingsGeneralProps } from '@/app/frontend_admin/admin_settings/admin_settings_types/AdminSettingsGeneralPropsTypes';

/**
 * AdminSettingsGeneral renders the admin settings general UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSettingsGeneral: Manages the General Settings tab.
 * @dependencies Consumes AdminSettingsTypes, useAdminSettingsForms, AdminSettingsConstants, AdminSettingsToggleSwitch.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export function AdminSettingsGeneral({ initialData }: AdminSettingsGeneralProps) {
  const t = useTranslations();
  const getValidationMessage = (message: unknown) => typeof message === 'string' && message.startsWith('__i18n:') ? t(message.slice(8)) : String(message ?? '');

  const { form, formValues, mutation, submitForm } = useAdminSettingsGeneralForm(initialData);

  const onSubmit = (data: GeneralSettingsType) => submitForm(data);


  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card rounded-xl shadow-card border border-border mt-6" data-testid="admin_settings-admin_settings-general-submit">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-bold text-primary text-lg">{t('settings.admin_settings_general.text_71dd223f6b')}</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => form.reset(initialData)}
            disabled={!form.formState.isDirty || mutation.isPending}
            className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-input text-secondary flex items-center gap-2 motion-safe:transition-colors disabled:opacity-50 motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
           data-testid="admin_settings-admin_settings-general-click">
            <RefreshCw size={18}  strokeWidth={2}/> {t('settings.admin_settings_general.text_44c57abd88')}</button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-4 py-2 text-sm bg-primary text-on-primary rounded-lg font-medium flex items-center gap-2 disabled:opacity-70 hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
           data-testid="admin_settings-admin_settings-general-submit-2">
            {mutation.isPending ? <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true"  strokeWidth={2}/> : <Save size={18}  strokeWidth={2}/>} {mutation.isPending ? t('settings.admin_settings_general.auto_3222dd4f7a') : t('settings.admin_settings_general.auto_baf38eca81')}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {ADMIN_SETTINGS_GENERAL_SELECT_FIELDS.map((f, __testIdIndex49) => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-secondary mb-1">{t(f.labelKey)}</label>
              <select
                {...form.register(f.key)}
                className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
               data-testid={`admin_settings-admin_settings-general-control-map49-${__testIdIndex49}-1`}>
                {f.options.map((o, __testIdIndex56) => <option key={o.value} value={o.value} data-testid={`admin_settings-admin_settings-general-control-2-map49-${__testIdIndex49}-2`}>{t(o.labelKey)}</option>)}
              </select>
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">{t('settings.admin_settings_general.text_4827931e55')}</label>
            <select
              {...form.register('dateFormat')}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
             data-testid="admin_settings-admin_settings-general-control-3">
              <option value="DD/MM/YYYY" data-testid="admin_settings-admin_settings-general-control-4">{t('settings.admin_settings_general.text_5d95adc03d')}</option>
              <option value="MM/DD/YYYY" data-testid="admin_settings-admin_settings-general-control-5">{t('settings.admin_settings_general.text_119c608ac4')}</option>
              <option value="YYYY-MM-DD" data-testid="admin_settings-admin_settings-general-control-6">{t('settings.admin_settings_general.text_d3f8f7b810')}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">{t('settings.admin_settings_general.text_6a1ad2e081')}</label>
            <input
              type="number"
              min="15"
              max="480"
              step="1"
              {...form.register('sessionTimeoutMinutes', { valueAsNumber: true })}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
             data-testid="admin_settings-admin_settings-general-control-7"/>
            {form.formState.errors.sessionTimeoutMinutes && <p className="text-xs text-danger mt-1">{getValidationMessage(form.formState.errors.sessionTimeoutMinutes.message)}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">{t('settings.admin_settings_general.text_bd87d6356b')}</label>
            <input
              type="number"
              min="6"
              max="120"
              step="1"
              {...form.register('dataRetentionMonths', { valueAsNumber: true })}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
             data-testid="admin_settings-admin_settings-general-control-8"/>
            {form.formState.errors.dataRetentionMonths && <p className="text-xs text-danger mt-1">{getValidationMessage(form.formState.errors.dataRetentionMonths.message)}</p>}
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t border-border">
          <p className="text-sm font-semibold text-primary">{t('settings.admin_settings_general.text_2a98511fed')}</p>
          {ADMIN_SETTINGS_GENERAL_TOGGLE_FIELDS.map((f, __testIdIndex99) => (
            <div key={f.key} className="flex items-center justify-between p-3 bg-input rounded-xl border border-border">
              <AdminSettingsToggleSwitch
                checked={formValues[f.key] ?? initialData[f.key]}
                onChange={(v) => form.setValue(f.key, v, { shouldDirty: true })}
                label={t(f.labelKey)}
               data-testid={`admin_settings-admin_settings-general-change-map99-${__testIdIndex99}-1`}/>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
