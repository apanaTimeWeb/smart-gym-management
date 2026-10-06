// RESPONSIBILITY: Renders ManagerMembersContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import ManagerToast from '@/components/ui/manager_toast/ManagerToast';
import ManagerHeader from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader';
import ManagerMembersKPIs from '@/app/frontend_manager/manager_members/manager_members_components/manager_members_kpis/ManagerMembersKPIs';
import ManagerMembersMemberProfile from '@/app/frontend_manager/manager_members/manager_members_components/manager_members_member_profile/ManagerMembersMemberProfile';
import ManagerMembersMessageModal from '@/app/frontend_manager/manager_members/manager_members_components/manager_members_message_modal/ManagerMembersMessageModal';
import ManagerMembersTable from '@/app/frontend_manager/manager_members/manager_members_components/manager_members_table/ManagerMembersTable';
import ManagerMembersThermalReceipt from '@/app/frontend_manager/manager_members/manager_members_components/manager_members_thermal_receipt/ManagerMembersThermalReceipt';
import ManagerMembersToolbar from '@/app/frontend_manager/manager_members/manager_members_components/manager_members_toolbar/ManagerMembersToolbar';
import { useManagerMembersLogic } from '@/app/frontend_manager/manager_members/manager_members_hooks/useManagerMembersLogic';
import { ManagerMembersUrlConfig } from '@/app/frontend_manager/manager_members/manager_members_url_config';

/**
 * @description Renders/orchestrates the ManagerMembersContent user interface for the members module without owning sibling business logic.
 * @dependencies @/components/ui/manager_toast/ManagerToast; @/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader; @/app/frontend_manager/manager_members/manager_members_components/manager_members_message_modal/ManagerMembersMessageModal; @/app/frontend_manager/manager_members/manager_members_components/manager_members_table/ManagerMembersTable; @/app/frontend_manager/manager_members/manager_members_components/manager_members_thermal_receipt/ManagerMembersThermalReceipt
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const ManagerMembersModal = dynamic(() => import('@/app/frontend_manager/manager_members/manager_members_components/manager_members_modal/ManagerMembersModal'), { ssr: false });

const ManagerMembersRenewModal = dynamic(() => import('@/app/frontend_manager/manager_members/manager_members_components/manager_members_renew_modal/ManagerMembersRenewModal'), { ssr: false });

const ManagerMembersAddPaymentModal = dynamic(() => import('@/app/frontend_manager/manager_members/manager_members_components/manager_members_payment_modal/ManagerMembersAddPaymentModal'), { ssr: false });

/** @description Renders the ManagerMembersContent component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (10 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export function ManagerMembersContent() {
  const t = useTranslations('MANAGER_MEMBERS');

  const { toast, hideToast, msgModal, closeMsg, showToast, printData, selectedMember } = useManagerMembersLogic();

  return (
    <div className="min-h-full pb-10">
      <div className="print-hide">
        {!selectedMember ? (
          <>
            <ManagerHeader data-testid="manager_members-managermemberscontent-managerheader-1" title={t("COPY_MEMBER_MANAGEMENT")} subtitle={t("COPY_MANAGE_GYM_MEMBERS_PROFILES_SUBSCRIPTIONS")} />
            <div className="p-6 space-y-5">
              <ManagerMembersKPIs />
              <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
                <ManagerMembersToolbar />
                <ManagerMembersTable />
              </div>
            </div>
          </>
        ) : (
          <ManagerMembersMemberProfile />
        )}

        <ManagerMembersModal />
        <ManagerMembersRenewModal />
        <ManagerMembersAddPaymentModal />

        {msgModal?.open && (
          <ManagerMembersMessageModal data-testid="manager_members-managermemberscontent-managermembersmessagemodal-2" whatsappUrlBuilder={(phone, message) => `${ManagerMembersUrlConfig.INTEGRATIONS.WHATSAPP_WEB_BASE}/${phone}?text=${encodeURIComponent(message)}`} 
            open={msgModal.open}
            type={msgModal.type}
            recipient={msgModal.recipient}
            message={msgModal.message}
            onClose={closeMsg} 
          />
        )}

        {toast && <ManagerToast data-testid="manager_members-managermemberscontent-managertoast-3" message={toast.message} type={toast.type} onClose={hideToast} />}
      </div>

      {printData && (
        <ManagerMembersThermalReceipt data={printData} />
      )}
    </div>
  );
}
