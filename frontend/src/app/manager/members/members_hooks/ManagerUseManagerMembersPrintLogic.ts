// DATA FLOW: Manager module state/API data → useManagerMembersPrintLogic → owning Manager UI components.
'use client';
import { useCallback } from 'react';
import { formatCurrency } from '@/app/manager/manager_layout/manager_utils/ManagerFormatCurrency';
import { formatDate } from '@/lib/formatters';
import { WhatsAppFormatter } from '@/lib/whatsapp_formatter';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { GYM_DETAILS } from '@/app/manager/manager_infrastructure/ManagerGymIdentity';
import { useManagerMembersUiStore } from '@/app/manager/members/members_store/ManagerUseManagerMembersUiStore';
import { ManagerMembersUrlConfig } from '@/app/manager/members/members_url_config';
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';
import type { PaymentSnapshot } from '@/app/manager/members/members_types/ManagerMembersSnapshotTypes';
import type { Member } from '@/app/manager/members/members_types/ManagerMembersTypes';
import { useLocale } from "next-intl";

/** Manages UseMembersPrintLogic for the Manager module. */


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerMembersPrintLogic(
  selectedMember: Member | null,
  showToast: (msg: string, t: ManagerToastType) => void
) {
    const locale = useLocale();
  const setPrintData = useManagerMembersUiStore((state) => state.setPrintData);

  const handlePrint = useCallback((p: PaymentSnapshot) => {
    if (!selectedMember) return;
    const m = selectedMember;
    setPrintData({
      gymName: GYM_DETAILS.name, gymPhone: GYM_DETAILS.phone,
      receiptNo: p.invoiceNumber,
      date: formatDate(p.paidAt),
      customerName: m.name,
      items: [{ name: `Membership - ${m.plan?.name || ''}`, price: p.amount, amount: p.amount }],
      total: p.amount, paymentMethod: p.method });
    if (typeof window !== 'undefined') setTimeout(() => window.print(), 100);
  }, [selectedMember]);

  const handleSharePaymentWhatsApp = useCallback((p: PaymentSnapshot) => {
    if (!selectedMember) return;
    const m = selectedMember;
    
    const waText = WhatsAppFormatter.formatReceipt({
      title: GYM_DETAILS.name,
      subtitle: 'Payment Receipt',
      date: formatDate(p.paidAt),
      customerInfo: {
        'Member': m.name,
        'Invoice': p.invoiceNumber },
      sections: [
        {
          items: {
            'Membership': m.plan?.name || 'Standard',
            'Amount': formatCurrency(p.amount, ManagerEnvConfig.currencyCode, locale),
            'Method': p.method
          }
        },
        {
          items: {
            'Status': p.status
          }
        }
      ],
      footer: 'Thank you for your payment!'
    });

    window.open(`${ManagerMembersUrlConfig.INTEGRATIONS.WHATSAPP_WEB_BASE}/91${m.phone?.replace(/\D/g, '') || ''}?text=${encodeURIComponent(waText)}`, '_blank');
  }, [selectedMember, showToast]);

  return {
    printData: useManagerMembersUiStore((state) => state.printData),
    setPrintData,
    handlePrint,
    handleSharePaymentWhatsApp
  };
}
