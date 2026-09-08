// RESPONSIBILITY: KPI stat cards for the Communications module — total sent, WhatsApp, Email, campaigns this month.
'use client';

import { Send, MessageCircle, Mail, BarChart3 } from 'lucide-react';
import { useManagerCommunicationsLogic } from '@/app/manager/communications/communications_context/useManagerCommunicationsLogic';
import ManagerStatCard from '@/app/manager/manager_components/ManagerShared/ManagerStatCard';

export default function ManagerCommunicationsKPIs() {
  const { kpis } = useManagerCommunicationsLogic();
  if (!kpis) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <ManagerStatCard title="Total Messages Sent"    value={kpis.totalSent}           icon={Send}          iconBg="rgba(250,204,21,0.15)"  iconColor="var(--primary)" />
      <ManagerStatCard title="WhatsApp Sent"          value={kpis.whatsappSent}        icon={MessageCircle} iconBg="rgba(34,197,94,0.15)"   iconColor="var(--success)" />
      <ManagerStatCard title="Emails Sent"            value={kpis.emailSent}           icon={Mail}          iconBg="rgba(59,130,246,0.15)"  iconColor="var(--info)" />
      <ManagerStatCard title="Campaigns This Month"   value={kpis.campaignsThisMonth}  icon={BarChart3}     iconBg="rgba(250,204,21,0.15)"  iconColor="var(--primary)" />
    </div>
  );
}
