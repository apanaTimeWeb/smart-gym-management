// RESPONSIBILITY: Renders ManagerHrStaffProfileModal's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { X, Edit2, Phone, Mail, Calendar, MapPin, IndianRupee, Hash } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import ManagerTooltip from '@/components/ui/manager_tooltip/ManagerTooltip';
import { useManagerHrLogic } from '@/app/frontend_manager/manager_hr/manager_hr_hooks/useManagerHrLogic';
import { ManagerHrFormatCurrency, ManagerHrFormatDate } from '@/app/frontend_manager/manager_hr/manager_hr_utils/ManagerHrFormatters';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';


/** @description Renders the ManagerHrStaffProfileModal component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export default function ManagerHrStaffProfileModal() {
  const t = useTranslations('MANAGER_HR');
  const locale = useLocale();

  const { viewProfileData, setViewProfileData, openEdit } = useManagerHrLogic();

  if (!viewProfileData) return null;
  const s = viewProfileData;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay-backdrop backdrop-blur-sm">
      <div className="rounded-2xl shadow-dialog w-full max-w-lg overflow-hidden bg-overlay border-2 border-border" role="dialog" aria-modal="true" aria-labelledby="managerhrstaffprofilemodal-dialog-title">
        <div className="relative h-24 bg-primary text-on-primary">
          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "absolute top-4 right-4 p-2 rounded-full bg-overlay-backdrop hover:bg-overlay-backdrop motion-safe:transition-all text-on-primary motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_hr-manager-hr-staff-profile-modal-button-action" 
            type="button"
            aria-label={t("COPY_CLOSE_STAFF_FORM")}
            onClick={() => setViewProfileData(null)} 
            
          >
            <X size={18} strokeWidth={2}/>
          </button>
        </div>
        
        <div className="px-8 pb-8 relative">
          <div className="flex justify-between items-end -mt-10 mb-6">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center font-bold text-4xl bg-overlay border-4 border-card text-primary shadow-card">
              {(s.name || '?').charAt(0).toUpperCase()}
            </div>
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-2 px-4 py-2 bg-primary-subtle hover:bg-primary-subtle text-primary font-semibold rounded-xl motion-safe:transition-all mb-2 motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_hr-manager-hr-staff-profile-modal-button-edit" 
              onClick={() => { setViewProfileData(null); openEdit(s); }}
              
            >
              <Edit2 size={18} strokeWidth={2}/>{t("COPY_EDIT_PROFILE")}</button>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-primary" id="managerhrstaffprofilemodal-dialog-title">{s.name}</h3>
            <p className="text-sm font-medium text-primary mt-1 px-3 py-1 bg-primary-subtle inline-block rounded-md">{s.role}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
            <div className="flex items-start gap-3">
              <Phone size={18} strokeWidth={2} className="text-secondary mt-0.5"/>
              <div>
                <p className="text-xs text-secondary mb-0.5">{t("COPY_PHONE_1")}</p>
                <p className="text-sm font-semibold text-primary">{s.phone || t('COPY_N')}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Mail size={18} strokeWidth={2} className="text-secondary mt-0.5"/>
              <div>
                <p className="text-xs text-secondary mb-0.5">{t("COPY_EMAIL")}</p>
                <ManagerTooltip content={s.email || 'N/A'}><p className="text-sm font-semibold text-primary truncate max-w-40">{s.email || t('COPY_N')}</p></ManagerTooltip>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Calendar size={18} strokeWidth={2} className="text-secondary mt-0.5" data-testid="manager_hr-managerhrstaffprofilemodal-interactive"/>
              <div>
                <p className="text-xs text-secondary mb-0.5">{t("COPY_JOIN_DATE_3")}</p>
                <p className="text-sm font-semibold text-primary">{s.joinDate ? ManagerHrFormatDate(s.joinDate) : t('COPY_N')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <IndianRupee size={18} strokeWidth={2} className="text-secondary mt-0.5"/>
              <div>
                <p className="text-xs text-secondary mb-0.5">{t("COPY_MONTHLY_SALARY")}</p>
                <p className="text-sm font-bold text-success">{ManagerHrFormatCurrency(s.salary || 0, ManagerEnvConfig.currencyCode, locale)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <IndianRupee size={18} strokeWidth={2} className="text-danger mt-0.5"/>
              <div>
                <p className="text-xs text-secondary mb-0.5">{t("COPY_ADVANCE_BALANCE_1")}</p>
                <p className="text-sm font-bold text-danger">{ManagerHrFormatCurrency(s.advanceSalary || 0, ManagerEnvConfig.currencyCode, locale)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <IndianRupee size={18} strokeWidth={2} className="text-warning mt-0.5"/>
              <div>
                <p className="text-xs text-secondary mb-0.5">{t("COPY_CURRENT_DUE")}</p>
                <p className="text-sm font-bold text-warning">{ManagerHrFormatCurrency(s.currentDue || 0, ManagerEnvConfig.currencyCode, locale)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Hash size={18} strokeWidth={2} className="text-secondary mt-0.5"/>
              <div>
                <p className="text-xs text-secondary mb-0.5">{t("COPY_AADHAAR_NO")}</p>
                <p className="text-sm font-semibold text-primary">{s.aadhaar || t('COPY_N')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-5 h-5 flex items-center justify-center font-bold text-xs text-secondary mt-0.5 border border-secondary rounded-sm">{t("COPY_UPI_2")}</span>
              <div>
                <p className="text-xs text-secondary mb-0.5">{t("COPY_UPI_ID")}</p>
                <p className="text-sm font-semibold text-primary">{s.upiId || t('COPY_N')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:col-span-2">
              <MapPin size={18} strokeWidth={2} className="text-secondary mt-0.5"/>
              <div>
                <p className="text-xs text-secondary mb-0.5">{t("COPY_ADDRESS")}</p>
                <p className="text-sm font-semibold text-primary whitespace-pre-line">{s.address || t('COPY_N')}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border flex justify-between items-center">
             <div>
               <p className="text-xs text-secondary mb-1">{t("COPY_STATUS_1")}</p>
               <div className="flex items-center gap-2">
                 <div className={`w-2.5 h-2.5 rounded-full ${s.isActive ? 'bg-success text-on-success' : 'bg-danger text-on-danger'}`} data-testid="manager_hr-managerhrstaffprofilemodal-status-badge-1"></div>
                 <span className={`text-sm font-bold ${s.isActive ? 'text-success' : 'text-danger'}`}>{s.isActive ? t('COPY_ACTIVE_STAFF') : t('COPY_SUSPENDED')}</span>
               </div>
             </div>
             <div>
               <p className="text-xs text-secondary mb-1">{t("COPY_GENDER_2")}</p>
               <p className="text-sm font-semibold text-primary capitalize">{s.gender?.toLowerCase() || t('COPY_N')}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
