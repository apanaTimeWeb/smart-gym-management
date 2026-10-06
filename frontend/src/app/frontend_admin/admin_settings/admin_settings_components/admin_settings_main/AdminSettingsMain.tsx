// RESPONSIBILITY: Entry component for the Settings module. Wraps the UI in the context provider and handles page layout.
"use client";
import AdminSettingsContent from '@/app/frontend_admin/admin_settings/admin_settings_components/admin_settings_content/AdminSettingsContent';
import AdminSettingsBanner from '@/app/frontend_admin/admin_settings/admin_settings_components/admin_settings_banner/AdminSettingsBanner';


/**
 * AdminSettingsMain renders the admin settings main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSettingsMain: Entry component for the Settings module. Wraps the UI in the context provider and handles page layout.
 * @dependencies Consumes AdminSettingsContent, AdminSettingsBanner.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
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
