"use client";
// RESPONSIBILITY: Main orchestrator for the Settings module. Switches between sub-tabs based on URL parameter.
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { getAdminBackendMessage } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage';
import { useAdminSettingsData } from '@/app/frontend_admin/admin_settings/admin_settings_hooks/useAdminSettingsData';
import AdminSettingsNav from '@/app/frontend_admin/admin_settings/admin_settings_components/admin_settings_nav/AdminSettingsNav';
import { AdminSettingsGymProfile } from '@/app/frontend_admin/admin_settings/admin_settings_components/admin_settings_gym_profile/AdminSettingsGymProfile';
import { AdminSettingsNotifications } from '@/app/frontend_admin/admin_settings/admin_settings_components/admin_settings_notifications/AdminSettingsNotifications';
import { AdminSettingsRoles } from '@/app/frontend_admin/admin_settings/admin_settings_components/admin_settings_roles/AdminSettingsRoles';
import { AdminSettingsAppIntegration } from '@/app/frontend_admin/admin_settings/admin_settings_components/admin_settings_app_integration/AdminSettingsAppIntegration';
import { AdminSettingsGST } from '@/app/frontend_admin/admin_settings/admin_settings_components/admin_settings_gst/AdminSettingsGST';
import { AdminSettingsPaymentGateway } from '@/app/frontend_admin/admin_settings/admin_settings_components/admin_settings_payment_gateway/AdminSettingsPaymentGateway';
import { AdminSettingsGeneral } from '@/app/frontend_admin/admin_settings/admin_settings_components/admin_settings_general/AdminSettingsGeneral';

/**
 * AdminSettingsContent renders the admin settings content UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSettingsContent: Main orchestrator for the Settings module. Switches between sub-tabs based on URL parameter.
 * @dependencies Consumes AdminLayoutBackendMessage, useAdminSettingsData, AdminSettingsNav, AdminSettingsGymProfile, AdminSettingsNotifications.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSettingsContent() {
  const t = useTranslations();

  const searchParams = useSearchParams();
  const activeTabId = searchParams.get('tab') || 'profile';

  const { data: settingsData, isPending, isError, error } = useAdminSettingsData();

  if (isPending) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 motion-safe:animate-pulse motion-safe:duration-base">
        <div className="h-40 bg-card rounded-xl border border-border"></div>
        <div className="h-96 bg-card rounded-xl border border-border"></div>
      </div>
    );
  }

  if (isError || !settingsData?.data) {
    return (
      <div className="max-w-7xl mx-auto text-center py-12">
        <p className="text-danger">{t('settings.admin_settings_content.text_ca650fd593')}{getAdminBackendMessage(error) ?? t('settings.admin_settings_content.text_unknownError')}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <AdminSettingsNav />
      {activeTabId === 'profile' && <AdminSettingsGymProfile initialData={settingsData.data.profile} />}
      {activeTabId === 'notifications' && <AdminSettingsNotifications initialData={settingsData.data.notifications} />}
      {activeTabId === 'roles' && <AdminSettingsRoles />}
      {activeTabId === 'integration' && <AdminSettingsAppIntegration initialData={settingsData.data.integration} />}
      {activeTabId === 'gst' && <AdminSettingsGST initialData={settingsData.data.gst} />}
      {activeTabId === 'payment' && <AdminSettingsPaymentGateway initialData={settingsData.data.payment} />}
      {activeTabId === 'general' && <AdminSettingsGeneral initialData={settingsData.data.general} />}
    </div>
  );
}
