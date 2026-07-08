import { useState, useCallback, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import toast from 'react-hot-toast';
import { EMPTY_SETTINGS_FORM } from '../settings_utils/SettingsSharedConstants';
import { SettingsContextType } from '../settings_types/settings_types';

export function useSettingsLogic(): SettingsContextType {
 const [activeTab, setActiveTab] = useState('Gym Profile');
 const [loading, setLoading] = useState(true);
 const [saving, setSaving] = useState(false);
 const [form, setForm] = useState(EMPTY_SETTINGS_FORM);

 const fetchSettings = useCallback(async () => {
 setLoading(true);
 try {
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const res: any = await apiFetch('/settings');
 if (res.data) setForm(res.data);
 } catch {
 toast.error('Failed to load settings');
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
 await apiFetch('/settings', {
 method: 'POST',
 body: JSON.stringify(form)
 });
 toast.success('Settings saved successfully!');
 } catch {
 toast.error('Failed to save settings');
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
