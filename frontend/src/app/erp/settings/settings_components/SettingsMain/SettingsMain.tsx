// RESPONSIBILITY: Entry component for the Settings module. Wraps the UI in the context provider and handles page layout.
'use client';

import ErpHeader from '@/app/erp/erp_components/ErpLayout/ErpHeader';
import { SettingsProvider } from '@/app/erp/settings/settings_context/SettingsContext';
import SettingsNav from '@/app/erp/settings/settings_components/SettingsNav/SettingsNav';
import SettingsContent from '@/app/erp/settings/settings_components/SettingsContent/SettingsContent';
import SettingsBanner from '@/app/erp/settings/settings_components/SettingsBanner/SettingsBanner';

import '@/app/erp/settings/settings.css';

function SettingsMainContent() {
 return (
 <div className="min-h-full pb-10 settings-module bg-background text-foreground">
 <ErpHeader title="Settings" subtitle="Configure your gym management system" />
 <div className="p-6">
 <SettingsNav />
 <SettingsContent />
 <SettingsBanner />
 </div>
 </div>
 );
}

export default function SettingsMain() {
 return (
 <SettingsProvider>
 <SettingsMainContent />
 </SettingsProvider>
 );
}
