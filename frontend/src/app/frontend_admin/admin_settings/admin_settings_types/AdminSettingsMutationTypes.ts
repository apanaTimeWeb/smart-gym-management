// RESPONSIBILITY: Defines the Admin Settings mutation input contract used by the module mutation hook.
import type { FieldValues } from 'react-hook-form';
import type { AdminSettingsApi } from '@/app/frontend_admin/admin_settings/admin_settings_api/AdminSettingsApi';

export type AdminSettingsMutationSubmit<TFormValues extends FieldValues> = (
  data: TFormValues,
  idempotencyKey: string,
) => ReturnType<typeof AdminSettingsApi.updateSettings>;

export interface AdminSettingsMutationVariables<TFormValues extends FieldValues> {
  data: TFormValues;
  idempotencyKey: string;
}
