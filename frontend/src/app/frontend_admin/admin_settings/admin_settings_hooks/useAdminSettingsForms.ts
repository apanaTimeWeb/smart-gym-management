"use client";

// RESPONSIBILITY: Owns React Hook Form state, validation, mutation lifecycle, cache invalidation, and unsaved-change handling for Admin Settings forms.
// DATA FLOW: Settings view → section-specific hook → Zod resolver → settings API → TanStack Query invalidation → visible toast.

import { useCallback, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch, type FieldValues, type DefaultValues, type UseFormReturn } from 'react-hook-form';
import { AdminSettingsApi } from '@/app/frontend_admin/admin_settings/admin_settings_api/AdminSettingsApi';
import {
  AppIntegrationSettingsSchema,
  GeneralSettingsSchema,
  GstTaxSettingsSchema,
  GymProfileSchema,
  NotificationsSettingsSchema,
  PaymentGatewaySettingsSchema,
} from '@/app/frontend_admin/admin_settings/admin_settings_schemas/AdminSettingsSchemas';
import type {
  AppIntegrationSettingsType,
  GeneralSettingsType,
  GstTaxSettingsType,
  GymProfileType,
  NotificationsSettingsType,
  PaymentGatewaySettingsType,
} from '@/app/frontend_admin/admin_settings/admin_settings_types/AdminSettingsTypes';
import { useAdminSettingsUnsavedChangesGuard } from '@/app/frontend_admin/admin_settings/admin_settings_hooks/useAdminSettingsUnsavedChangesGuard';
import { useAdminSettingsMutation } from '@/app/frontend_admin/admin_settings/admin_settings_hooks/useAdminSettingsMutation';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutIdempotencyIntentStore';
import type { ZodType } from 'zod';

/**
 * useAdminSettingsSectionForm owns the isolated Admin data flow for this feature hook, including query state, mutations, and user-visible recovery behavior.
 * @remarks Server data remains in TanStack Query; UI-only state remains module-owned.
 * @description Manages the shared Admin Settings React Hook Form orchestration used by each settings section.
 * @dependencies Uses the module-owned Settings API client, mutation hook, schemas, and unsaved-changes guard.
 * @edge-case Preserves dirty form state after failed requests and reuses one idempotency key per user intent.
 */
function useAdminSettingsSectionForm<TFormValues extends FieldValues>(
  initialData: TFormValues,
  schema: ZodType<TFormValues>,
  submit: (data: TFormValues, idempotencyKey: string) => ReturnType<typeof AdminSettingsApi.updateSettings>,
  toastId: string,
) {
  const form = useForm<TFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialData as DefaultValues<TFormValues>,
  });
  const formValues = useWatch({ control: form.control });

  useAdminSettingsUnsavedChangesGuard(form.formState.isDirty);

  const mutation = useAdminSettingsMutation(submit, toastId);
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const submitForm = useCallback((data: TFormValues) => {
    const intentId = `${toastId}:${JSON.stringify(data)}`;
    const idempotencyKey = getAdminIdempotencyKey(idempotencyKeysRef.current, intentId);
    mutation.mutate({ data, idempotencyKey }, { onSuccess: () => clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId) });
  }, [mutation, toastId]);

  return { form: form as UseFormReturn<TFormValues>, formValues, mutation, submitForm };
}

/**
 * @description Owns the General Settings form lifecycle and validation contract.
 * @dependencies Uses the module Zod schema, Settings API mutation hook, and feature unsaved-change guard.
 * @edge-case Preserves dirty values and idempotency-key continuity when the API rejects a save.
 */
export function useAdminSettingsGeneralForm(initialData: GeneralSettingsType) {
  return useAdminSettingsSectionForm<GeneralSettingsType>(
    initialData,
    GeneralSettingsSchema,
    (data, idempotencyKey) => AdminSettingsApi.updateSettings({ general: data }, idempotencyKey),
    'settings-general-save',
  );
}

/**
 * @description Owns the GST/tax Settings form lifecycle and validation contract.
 * @dependencies Uses the module Zod schema, Settings API mutation hook, and feature unsaved-change guard.
 * @edge-case Preserves dirty values and idempotency-key continuity when the API rejects a save.
 */
export function useAdminSettingsGstForm(initialData: GstTaxSettingsType) {
  return useAdminSettingsSectionForm<GstTaxSettingsType>(
    initialData,
    GstTaxSettingsSchema,
    (data, idempotencyKey) => AdminSettingsApi.updateSettings({ gst: data }, idempotencyKey),
    'settings-gst-save',
  );
}

/**
 * @description Owns the Gym Profile Settings form lifecycle and validation contract.
 * @dependencies Uses the module Zod schema, Settings API mutation hook, and feature unsaved-change guard.
 * @edge-case Preserves dirty values and idempotency-key continuity when the API rejects a save.
 */
export function useAdminSettingsGymProfileForm(initialData: GymProfileType) {
  return useAdminSettingsSectionForm<GymProfileType>(
    initialData,
    GymProfileSchema,
    (data, idempotencyKey) => AdminSettingsApi.updateSettings({ profile: data }, idempotencyKey),
    'settings-profile-save',
  );
}

/**
 * @description Owns the notification-preference Settings form lifecycle and validation contract.
 * @dependencies Uses the module Zod schema, Settings API mutation hook, and feature unsaved-change guard.
 * @edge-case Preserves dirty values and idempotency-key continuity when the API rejects a save.
 */
export function useAdminSettingsNotificationsForm(initialData: NotificationsSettingsType) {
  return useAdminSettingsSectionForm<NotificationsSettingsType>(
    initialData,
    NotificationsSettingsSchema,
    (data, idempotencyKey) => AdminSettingsApi.updateSettings({ notifications: data }, idempotencyKey),
    'settings-notifications-save',
  );
}

/**
 * @description Owns the payment-gateway Settings form lifecycle and validation contract.
 * @dependencies Uses the module Zod schema, Settings API mutation hook, and feature unsaved-change guard.
 * @edge-case Preserves dirty values and idempotency-key continuity when the API rejects a save.
 */
export function useAdminSettingsPaymentGatewayForm(initialData: PaymentGatewaySettingsType) {
  return useAdminSettingsSectionForm<PaymentGatewaySettingsType>(
    initialData,
    PaymentGatewaySettingsSchema,
    (data, idempotencyKey) => AdminSettingsApi.updateSettings({ payment: data }, idempotencyKey),
    'settings-payment-save',
  );
}

/**
 * @description Owns the application-integration Settings form lifecycle and validation contract.
 * @dependencies Uses the module Zod schema, Settings API mutation hook, and feature unsaved-change guard.
 * @edge-case Preserves dirty values and idempotency-key continuity when the API rejects a save.
 */
export function useAdminSettingsAppIntegrationForm(initialData: AppIntegrationSettingsType) {
  return useAdminSettingsSectionForm<AppIntegrationSettingsType>(
    initialData,
    AppIntegrationSettingsSchema,
    (data, idempotencyKey) => AdminSettingsApi.updateSettings({ integration: data }, idempotencyKey),
    'settings-integration-save',
  );
}
