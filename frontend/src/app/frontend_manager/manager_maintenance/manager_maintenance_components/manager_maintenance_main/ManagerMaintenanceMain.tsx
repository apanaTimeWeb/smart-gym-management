// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import ManagerHeader from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader';
import ManagerMaintenanceContent from '@/app/frontend_manager/manager_maintenance/manager_maintenance_components/manager_maintenance_content/ManagerMaintenanceContent';
import { ManagerMaintenanceLogIssueModal } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_components/manager_maintenance_log_issue_modal/ManagerMaintenanceLogIssueModal';
import { useManagerMaintenanceLogic } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_hooks/useManagerMaintenanceLogic';

/**
 * @description Orchestrates the maintenance route shell, modal lifecycle, and module-owned data hook without rendering the feature list internals.
 * @dependencies Uses only the maintenance feature hook plus zero-business ManagerHeader and the module-owned create modal/content components.
 * @edge-case Keeps retry, empty, error, and mutation states delegated to the content component while preserving modal open/close behavior.
 */
export default function ManagerMaintenanceMain() {
  const t = useTranslations('MANAGER_MAINTENANCE');
  const locale = useLocale();
  const { tickets, isPending, isError, error, reload, createTicket, resolveTicket, isResolving } = useManagerMaintenanceLogic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-full pb-10">
      <ManagerHeader data-testid="manager_maintenance-managermaintenancemain-managerheader-1" title={t("COPY_FACILITY_MAINTENANCE")} subtitle={t("COPY_TRACK_EQUIPMENT_REPAIRS_FACILITY_ISSUES")} action={{ label: t("COPY_LOG_ISSUE"), onClick: () => setIsModalOpen(true), icon: <Plus size={18} strokeWidth={2}/> }} />
      <div className="p-4 sm:p-6">
        <ManagerMaintenanceContent tickets={tickets} isPending={isPending} isError={isError} error={error} reload={reload} resolveTicket={resolveTicket} isResolving={isResolving} locale={locale} />
      </div>
      {isModalOpen && <ManagerMaintenanceLogIssueModal data-testid="manager_maintenance-managermaintenancemain-managermaintenancelogissuemodal-2" onClose={() => setIsModalOpen(false)} onSubmit={createTicket} />}
    </div>
  );
}
