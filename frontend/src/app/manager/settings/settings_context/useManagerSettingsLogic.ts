// RESPONSIBILITY: Logic hook for Manager Settings page — preferences state and save handler.
// DATA FLOW: managerSettingsApi → useManagerSettingsLogic → ManagerSettingsMain
'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { managerSettingsApi } from '@/app/manager/settings/settings_api/ManagerSettingsApi';

export function useManagerSettingsLogic() {
  const [language, setLanguage] = useState('en-US');
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(true);
  const [emailDailyReports, setEmailDailyReports] = useState(true);
  const [saving, setSaving] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await managerSettingsApi.updateSettings({
        language,
        timezone,
        pushNotificationsEnabled,
        emailDailyReports,
      });
      toast.success(res.message || 'Settings saved.');
    } catch {
      toast.error('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  }

  return {
    language, setLanguage,
    timezone, setTimezone,
    pushNotificationsEnabled, setPushNotificationsEnabled,
    emailDailyReports, setEmailDailyReports,
    saving,
    handleSave,
  };
}
