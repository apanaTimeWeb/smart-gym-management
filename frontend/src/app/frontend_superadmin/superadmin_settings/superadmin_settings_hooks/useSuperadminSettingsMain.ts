'use client';// DATA FLOW: Settings route → useSuperadminSettingsPage → draft/grouping state → Settings Main view.
// RESPONSIBILITY: Owns editable drafts, grouped settings, and save completion behavior for the settings view.
import { useMemo, useState } from 'react';

import { toast } from 'sonner';

import { useSuperadminSettingsPage } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_hooks/useSuperadminSettingsPage';

import type { PlatformSetting } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_types/SuperadminSettingsTypes';



/**
 * @description Coordinates editable Settings drafts, grouping, and save feedback for the route main view.
 * @dependencies Composes the Settings page hook and keeps unsaved field edits in local component state.
 * @edge-case A save is ignored when no draft exists; failed saves preserve the draft so the user can retry without losing input.
 */
export function useSuperadminSettingsMain() {
  const page = useSuperadminSettingsPage();
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const settings: PlatformSetting[] = page.query.data?.data ?? [];
  const groupedSettings = useMemo(() => settings.reduce<Record<string, PlatformSetting[]>>((accumulator, current) => {
    const category = current.category || 'general';
    const existing = accumulator[category] ?? [];
    existing.push(current);
    accumulator[category] = existing;
    return accumulator;
  }, {}), [settings]);
  const handleSave = async (id: string) => {
    const value = editedValues[id];
    if (value === undefined) return;
    try {
      const response = await page.updateSetting({ id, value });
      toast.success(response.message, { id: `superadmin-setting-save-${id}` });
      setEditedValues((previous) => { const next = { ...previous }; delete next[id]; return next; });
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : String(error), { id: `superadmin-setting-save-error-${id}` });
    }
  };
  return { ...page, settings, groupedSettings, editedValues, setEditedValues, handleSave };
}
