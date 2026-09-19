'use client';
// RESPONSIBILITY: Owns Settings form setup, synchronization, validation, submission and dirty-state protection.
// DATA FLOW: Settings query → RHF/Zod draft → save mutation → backend message → Query cache/UI.
/** Coordinates the Manager / feature. */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/manager/manager_infrastructure/ManagerToastService';
import { useManagerSettingsLogic } from '@/app/manager/settings/settings_hooks/ManagerUseManagerSettingsLogic';
import { managerAllSettingsSchema } from '@/app/manager/settings/settings_schemas/ManagerSettingsSchema';
import type { ManagerAllSettings } from '@/app/manager/settings/settings_types/ManagerSettingsTypes';
import { EMPTY_MANAGER_SETTINGS } from '@/app/manager/settings/settings_types/ManagerSettingsFormTypes';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
export function useManagerSettingsForm() {
  const logic = useManagerSettingsLogic();
  const form = useForm<ManagerAllSettings>({ resolver: zodResolver(managerAllSettingsSchema), defaultValues: EMPTY_MANAGER_SETTINGS });
  useEffect(() => { if (logic.settings) form.reset(logic.settings); }, [form, logic.settings]);
  useManagerUnsavedChangesGuard(form.formState.isDirty);
  const submit = form.handleSubmit(async (draft) => { try { const response = await logic.saveSettings(draft); form.reset(response.data ?? draft); showManagerSuccessToast(response.message, 'manager-settings-save-success'); } catch (error: unknown) { showManagerErrorToast(error, 'manager-settings-save-error'); } });
  return { ...logic, form, submit };
}
