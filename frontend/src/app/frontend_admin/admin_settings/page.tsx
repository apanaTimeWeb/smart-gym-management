// RESPONSIBILITY: Server Component — fetches initial SSR data and renders the Settings module entry point.
import AdminSettingsMain from '@/app/frontend_admin/admin_settings/admin_settings_components/admin_settings_main/AdminSettingsMain';

/**
 * SettingsPage is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function SettingsPage() {
 return (
      <AdminSettingsMain />
  );
}
