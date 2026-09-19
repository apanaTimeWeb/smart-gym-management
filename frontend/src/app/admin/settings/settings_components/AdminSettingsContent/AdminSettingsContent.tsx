"use client";
// RESPONSIBILITY: Main orchestrator for the Settings module. Switches between sub-tabs based on URL parameter.
import { useSearchParams } from 'next/navigation';
import { useAdminSettingsData } from '@/app/admin/settings/settings_context/useAdminSettingsData';
import AdminSettingsNav from '@/app/admin/settings/settings_components/AdminSettingsNav/AdminSettingsNav';
import { AdminSettingsGymProfile } from '@/app/admin/settings/settings_components/AdminSettingsGymProfile/AdminSettingsGymProfile';
import { AdminSettingsNotifications } from '@/app/admin/settings/settings_components/AdminSettingsNotifications/AdminSettingsNotifications';
import { AdminSettingsRoles } from '@/app/admin/settings/settings_components/AdminSettingsRoles/AdminSettingsRoles';
import { AdminSettingsAppIntegration } from '@/app/admin/settings/settings_components/AdminSettingsAppIntegration/AdminSettingsAppIntegration';
import { AdminSettingsGST } from '@/app/admin/settings/settings_components/AdminSettingsGST/AdminSettingsGST';
import { AdminSettingsPaymentGateway } from '@/app/admin/settings/settings_components/AdminSettingsPaymentGateway/AdminSettingsPaymentGateway';
import { AdminSettingsGeneral } from '@/app/admin/settings/settings_components/AdminSettingsGeneral/AdminSettingsGeneral';

export default function AdminSettingsContent() {
  const searchParams = useSearchParams();
  const activeTabId = searchParams.get('tab') || 'profile';

  const { data: settingsData, isLoading, isError, error } = useAdminSettingsData();

  if (isLoading) {
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
        <p className="text-danger">Failed to load settings: {(error as Error)?.message || 'Unknown error'}</p>
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