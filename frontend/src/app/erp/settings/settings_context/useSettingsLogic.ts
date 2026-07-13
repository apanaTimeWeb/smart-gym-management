// RESPONSIBILITY: useSettingsLogic.ts handles the logic and UI for its corresponding feature.
import { useState, useCallback, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import { SettingsUrlConfig } from '@/app/erp/settings/settings_url_config';
import toast from 'react-hot-toast';
import { EMPTY_SETTINGS_FORM } from '@/app/erp/settings/settings_utils/SettingsSharedConstants';
import { SettingsContextType } from '@/app/erp/settings/settings_types/settings_types';

export function useSettingsLogic(): SettingsContextType {
 const [activeTab, setActiveTab] = useState('Gym Profile');
 const [loading, setLoading] = useState(true);
 const [saving, setSaving] = useState(false);
 const [form, setForm] = useState(EMPTY_SETTINGS_FORM);

 const fetchSettings = useCallback(async () => {
 setLoading(true);
 try {
 const res = await apiFetch<{ data?: Record<string, unknown>; message?: string }>(SettingsUrlConfig.BACKEND_API.BASE);
 if (res.data) setForm(res.data as typeof form);
 } catch (e: unknown) {
 toast.error(e instanceof Error ? e.message : String(e));
 } finally {
 setLoading(false);
 }
 }, []);

 useEffect(() => {
 fetchSettings();
 }, [fetchSettings]);

 const handleSave = useCallback(async () => {
 setSaving(true);
 try {
 const res = await apiFetch<{ message?: string }>(SettingsUrlConfig.BACKEND_API.BASE, {
 method: 'POST',
 body: JSON.stringify(form)
 });
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
