// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { useState } from 'react';
import { MessageCircle, Mail, Snowflake, Stethoscope, Ban, UserCheck } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { MANAGER_MEMBERS_STATUS_FROZEN } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersConstants';
import { MEMBER_SUSPENDED_STATUS } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersSharedConstants';
import { useManagerMembersLogic } from '@/app/frontend_manager/manager_members/manager_members_hooks/useManagerMembersLogic';
import { useFetchTrainers } from '@/app/frontend_manager/manager_members/manager_members_hooks/useManagerMembersQueries';
import { ManagerMembersFormatCurrency } from '@/app/frontend_manager/manager_members/manager_members_utils/ManagerMembersFormatters';


/** @description Renders the ManagerMembersProfileOverview component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (5 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerMembersProfileOverview() {
  const t = useTranslations('MANAGER_MEMBERS');
  const locale = useLocale();

  const { selectedMember, openMsg, freezeMember, toggleSuspend, assignTrainer } = useManagerMembersLogic();
  const { data: trainersData } = useFetchTrainers();
  const trainers = (trainersData || []) as Array<{ id: string; name: string; role?: string }>;
  const [isAssigningTrainer, setIsAssigningTrainer] = useState(false);
  const [selectedTrainerId, setSelectedTrainerId] = useState('');
  const [isPT, setIsPT] = useState(false);

 if (!selectedMember) return null;

  const totalAmount = (selectedMember.paidAmount || 0) + (selectedMember.pendingAmount || 0);
  const dues = selectedMember.pendingAmount > 0 ? selectedMember.pendingAmount : 0;
  const advance = selectedMember.advanceAmount || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider opacity-80">{t("COPY_MEMBER_SUMMARY")}</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex flex-col p-4 bg-page rounded-xl border border-border shadow-card">
              <span className="text-xs text-secondary font-medium mb-1">{t("COPY_TOTAL_PLAN_AMOUNT_1")}</span>
              <span className="text-lg font-bold text-primary">{ManagerMembersFormatCurrency(totalAmount, ManagerEnvConfig.currencyCode, locale)}</span>
            </div>
            <div data-testid="manager_members-member-profile-overview-status-membership" className="flex flex-col p-4 bg-success-bg rounded-xl border border-success shadow-card">
              <span className="text-xs text-success font-medium mb-1">{t("COPY_TOTAL_PAID_1")}</span>
              <span className="text-lg font-bold text-success">{ManagerMembersFormatCurrency(selectedMember.paidAmount || 0, ManagerEnvConfig.currencyCode, locale)}</span>
            </div>
            {dues > 0 && (
              <div data-testid="manager_members-member-profile-overview-status-joined" className="flex flex-col p-4 bg-danger-bg rounded-xl border border-border shadow-card">
                <span className="text-xs text-danger font-medium mb-1">{t("COPY_PENDING_DUES")}</span>
                <span className="text-lg font-bold text-danger">{ManagerMembersFormatCurrency(dues, ManagerEnvConfig.currencyCode, locale)}</span>
              </div>
            )}
            {advance > 0 && (
              <div className="flex flex-col p-4 bg-primary-subtle rounded-xl border border-border shadow-card">
                <span className="text-xs text-primary font-medium mb-1">{t("COPY_ADVANCE_PAYMENT")}</span>
                <span className="text-lg font-bold text-primary">{ManagerMembersFormatCurrency(advance, ManagerEnvConfig.currencyCode, locale)}</span>
              </div>
            )}
            {selectedMember.assignedTrainerId && (
              <div className="flex flex-col p-4 bg-page rounded-xl border border-border shadow-card">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-secondary font-medium">{t("COPY_ASSIGNED_TRAINER")}</span>
                  <UserCheck size={18} strokeWidth={2} className="text-primary"/>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-primary truncate">{selectedMember.assignedTrainerName}</span>
                  {selectedMember.isPT && (
                    <span className="text-xs font-semibold px-1.5 py-0.5 bg-primary-subtle text-primary rounded-full border border-border shrink-0">{t("COPY_PT")}</span>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {selectedMember.medicalHistory && (
            <div data-testid="manager_members-member-profile-overview-status-trainer" className="flex flex-col gap-2 p-4 bg-warning-bg rounded-xl border border-warning shadow-card">
              <div className="flex items-center gap-2 text-warning">
                <Stethoscope size={18} strokeWidth={2}/>
                <span className="text-xs font-semibold uppercase tracking-wider">{t("COPY_MEDICAL_HISTORY_NOTES")}</span>
              </div>
              <p className="text-sm text-primary leading-relaxed">
                {selectedMember.medicalHistory}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider opacity-80">{t("COPY_QUICK_ACTIONS")}</h3>
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center justify-center gap-2 p-3 text-sm font-semibold text-on-success rounded-xl motion-safe:transition-all motion-safe:hover:-translate-y-0.5 hover:shadow-card bg-success motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-overview-button-message" 
              onClick={() => openMsg(selectedMember, 'whatsapp')} 
               
            >
              <MessageCircle size={18} strokeWidth={2}/>{t("COPY_WHATSAPP_3")}</button>
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center justify-center gap-2 p-3 text-sm font-semibold text-on-info rounded-xl motion-safe:transition-all motion-safe:hover:-translate-y-0.5 hover:shadow-card bg-info motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-overview-button-whatsapp" 
              onClick={() => openMsg(selectedMember, 'email')} 
               
            >
              <Mail size={18} strokeWidth={2}/>{t("COPY_EMAIL_3")}</button>
            {selectedMember.status !== MANAGER_MEMBERS_STATUS_FROZEN ? (
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center justify-center gap-2 p-3 text-sm font-semibold text-on-info bg-info border border-info rounded-xl motion-safe:transition-all motion-safe:hover:-translate-y-0.5 hover:shadow-card motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-button-freeze-1" 
                onClick={() => freezeMember(true)} 
                 
              >
                <Snowflake size={18} strokeWidth={2}/>{t("COPY_FREEZE")}</button>
            ) : (
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center justify-center gap-2 p-3 text-sm font-semibold text-on-success bg-success border border-success rounded-xl motion-safe:transition-all motion-safe:hover:-translate-y-0.5 hover:shadow-card motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-button-freeze-2" 
                onClick={() => freezeMember(false)} 
                 
              >{t("COPY_UNFREEZE")}</button>
            )}
            {(() => { if (selectedMember.status !== MEMBER_SUSPENDED_STATUS && selectedMember.pendingAmount > 0) return (<button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center justify-center gap-2 p-3 text-sm font-semibold text-on-danger bg-danger border border-danger rounded-xl motion-safe:transition-all motion-safe:hover:-translate-y-0.5 hover:shadow-card motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-overview-button-edit" onClick={() => toggleSuspend(true)} >
                <Ban size={18} strokeWidth={2}/>{t("COPY_SUSPEND")}</button>); return (() => { if (selectedMember.status === MEMBER_SUSPENDED_STATUS) return (<button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center justify-center gap-2 p-3 text-sm font-semibold text-on-success bg-success border border-success rounded-xl motion-safe:transition-all motion-safe:hover:-translate-y-0.5 hover:shadow-card motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-overview-button-freeze" onClick={() => toggleSuspend(false)} >{t("COPY_UNSUSPEND")}</button>); return null; })(); })()}

            {(() => { if (trainers.length > 0) { return (
              (() => { if (!isAssigningTrainer) { return (
                <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center justify-center gap-2 p-3 text-sm font-semibold text-primary bg-primary-subtle border border-border rounded-xl motion-safe:transition-all motion-safe:hover:-translate-y-0.5 hover:shadow-card motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-overview-button-assign-trainer" 
                  onClick={() => setIsAssigningTrainer(true)}
                  
                >
                  <UserCheck size={18} strokeWidth={2}/>{t("COPY_ASSIGN_TRAINER")}</button>
              ); } return (
                <div className="col-span-2 flex flex-col gap-3 p-4 bg-page border border-border rounded-xl shadow-card">
                  <ManagerSearchableDropdown dataTestId="manager_members-managermembersprofileoverview-managersearchabledropdown-1"
                    value={selectedTrainerId}
                    onChange={(value) => setSelectedTrainerId(String(value))}
                    options={trainers.map((trainer) => ({ value: trainer.id, label: `${trainer.name}${trainer.role ? ` (${trainer.role})` : ''}` }))}
                    placeholder={t("COPY_SELECT_TRAINER")}
                   data-testid="manager_members-managermembersprofileoverview-searchable-dropdown-1"/>
                  <label className="flex items-center gap-2 text-sm text-primary cursor-pointer">
                    <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "rounded border-border text-primary focus-visible:ring-primary w-4 h-4"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-input-checkbox-toggle" type="checkbox" checked={isPT} onChange={e => setIsPT(e.target.checked)}  />{t("COPY_PERSONAL_TRAINING_PT")}</label>
                  <div className="flex gap-3 mt-1">
                    <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex-1 p-2.5 bg-primary text-on-primary text-sm font-semibold rounded-xl motion-safe:transition-all hover:bg-primary-hover shadow-card motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-overview-button-suspend" 
                      onClick={() => {
                        if(selectedTrainerId) {
                          const t = trainers.find((x) => x.id === selectedTrainerId);
                          if(t) assignTrainer(selectedMember.id, t.id, t.name, isPT);
                          setIsAssigningTrainer(false);
                        }
                      }}
                      
                    >{t("COPY_SAVE_CHANGES")}</button>
                    <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex-1 p-2.5 bg-input text-secondary text-sm font-semibold rounded-xl hover:bg-input motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-button-action-5" 
                      onClick={() => setIsAssigningTrainer(false)}
                      
                    >{t("COPY_CANCEL_7")}</button>
                  </div>
                </div>
              ); })()
            ); } return (
              <button data-testid="manager_members-member-profile-button-action-6" disabled className="flex items-center justify-center gap-2 p-3 text-sm font-semibold text-secondary bg-surface-highlight border border-border rounded-xl motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110">{t("COPY_NO_TRAINERS_FOUND")}</button>
            ); })()}
          </div>
        </div>
      </div>
    </div>
 );
}
