// RESPONSIBILITY: Renders ManagerInquiriesContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';
import ManagerToast from '@/components/ui/manager_toast/ManagerToast';
import ManagerHeader from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader';
import ManagerInquiriesBulkMessageModal from '@/app/frontend_manager/manager_inquiries/manager_inquiries_components/manager_inquiries_bulk_message_modal/ManagerInquiriesBulkMessageModal';
import ManagerInquiriesConvertLeadModal from '@/app/frontend_manager/manager_inquiries/manager_inquiries_components/manager_inquiries_convert_lead_modal/ManagerInquiriesConvertLeadModal';
import ManagerInquiriesKPIs from '@/app/frontend_manager/manager_inquiries/manager_inquiries_components/manager_inquiries_kpis/ManagerInquiriesKPIs';
import ManagerInquiriesMessageModal from '@/app/frontend_manager/manager_inquiries/manager_inquiries_components/manager_inquiries_message_modal/ManagerInquiriesMessageModal';
import ManagerInquiriesModal from '@/app/frontend_manager/manager_inquiries/manager_inquiries_components/manager_inquiries_modal/ManagerInquiriesModal';
import ManagerInquiriesTable from '@/app/frontend_manager/manager_inquiries/manager_inquiries_components/manager_inquiries_table/ManagerInquiriesTable';
import ManagerInquiriesToolbar from '@/app/frontend_manager/manager_inquiries/manager_inquiries_components/manager_inquiries_toolbar/ManagerInquiriesToolbar';
import { useManagerInquiriesLogic } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_hooks/useManagerInquiriesLogic';


/** @description Renders the ManagerInquiriesContent component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (10 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export function ManagerInquiriesContent() {
  const t = useTranslations('MANAGER_INQUIRIES');

  const { toast, hideToast, msgModal, closeMsg, showToast, bulkMsgModal, closeBulkMsg, clearSelection } = useManagerInquiriesLogic();

  return (
    <div className="min-h-full pb-10">
      <ManagerHeader data-testid="manager_inquiries-managerinquiriescontent-managerheader-1" title={t("COPY_INQUIRIES")} subtitle={t("COPY_TRACK_FOLLOW_UP_CONVERT_INQUIRIES_INTO_MEMBERS")} />
      <div className="p-6 space-y-5">
        <ManagerInquiriesKPIs />
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
          <ManagerInquiriesToolbar />
          <ManagerInquiriesTable />
        </div>
      </div>

      <ManagerInquiriesModal />
      <ManagerInquiriesConvertLeadModal />

      {msgModal?.open && (
        <ManagerInquiriesMessageModal data-testid="manager_inquiries-managerinquiriescontent-managerinquiriesmessagemodal-2"
          open={msgModal.open}
          type={msgModal.type}
          recipient={msgModal.recipient}
          message={msgModal.message}
          onClose={closeMsg}
        />
      )}

      {bulkMsgModal?.open && (
        <ManagerInquiriesBulkMessageModal data-testid="manager_inquiries-managerinquiriescontent-managerinquiriesbulkmessagemodal-3"
          open={bulkMsgModal.open}
          type={bulkMsgModal.type}
          recipients={bulkMsgModal.recipients}
          onClose={() => { closeBulkMsg(); clearSelection(); }}
        />
      )}

      {toast && <ManagerToast data-testid="manager_inquiries-managerinquiriescontent-managertoast-4" message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}
