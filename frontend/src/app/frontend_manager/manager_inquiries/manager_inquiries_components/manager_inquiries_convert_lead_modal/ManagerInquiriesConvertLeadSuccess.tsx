// RESPONSIBILITY: Renders ManagerInquiriesConvertLeadSuccess's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { CheckCircle2, Phone } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { ManagerInquiriesUrlConfig } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_url_config';
import { ManagerInquiriesFormatCurrency, ManagerInquiriesFormatDate } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_utils/ManagerInquiriesFormatters';
import type { ManagerInquiriesConvertLeadSuccessProps } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_types/ManagerInquiriesConvertLeadSuccessTypes';




/** @description Renders the ManagerInquiriesConvertLeadSuccess component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerInquiriesConvertLeadSuccess({ successData, closeConvert }: ManagerInquiriesConvertLeadSuccessProps) {
  const t = useTranslations('MANAGER_INQUIRIES');
  const locale = useLocale();

  const handleSendWhatsApp = () => {
    if (!successData || !successData.phone) return;
    const phone = successData.phone.replace(/\D/g, '');
    const aadhaarLine = successData.aadhaar ? `\n• *Aadhaar No:* ${successData.aadhaar}` : '';
    const message = t('TEXT_WHATSAPP_ADMISSION_MESSAGE', {
      name: successData.name,
      gymName: ManagerEnvConfig.gymName,
      gymId: successData.gymId,
      planName: successData.planName,
      aadhaarLine,
      joinDate: ManagerInquiriesFormatDate(successData.joinDate),
      expiryDate: ManagerInquiriesFormatDate(successData.expiryDate),
      paidAmount: ManagerInquiriesFormatCurrency(successData.paidAmount, ManagerEnvConfig.currencyCode, locale),
      pendingAmount: ManagerInquiriesFormatCurrency(successData.pendingAmount, ManagerEnvConfig.currencyCode, locale),
    });
    
    window.open(`${ManagerInquiriesUrlConfig.INTEGRATIONS.WHATSAPP_WEB_BASE}/91${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-overlay-backdrop z-40 flex items-center justify-center p-4">
      <div role="dialog" aria-modal="true" aria-labelledby="manager-inquiries-convert-lead-success-title" className="bg-card rounded-2xl shadow-card w-full max-w-md overflow-hidden border-2 border-success motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
        <div className="px-8 py-8 flex flex-col items-center text-center">
          <div data-testid="manager_inquiries-convert-lead-modal-status-success" className="w-20 h-20 bg-success-bg text-success rounded-full flex items-center justify-center mb-5 border border-success">
            <CheckCircle2 size={18} strokeWidth={2} aria-hidden="true" />
          </div>
          <h3 id="manager-inquiries-convert-lead-success-title" className="text-2xl font-black text-primary mb-2 tracking-tight">{t("COPY_ADMISSION_SUCCESSFUL")}</h3>
          <p className="text-secondary mb-8 text-sm">
            <span className="font-semibold text-primary">{successData.name}</span>{t("COPY_NOW_MEMBER_GYM_ID")}<strong className="text-success">{successData.gymId}</strong>
          </p>
          
          <div className="w-full space-y-3 mb-8 text-left">
            <div className="bg-input p-4 rounded-xl border border-border">
              <p className="text-sm font-semibold text-primary mb-3 text-center">{t("COPY_SHARE_ADMISSION_DETAILS_MEMBER")}</p>
              <button data-testid="manager_inquiries-convert-lead-modal-send-whats-app"
                onClick={handleSendWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-success hover:bg-success text-on-success py-3 rounded-xl font-bold motion-safe:transition-all hover:shadow-card hover:shadow-card motion-safe:active:scale-95 motion-safe:duration-base ease-in-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
              >
                <Phone size={18} strokeWidth={2} aria-hidden="true" />{t("COPY_SEND_WELCOME_WHATSAPP")}</button>
            </div>
          </div>

          <button data-testid="manager_inquiries-convert-lead-modal-convert"
            onClick={closeConvert}
            className="px-8 py-2.5 text-sm font-bold rounded-xl border border-border text-secondary hover:bg-primary-subtle hover:text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
          >{t("COPY_DONE_CLOSE")}</button>
        </div>
      </div>
    </div>
  );
}
