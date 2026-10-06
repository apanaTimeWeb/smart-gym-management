// RESPONSIBILITY: Renders ManagerMembersMemberProfile's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Edit, MessageCircle, Mail } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import ManagerHeader from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import ManagerMembersProfileAttendance from '@/app/frontend_manager/manager_members/manager_members_components/manager_members_member_profile/ManagerMembersProfileAttendance';
import ManagerMembersProfileDiet from '@/app/frontend_manager/manager_members/manager_members_components/manager_members_member_profile/ManagerMembersProfileDiet';
import ManagerMembersProfileOverview from '@/app/frontend_manager/manager_members/manager_members_components/manager_members_member_profile/ManagerMembersProfileOverview';
import ManagerMembersProfilePayments from '@/app/frontend_manager/manager_members/manager_members_components/manager_members_member_profile/ManagerMembersProfilePayments';
import ManagerMembersProfileWorkout from '@/app/frontend_manager/manager_members/manager_members_components/manager_members_member_profile/ManagerMembersProfileWorkout';
import { PROFILE_TABS } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersSharedConstants';
import { MEMBERS_STATUS_COLORS, MEMBERS_CYCLE_LABELS } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersUiConstants';
import { useManagerMembersLogic } from '@/app/frontend_manager/manager_members/manager_members_hooks/useManagerMembersLogic';
import { ManagerMembersFormatCurrency, ManagerMembersDisplayValue, ManagerMembersFormatDate } from '@/app/frontend_manager/manager_members/manager_members_utils/ManagerMembersFormatters';
import type { MemberProfileTab } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersTypes';


/** @description Renders the ManagerMembersMemberProfile component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (13 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export default function ManagerMembersMemberProfile() {
  const t = useTranslations('MANAGER_MEMBERS');
  const locale = useLocale();

  const { selectedMember, setSelectedMember, profileTab, setProfileTab, openEdit, openMsg, setShowRenewModal } = useManagerMembersLogic();


  if (!selectedMember) return null;

  const statusStyle = MEMBERS_STATUS_COLORS[selectedMember.status] || { bg: 'bg-input', text: 'text-secondary' };

  return (
    <div className="min-h-full">
      <ManagerHeader data-testid="manager_members-managermembersmemberprofile-managerheader-1" title={t("COPY_MEMBER_PROFILE")} subtitle={t('TEXT_VIEWING_PROFILE_OF', { name: selectedMember.name })} />
      <div className="p-6 space-y-5">
        <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "text-sm text-secondary hover:text-primary flex items-center gap-1.5 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-button-close"
          onClick={() => setSelectedMember(null)}
          
        >{t("COPY_BACK_MEMBERS")}</button>

        {/* Profile Card */}
        <div className="bg-card rounded-xl shadow-card border border-border p-6 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-primary bg-primary-subtle shrink-0">
                {(selectedMember.name || '?').charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">{ManagerMembersDisplayValue(selectedMember.name)}</h2>
                <p className="text-secondary text-sm">{selectedMember.email} Â· {selectedMember.phone}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span data-testid="manager_members-manager-members-member-profile-status" className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                    {selectedMember.status}
                  </span>
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-info text-on-info" data-testid="manager_members-managermembersmemberprofile-status-badge-1">
                    {selectedMember.plan?.name || ''}
                  </span>
                  <span data-testid="manager_members-member-profile-status" className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-bg text-purple-text">
                    {MEMBERS_CYCLE_LABELS[selectedMember.billingCycle] || selectedMember.billingCycle}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border border-border rounded-xl hover:bg-primary-subtle text-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 ease-in-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-button-edit"
                onClick={() => openEdit(selectedMember)}
                
              >
                <Edit size={18} strokeWidth={2}/>{t("COPY_EDIT_1")}</button>
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border border-border rounded-xl hover:bg-primary-subtle text-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 bg-primary-subtle ease-in-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-button-action"
                onClick={() => setShowRenewModal(true)}
                
              >{t("COPY_RENEW_PLAN_1")}</button>
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-success text-on-success rounded-xl motion-safe:transition-all hover:bg-primary-hover motion-safe:duration-base motion-safe:active:scale-95 ease-in-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-main-button-message"
                onClick={() => openMsg(selectedMember, 'whatsapp')}
                
              >
                <MessageCircle size={18} strokeWidth={2}/>{t("COPY_WHATSAPP_2")}</button>
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-info text-on-info rounded-xl motion-safe:transition-all hover:bg-primary-hover motion-safe:duration-base motion-safe:active:scale-95 ease-in-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-main-button-whatsapp"
                onClick={() => openMsg(selectedMember, 'email')}
                
              >
                <Mail size={18} strokeWidth={2}/>{t("COPY_EMAIL_2")}</button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: t("COPY_MEMBER_ID"), value: selectedMember.id },
              { label: t("COPY_BRANCH"), value: selectedMember.branch },
              { label: t("COPY_GENDER_1"), value: selectedMember.gender },
              { label: t("COPY_AADHAAR_CARD"), value: selectedMember.aadhaar || t('COPY_N') },
              { label: t("COPY_JOIN_DATE_2"), value: ManagerMembersFormatDate(selectedMember.joinDate) },
              { label: t("COPY_EXPIRY_DATE_2"), value: ManagerMembersFormatDate(selectedMember.expiryDate) },
              { label: t("COPY_ADDRESS_2"), value: selectedMember.address || t('COPY_N') },
              { label: t("COPY_TOTAL_PAID_2"), value: ManagerMembersFormatCurrency(selectedMember.paidAmount, ManagerEnvConfig.currencyCode, locale) },
              { label: t("COPY_PENDING"), value: ManagerMembersFormatCurrency(selectedMember.pendingAmount, ManagerEnvConfig.currencyCode, locale) },
            ].map((f, i) => (
              <div key={`member-summary-stat-${f.label.replace(/\s+/g, '-')}`} className="bg-input rounded-lg p-3">
                <p className="text-xs text-secondary mb-0.5">{f.label}</p>
                <p className="text-sm font-semibold text-primary">{f.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sub Tabs */}
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
          <div className="flex border-b border-border">
            {PROFILE_TABS.map(({ id: t, label }, mapIndex) => (
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`px-5 py-3.5 text-sm font-medium motion-safe:transition-all motion-safe:duration-base border-b-2 ${profileTab === t
                    ? 'text-primary bg-primary-subtle border-primary'
                    : 'border-transparent text-secondary hover:text-primary'
                  } ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_members-members-managermemberprofile-button-senary-${mapIndex}`}
                key={t}
                onClick={() => { setProfileTab(t as MemberProfileTab); }}
                
              >
                {label}
              </button>
            ))}
          </div>

          <div className="p-5">
            {profileTab === 'overview' && <ManagerMembersProfileOverview />}
            {profileTab === 'attendance' && <ManagerMembersProfileAttendance />}
            {profileTab === 'payments' && <ManagerMembersProfilePayments />}
            {profileTab === 'workout' && <ManagerMembersProfileWorkout />}
            {profileTab === 'diet' && <ManagerMembersProfileDiet />}
          </div>
        </div>
      </div>
    </div>
  );
}
