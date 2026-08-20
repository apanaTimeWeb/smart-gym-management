// RESPONSIBILITY: Entry component for the Settings module. Wraps the UI in the context provider and handles page layout.
'use client';

import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import { SettingsProvider } from '@/app/manager/settings/settings_context/SettingsContext';
import SettingsNav from '@/app/manager/settings/settings_components/SettingsNav/SettingsNav';
import SettingsContent from '@/app/manager/settings/settings_components/SettingsContent/SettingsContent';
import SettingsBanner from '@/app/manager/settings/settings_components/SettingsBanner/SettingsBanner';


function SettingsMainContent() {
 return (
 <div className="min-h-full pb-10 settings-module bg-background text-foreground">
 <ManagerHeader title="Settings" subtitle="Configure your gym management system" />
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
