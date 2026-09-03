// RESPONSIBILITY: Custom hook encapsulating all UI state and API orchestration for the Settings module.
import { useState, useCallback, useEffect } from 'react';
import { settingsApi } from '@/app/admin/settings/settings_api/settings_api';
import toast from 'react-hot-toast';
import { EMPTY_SETTINGS_FORM } from '@/app/admin/settings/settings_utils/SettingsSharedConstants';
import { SettingsContextType } from '@/app/admin/settings/settings_types/settings_types';

export function useSettingsLogic(): SettingsContextType {
 const [activeTab, setActiveTab] = useState('Gym Profile');
 const [loading, setLoading] = useState(true);
 const [saving, setSaving] = useState(false);
 const [form, setForm] = useState(EMPTY_SETTINGS_FORM);

 const fetchSettings = useCallback(async () => {
 setLoading(true);
 try {
 const res = await settingsApi.getSettings();
 if (res.data) setForm(res.data as typeof form);
 } catch (e: unknown) {
 toast.error(e instanceof Error ? e.message : String(e));
 } finally {
 setLoading(false);
 }
 }, []);

 /* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
 useEffect(() => {
 fetchSettings();
 }, []);
 /* eslint-enable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */

 const handleSave = useCallback(async () => {
 setSaving(true);
 try {
 const res = await settingsApi.updateSettings(form);
 toast.success(res.message || 'Saved');
 } catch (e: unknown) {
 toast.error(e instanceof Error ? e.message : String(e));
 } finally {
 setSaving(false);
 }
 }, [form]);

 const handleChange = useCallback((field: string, value: string) => {
 setForm(prev => ({ ...prev, [field]: value }));
 }, []);

 return {
 activeTab, setActiveTab,
 loading, saving, form,
 handleChange, fetchSettings, handleSave
 };
}
