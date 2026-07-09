import { useState, useCallback, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import { SettingsUrlConfig } from '@/app/(erp)/settings/settings_url_config';
import toast from 'react-hot-toast';
import { EMPTY_SETTINGS_FORM } from '@/app/(erp)/settings/settings_utils/SettingsSharedConstants';
import { SettingsContextType } from '@/app/(erp)/settings/settings_types/settings_types';

export function useSettingsLogic(): SettingsContextType {
 const [activeTab, setActiveTab] = useState('Gym Profile');
 const [loading, setLoading] = useState(true);
 const [saving, setSaving] = useState(false);
 const [form, setForm] = useState(EMPTY_SETTINGS_FORM);

 const fetchSettings = useCallback(async () => {
 setLoading(true);
 try {
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const res: any = await apiFetch(SettingsUrlConfig.BACKEND_API.BASE);
 if (res.data) setForm(res.data);
 } catch (e: any) {
 toast.error(e.message);
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
 const res: any = await apiFetch(SettingsUrlConfig.BACKEND_API.BASE, {
 method: 'POST',
 body: JSON.stringify(form)
 });
 toast.success(res.message);
 } catch (e: any) {
 toast.error(e.message);
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
