"use client";

import Header from '@/components/Header';
import { SettingsProvider } from './settings_context/SettingsContext';
import SettingsNav from './settings_components/SettingsNav/SettingsNav';
import SettingsContent from './settings_components/SettingsContent/SettingsContent';
import SettingsBanner from './settings_components/SettingsBanner/SettingsBanner';

import './settings.css';

function SettingsPageContent() {
  return (
    <div className="min-h-full pb-10 settings-module bg-[var(--bg-page)] text-[var(--settings-text-primary)]">
      <Header title="Settings" subtitle="Configure your gym management system" />
      <div className="p-6">
        <SettingsNav />
        <SettingsContent />
        <SettingsBanner />
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <SettingsProvider>
      <SettingsPageContent />
    </SettingsProvider>
  );
}
