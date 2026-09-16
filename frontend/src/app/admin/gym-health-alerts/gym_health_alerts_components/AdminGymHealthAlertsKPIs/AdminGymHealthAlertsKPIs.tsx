"use client";
// RESPONSIBILITY: KPI cards for the Gym Health Alerts module.

import { AlertTriangle, AlertOctagon, AlertCircle, Building2 } from 'lucide-react';
import AdminStatCard from '@/app/admin/admin_components/AdminShared/AdminStatCard';
import { useAdminGymHealthAlertsLogic } from '@/app/admin/gym-health-alerts/gym_health_alerts_context/useAdminGymHealthAlertsLogic';

export default function AdminGymHealthAlertsKPIs() {
  const { kpis } = useAdminGymHealthAlertsLogic();
  if (!kpis) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <AdminStatCard title="Total Active Alerts" value={kpis.totalAlerts} icon={AlertTriangle} iconBg="bg-warning/10" iconColor="text-warning" />
      <AdminStatCard title="Critical Alerts" value={kpis.criticalAlerts} change="requires immediate action" changeType="down" icon={AlertOctagon} iconBg="bg-danger/10" iconColor="text-danger" />
      <AdminStatCard title="Warning Alerts" value={kpis.warningAlerts} change="monitor closely" changeType="neutral" icon={AlertCircle} iconBg="bg-warning/10" iconColor="text-warning" />
      <AdminStatCard title="Gyms At Risk" value={kpis.gymsAtRisk} change="need attention" changeType="down" icon={Building2} iconBg="bg-danger/10" iconColor="text-danger" />
    </div>
  );
}