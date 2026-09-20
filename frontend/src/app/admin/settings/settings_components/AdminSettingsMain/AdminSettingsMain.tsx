"use client";
// RESPONSIBILITY: Entry component for the Settings module. Wraps the UI in the context provider and handles page layout.
import AdminSettingsContent from '@/app/admin/settings/settings_components/AdminSettingsContent/AdminSettingsContent';
import AdminSettingsBanner from '@/app/admin/settings/settings_components/AdminSettingsBanner/AdminSettingsBanner';


export default function AdminSettingsMain() {
  return (
    <div className="min-h-full pb-10 settings-module bg-page text-primary">
      <div className="p-6">
        <AdminSettingsContent />
        <AdminSettingsBanner />
      </div>
    </div>
  );
}