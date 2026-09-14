import { formatDate } from '@/lib/formatters';
import { useCallback, useState } from 'react';
import type { Member } from '@/app/manager/members/members_types/ManagerMembersTypes';
import type { PaymentSnapshot } from '@/app/manager/members/members_types/ManagerMembersSnapshotTypes';
import type { ManagerReceiptData } from '@/app/manager/manager_components/ManagerFeedback/ManagerThermalReceipt';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { GYM_DETAILS } from '@/app/manager/manager_utils/ManagerSharedConstants';
import { formatCurrency } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';
import { WhatsAppFormatter } from '@/lib/whatsapp_formatter';

export function useManagerMembersPrintLogic(
  selectedMember: Member | null,
  showToast: (msg: string, t: ToastType) => void
) {
  const [printData, setPrintData] = useState<ManagerReceiptData | null>(null);

  const handlePrint = useCallback((p: PaymentSnapshot) => {
    if (!selectedMember) return;
    const m = selectedMember;
    setPrintData({
      gymName: GYM_DETAILS.name, gymPhone: GYM_DETAILS.phone,
      receiptNo: p.invoiceNumber,
      date: formatDate(p.paidAt),
      customerName: m.name,
      items: [{ name: `Membership - ${m.plan?.name || ''}`, price: p.amount, amount: p.amount }],
      total: p.amount, paymentMethod: p.method,
    });
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
        'Invoice': p.invoiceNumber,
      },
      sections: [
        {
          items: {
            'Membership': m.plan?.name || 'Standard',
            'Amount': formatCurrency(p.amount),
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

    window.open(`https://wa.me/91${m.phone?.replace(/\D/g, '') || ''}?text=${encodeURIComponent(waText)}`, '_blank');
    showToast('Receipt opened in WhatsApp', 'success');
  }, [selectedMember, showToast]);

  return {
    printData,
    setPrintData,
    handlePrint,
    handleSharePaymentWhatsApp
  };
}
