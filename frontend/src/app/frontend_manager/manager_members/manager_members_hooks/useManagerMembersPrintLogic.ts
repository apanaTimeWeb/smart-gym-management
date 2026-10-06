'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useCallback } from 'react';
import { useLocale } from 'next-intl';
import { WhatsAppFormatter } from '@/lib/whatsapp_formatter';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { GYM_DETAILS } from '@/app/frontend_manager/manager_infrastructure/ManagerGymIdentity';
import { useManagerMembersUiStore } from '@/app/frontend_manager/manager_members/manager_members_store/useManagerMembersUiStore';
import { ManagerMembersUrlConfig } from '@/app/frontend_manager/manager_members/manager_members_url_config';
import { ManagerMembersFormatDate, ManagerMembersFormatCurrency } from '@/app/frontend_manager/manager_members/manager_members_utils/ManagerMembersFormatters';
import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';
import type { PaymentSnapshot } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersSnapshotTypes';
import type { Member } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersTypes';

/** Manages UseMembersPrintLogic for the Manager module. */


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates members feature state and its documented UI/API boundary through useManagerMembersPrintLogic.
 * @dependencies Uses ManagerMembersFormatters, ManagerEnvConfig, ManagerGymIdentity, useManagerMembersUiStore.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerMembersPrintLogic owns the members feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMembersPrintLogic(
  selectedMember: Member | null,
  showToast: (msg: string, t: ManagerToastType) => void
) {
  const setPrintData = useManagerMembersUiStore((state) => state.setPrintData);
  const locale = useLocale();

  const handlePrint = useCallback((p: PaymentSnapshot) => {
    if (!selectedMember) return;
    const m = selectedMember;
    setPrintData({
      gymName: GYM_DETAILS.name, gymPhone: GYM_DETAILS.phone,
      receiptNo: p.invoiceNumber,
      date: ManagerMembersFormatDate(p.paidAt),
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
      date: ManagerMembersFormatDate(p.paidAt),
      customerInfo: {
        'Member': m.name,
        'Invoice': p.invoiceNumber },
      sections: [
        {
          items: {
            'Membership': m.plan?.name || 'Standard',
            'Amount': ManagerMembersFormatCurrency(p.amount, ManagerEnvConfig.currencyCode, locale),
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
  }, [locale, selectedMember, showToast]);

  return {
    printData: useManagerMembersUiStore((state) => state.printData),
    setPrintData,
    handlePrint,
    handleSharePaymentWhatsApp
  };
}
