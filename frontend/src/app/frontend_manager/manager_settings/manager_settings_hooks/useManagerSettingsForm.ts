'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useManagerUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/frontend_manager/manager_infrastructure/ManagerToastService';
import { useManagerSettingsLogic } from '@/app/frontend_manager/manager_settings/manager_settings_hooks/useManagerSettingsLogic';
import { managerAllSettingsSchema } from '@/app/frontend_manager/manager_settings/manager_settings_schemas/ManagerSettingsSchema';
import { EMPTY_MANAGER_SETTINGS } from '@/app/frontend_manager/manager_settings/manager_settings_types/ManagerSettingsFormTypes';
import type { ManagerAllSettings } from '@/app/frontend_manager/manager_settings/manager_settings_types/ManagerSettingsTypes';

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates settings feature state and its documented UI/API boundary through useManagerSettingsForm.
 * @dependencies Uses ManagerToastService, ManagerUnsavedChangesGuard, useManagerSettingsLogic, ManagerSettingsSchema.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerSettingsForm owns the settings feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerSettingsForm() {
  const logic = useManagerSettingsLogic();
  const form = useForm<ManagerAllSettings>({ resolver: zodResolver(managerAllSettingsSchema), defaultValues: EMPTY_MANAGER_SETTINGS });
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => { if (logic.settings) form.reset(logic.settings); }, [form, logic.settings]);
  useManagerUnsavedChangesGuard(form.formState.isDirty);
  const submit = form.handleSubmit(async (draft) => { try { const response = await logic.saveSettings(draft); form.reset(response.data ?? draft); showManagerSuccessToast(response.message, 'manager-settings-save-success'); } catch (error: unknown) { showManagerErrorToast(error, 'manager-settings-save-error'); } });
  return { ...logic, form, submit };
}
