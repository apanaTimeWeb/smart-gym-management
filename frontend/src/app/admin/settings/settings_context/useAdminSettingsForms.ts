"use client";
// RESPONSIBILITY: Owns React Hook Form state, validation, mutation lifecycle, cache invalidation, and unsaved-change handling for Admin Settings forms.
// DATA FLOW: Settings view → section-specific hook → Zod resolver → settings API → TanStack Query invalidation → visible toast.

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch, type FieldValues, type DefaultValues } from 'react-hook-form';
import { adminToast } from '@/app/admin/admin_layout/AdminFeedback/AdminToastService';
import { settingsApi } from '@/app/admin/settings/settings_api/AdminSettingsApi';
import {
  AppIntegrationSettingsSchema,
  GeneralSettingsSchema,
  GstTaxSettingsSchema,
  GymProfileSchema,
  NotificationsSettingsSchema,
  PaymentGatewaySettingsSchema,
} from '@/app/admin/settings/settings_types/AdminSettings.schema';
import type {
  AppIntegrationSettingsType,
  GeneralSettingsType,
  GstTaxSettingsType,
  GymProfileType,
  NotificationsSettingsType,
  PaymentGatewaySettingsType,
} from '@/app/admin/settings/settings_types/AdminSettingsTypes';
import { useUnsavedChangesGuard } from '@/app/admin/admin_layout/admin_utils/useAdminUnsavedChangesGuard';
import type { ZodType } from 'zod';

function useAdminSettingsSectionForm<TFormValues extends FieldValues>(
  initialData: TFormValues,
  schema: any,
  submit: (data: TFormValues) => ReturnType<typeof settingsApi.updateSettings>,
  toastId: string,
) {
  const queryClient = useQueryClient();
  const form = useForm<TFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialData as DefaultValues<TFormValues>,
  });
  const formValues = useWatch({ control: form.control });

  useUnsavedChangesGuard(form.formState.isDirty);

  const mutation = useMutation({
    mutationFn: submit,
    onSuccess: (res) => {
      adminToast.success(res.message, toastId);
      void queryClient.invalidateQueries({ queryKey: ['admin', 'settings'] });
      form.reset(form.getValues() as DefaultValues<TFormValues>);
    },
    onError: (err) => adminToast.error((err as Error).message, toastId),
  });

  return { form, formValues, mutation };
}

/** Coordinates SettingsGeneralForm state, data flow, and feature behavior. */
export function useAdminSettingsGeneralForm(initialData: GeneralSettingsType) {
  return useAdminSettingsSectionForm<GeneralSettingsType>(
    initialData,
    GeneralSettingsSchema,
    (data) => settingsApi.updateSettings({ general: data }),
    'settings-general-save',
  );
}

/** Owns the Settings GST form state and validation lifecycle. */
export function useAdminSettingsGstForm(initialData: GstTaxSettingsType) {
  return useAdminSettingsSectionForm<GstTaxSettingsType>(
    initialData,
    GstTaxSettingsSchema,
    (data) => settingsApi.updateSettings({ gst: data }),
    'settings-gst-save',
  );
}

/** Owns the Settings gym-profile form state and validation lifecycle. */
export function useAdminSettingsGymProfileForm(initialData: GymProfileType) {
  return useAdminSettingsSectionForm<GymProfileType>(
    initialData,
    GymProfileSchema,
    (data) => settingsApi.updateSettings({ profile: data }),
    'settings-profile-save',
  );
}

/** Owns the Settings notification-preference form state and validation lifecycle. */
export function useAdminSettingsNotificationsForm(initialData: NotificationsSettingsType) {
  return useAdminSettingsSectionForm<NotificationsSettingsType>(
    initialData,
    NotificationsSettingsSchema,
    (data) => settingsApi.updateSettings({ notifications: data }),
    'settings-notifications-save',
  );
}

/** Owns the Settings payment-gateway form state and validation lifecycle. */
export function useAdminSettingsPaymentGatewayForm(initialData: PaymentGatewaySettingsType) {
  return useAdminSettingsSectionForm<PaymentGatewaySettingsType>(
    initialData,
    PaymentGatewaySettingsSchema,
    (data) => settingsApi.updateSettings({ payment: data }),
    'settings-payment-save',
  );
}

/** Owns the Settings application-integration form state and validation lifecycle. */
export function useAdminSettingsAppIntegrationForm(initialData: AppIntegrationSettingsType) {
  return useAdminSettingsSectionForm<AppIntegrationSettingsType>(
    initialData,
    AppIntegrationSettingsSchema,
    (data) => settingsApi.updateSettings({ integration: data }),
    'settings-integration-save',
  );
}
