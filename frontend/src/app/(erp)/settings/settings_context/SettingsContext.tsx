"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { apiFetch } from '@/lib/api';
import toast from 'react-hot-toast';
import { EMPTY_SETTINGS_FORM } from '../settings_utils/SettingsSharedConstants';

interface SettingsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  loading: boolean;
  saving: boolean;
  form: typeof EMPTY_SETTINGS_FORM;
  handleChange: (field: string, value: string) => void;
  fetchSettings: () => Promise<void>;
  handleSave: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('Gym Profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(EMPTY_SETTINGS_FORM);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      // Temporarily use any for response to match old monolithic logic
      const res: any = await apiFetch('/settings');
      if (res.data) setForm(res.data);
    } catch (err: any) {
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
    } catch (err: any) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  }, [form]);

  const handleChange = useCallback((field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const value = useMemo(() => ({
    activeTab, setActiveTab,
    loading, saving, form,
    handleChange, fetchSettings, handleSave
  }), [
    activeTab, loading, saving, form,
    handleChange, fetchSettings, handleSave
  ]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettingsContext() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettingsContext must be used within a SettingsProvider');
  }
  return context;
}
