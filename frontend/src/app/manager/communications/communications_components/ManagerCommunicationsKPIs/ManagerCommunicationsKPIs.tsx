// RESPONSIBILITY: KPI stat cards for the Communications module — total sent, WhatsApp, Email, campaigns this month.
'use client';
import { Send, MessageCircle, Mail, BarChart3 } from 'lucide-react';
import { formatNumber } from '@/lib/formatters';
import { useManagerCommunicationsLogic } from '@/app/manager/communications/communications_hooks/ManagerUseManagerCommunicationsLogic';
import ManagerStatCard from '@/app/manager/manager_components/ManagerShared/ManagerStatCard';


export default function ManagerCommunicationsKPIs() {
  const { kpis } = useManagerCommunicationsLogic();
  if (!kpis) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <ManagerStatCard title="Total Messages Sent"    value={formatNumber(kpis.totalSent)}           icon={Send}          iconBg="bg-primary-bg"  iconColor="text-primary" />
      <ManagerStatCard title="WhatsApp Sent"          value={formatNumber(kpis.whatsappSent)}        icon={MessageCircle} iconBg="bg-success-bg"   iconColor="text-success" />
      <ManagerStatCard title="Emails Sent"            value={formatNumber(kpis.emailSent)}           icon={Mail}          iconBg="bg-info-bg"     iconColor="text-info" />
      <ManagerStatCard title="Campaigns This Month"   value={formatNumber(kpis.campaignsThisMonth)}  icon={BarChart3}     iconBg="bg-primary-bg"  iconColor="text-primary" />
    </div>
  );
}
