// RESPONSIBILITY: Renders ManagerCommunicationsKPIs's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Send, MessageCircle, Mail, BarChart3 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useManagerCommunicationsLogic } from '@/app/frontend_manager/manager_communications/manager_communications_hooks/useManagerCommunicationsLogic';
import { ManagerCommunicationsFormatNumber } from '@/app/frontend_manager/manager_communications/manager_communications_utils/ManagerCommunicationsFormatters';
import ManagerStatCard from '@/components/ui/manager_stat_card/ManagerStatCard';


/** @description Renders the ManagerCommunicationsKPIs component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerCommunicationsKPIs() {
  const t = useTranslations('MANAGER_COMMUNICATIONS');

  const { kpis } = useManagerCommunicationsLogic();
  if (!kpis) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <ManagerStatCard title={t("COPY_TOTAL_MESSAGES_SENT")}    value={ManagerCommunicationsFormatNumber(kpis.totalSent)}           icon={Send}          iconBg="bg-primary-subtle"  iconColor="text-primary" />
      <ManagerStatCard title={t("COPY_WHATSAPP_SENT")}          value={ManagerCommunicationsFormatNumber(kpis.whatsappSent)}        icon={MessageCircle} iconBg="bg-success-bg"   iconColor="text-success" />
      <ManagerStatCard title={t("COPY_EMAILS_SENT")}            value={ManagerCommunicationsFormatNumber(kpis.emailSent)}           icon={Mail}          iconBg="bg-info-bg"     iconColor="text-info" />
      <ManagerStatCard title={t("COPY_CAMPAIGNS_MONTH")}   value={ManagerCommunicationsFormatNumber(kpis.campaignsThisMonth)}  icon={BarChart3}     iconBg="bg-primary-subtle"  iconColor="text-primary" />
    </div>
  );
}
