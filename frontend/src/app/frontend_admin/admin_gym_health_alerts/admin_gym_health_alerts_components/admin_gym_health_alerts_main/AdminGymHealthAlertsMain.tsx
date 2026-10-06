// RESPONSIBILITY: Main entry point for the Gym Health Alerts module.
"use client";
import AdminGymHealthAlertsKPIs from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_components/admin_gym_health_alerts_kpis/AdminGymHealthAlertsKPIs';
import AdminGymHealthAlertsFilters from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_components/admin_gym_health_alerts_filters/AdminGymHealthAlertsFilters';
import AdminGymHealthAlertsTable from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_components/admin_gym_health_alerts_table/AdminGymHealthAlertsTable';

/**
 * AdminGymHealthAlertsMain renders the admin gym health alerts main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminGymHealthAlertsMain: Main entry point for the Gym Health Alerts module.
 * @dependencies Consumes AdminGymHealthAlertsKPIs, AdminGymHealthAlertsFilters, AdminGymHealthAlertsTable.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminGymHealthAlertsMain() {
  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-5">
        <AdminGymHealthAlertsKPIs />
        <AdminGymHealthAlertsFilters />
        <AdminGymHealthAlertsTable />
      </div>
    </div>
  );
}