'use client';
// RESPONSIBILITY: Renders the ManagerMembersContent sub-view extracted from ManagerMembersMain; owns only this presentation responsibility.
// RESPONSIBILITY: Entry point component for the members module that sets up hook-based state facades and layout.
import { ManagerMembersUrlConfig } from '@/app/manager/members/members_url_config';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import ManagerToast from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import ManagerMembersMessageModal from '@/app/manager/members/members_components/ManagerMembersMessageModal/ManagerMembersMessageModal';
import ManagerMembersThermalReceipt from '@/app/manager/members/members_components/ManagerMembersThermalReceipt/ManagerMembersThermalReceipt';
import { useManagerMembersLogic  } from '@/app/manager/members/members_hooks/ManagerUseManagerMembersLogic';
import ManagerMembersKPIs from '@/app/manager/members/members_components/MembersKPIs/ManagerMembersKPIs';
import ManagerMembersToolbar from '@/app/manager/members/members_components/MembersToolbar/ManagerMembersToolbar';
import ManagerMembersTable from '@/app/manager/members/members_components/ManagerMembersTable/ManagerMembersTable';
import ManagerMemberProfile from '@/app/manager/members/members_components/MemberProfile/ManagerMemberProfile';
import dynamic from 'next/dynamic';
const ManagerMembersModal = dynamic(() => import('@/app/manager/members/members_components/ManagerMembersModal/ManagerMembersModal'), { ssr: false });

const ManagerRenewModal = dynamic(() => import('@/app/manager/members/members_components/ManagerRenewModal/ManagerRenewModal'), { ssr: false });

const ManagerAddPaymentModal = dynamic(() => import('@/app/manager/members/members_components/ManagerAddPaymentModal'), { ssr: false });

export function ManagerMembersContent() {
  const { toast, hideToast, msgModal, closeMsg, showToast, printData, selectedMember } = useManagerMembersLogic();

  return (
    <div className="min-h-full pb-10">
      <div className="print-hide">
        {!selectedMember ? (
          <>
            <ManagerHeader title="Member Management" subtitle="Manage gym members, profiles, and subscriptions" />
            <div className="p-6 space-y-5">
              <ManagerMembersKPIs />
              <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
                <ManagerMembersToolbar />
                <ManagerMembersTable />
              </div>
            </div>
          </>
        ) : (
          <ManagerMemberProfile />
        )}

        <ManagerMembersModal />
        <ManagerRenewModal />
        <ManagerAddPaymentModal />

        {msgModal?.open && (
          <ManagerMembersMessageModal whatsappUrlBuilder={(phone, message) => `${ManagerMembersUrlConfig.INTEGRATIONS.WHATSAPP_WEB_BASE}/${phone}?text=${encodeURIComponent(message)}`} 
            open={msgModal.open}
            type={msgModal.type}
            recipient={msgModal.recipient}
            message={msgModal.message}
            onClose={closeMsg} 
          />
        )}

        {toast && <ManagerToast message={toast.message} type={toast.type} onClose={hideToast} />}
      </div>

      {printData && (
        <ManagerMembersThermalReceipt data={printData} />
      )}
    </div>
  );
}
