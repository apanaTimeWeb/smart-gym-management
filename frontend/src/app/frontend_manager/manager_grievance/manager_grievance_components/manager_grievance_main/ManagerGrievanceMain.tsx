// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ManagerHeader from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader';
import ManagerGrievanceContent from '@/app/frontend_manager/manager_grievance/manager_grievance_components/manager_grievance_content/ManagerGrievanceContent';
import { ManagerGrievanceLogComplaintModal } from '@/app/frontend_manager/manager_grievance/manager_grievance_components/manager_grievance_log_complaint_modal/ManagerGrievanceLogComplaintModal';
import { useManagerGrievanceLogic } from '@/app/frontend_manager/manager_grievance/manager_grievance_hooks/useManagerGrievanceLogic';
import { useManagerGrievanceResolution } from '@/app/frontend_manager/manager_grievance/manager_grievance_hooks/useManagerGrievanceResolution';

/**
 * @description Orchestrates the grievance route shell, search state, create-modal lifecycle, and feature hooks while delegating list/resolution rendering to a child view.
 * @dependencies Uses only the grievance feature hooks and zero-business ManagerHeader plus the module-owned content/modal components.
 * @edge-case Preserves the create flow while resolution draft protection and retry/empty/error behavior remain inside the documented hook/content boundary.
 */
export default function ManagerGrievanceMain() {
  const t = useTranslations('MANAGER_GRIEVANCE');
  const { tickets, search, setSearch, isPending, isError, error, reload, createTicket, resolveTicket, isResolving } = useManagerGrievanceLogic();
  const resolution = useManagerGrievanceResolution({ resolveTicket, isResolving });
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-full pb-10">
      <ManagerHeader data-testid="manager_grievance-managergrievancemain-managerheader-1" title={t("COPY_MEMBER_GRIEVANCES")} subtitle={t("COPY_MANAGE_RESOLVE_MEMBER_COMPLAINTS_LOCALLY")} action={{ label: t("COPY_LOG_COMPLAINT"), onClick: () => setIsModalOpen(true), icon: <Plus size={18} strokeWidth={2}/> }} />
      <div className="p-4 sm:p-6 space-y-5">
        <div className="relative w-full max-w-md">
          <Search size={18} strokeWidth={2} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"/>
          <label htmlFor="manager-grievance-search" className="sr-only">{t("COPY_SEARCH_COMPLAINTS")}</label>
          <input className="w-full min-h-11 pl-10 pr-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="manager_grievance-manager-grievance-main-manager-grievance-search" id="manager-grievance-search" type="search" placeholder={t("COPY_SEARCH_MEMBER_NAME_ISSUE")} value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
        <ManagerGrievanceContent tickets={tickets} isPending={isPending} isError={isError} error={error} reload={reload} isResolving={isResolving} resolvingTicketId={resolution.resolvingTicketId} resolutionNote={resolution.resolutionNote} setResolutionNote={resolution.setResolutionNote} startResolution={resolution.startResolution} cancelResolution={resolution.cancelResolution} submitResolution={resolution.submitResolution} />
      </div>
      {isModalOpen && <ManagerGrievanceLogComplaintModal data-testid="manager_grievance-managergrievancemain-managergrievancelogcomplaintmodal-2" onClose={() => setIsModalOpen(false)} onSubmit={createTicket} />}
    </div>
  );
}
