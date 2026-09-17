"use client";
// RESPONSIBILITY: Main entry point for the Gym Health Alerts module.
import AdminGymHealthAlertsKPIs from '@/app/admin/gym-health-alerts/gym_health_alerts_components/AdminGymHealthAlertsKPIs/AdminGymHealthAlertsKPIs';
import AdminGymHealthAlertsFilters from '@/app/admin/gym-health-alerts/gym_health_alerts_components/AdminGymHealthAlertsFilters/AdminGymHealthAlertsFilters';
import AdminGymHealthAlertsTable from '@/app/admin/gym-health-alerts/gym_health_alerts_components/AdminGymHealthAlertsTable/AdminGymHealthAlertsTable';

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