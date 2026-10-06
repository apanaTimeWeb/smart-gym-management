// RESPONSIBILITY: Renders/orchestrates SuperadminProfileMain within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Root client orchestrator for the Superadmin Profile page.
import { useTranslations } from 'next-intl';

import SuperadminProfileAvatarCard from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_components/superadmin_profile_avatar_card/SuperadminProfileAvatarCard';
import SuperadminProfileDataExportCard from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_components/superadmin_profile_data_export_card/SuperadminProfileDataExportCard';
import SuperadminProfilePersonalForm from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_components/superadmin_profile_personal_form/SuperadminProfilePersonalForm';
import SuperadminProfileSecurityForm from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_components/superadmin_profile_security_form/SuperadminProfileSecurityForm';
import { useSuperadminProfilePage } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_hooks/useSuperadminProfilePage';

import type { ProfileTab } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_types/SuperadminProfileTypes';



const TABS: ProfileTab[] = ['personal', 'security'];
/**
 * @description Root client orchestrator for the Superadmin Profile page.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminProfileMain() {
  const t = useTranslations('superadmin_profile');
    const { activeTab, setActiveTab, profile, profileLoading, personalState, passwordState, twoFAState, updatePersonalProfile, updatePassword, toggleTwoFactor, requestFullDataExport, isRequestingDataExport, dataExportCompletionState, } = useSuperadminProfilePage();
    if (profileLoading || !profile) {
        return (<div className="space-y-6" data-testid="superadmin_profile-superadmin-profile-main-page">
        <div className="h-8 bg-card rounded w-48 motion-safe:animate-pulse"/>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 h-64 bg-card rounded-xl border border-border motion-safe:animate-pulse"/>
          <div className="lg:col-span-3 h-96 bg-card rounded-xl border border-border motion-safe:animate-pulse"/>
        </div>
      </div>);
    }
    return (<div className="space-y-6" data-testid="superadmin_profile-superadmin-profile-main-page-ready">
      <div>
        <h1 className="superadmin-page-title text-primary">{t('ui.my_profile_3615e58')}</h1>
        <p className="text-secondary mt-1 text-sm">
          
          {t('ui.manage_your_personal_information_and_account_sec_fd8f0e8')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Avatar Card */}
        <div className="lg:col-span-1">
          <SuperadminProfileAvatarCard profile={profile}/>
        </div>

        {/* Tabbed Forms */}
        <div className="lg:col-span-3 bg-card border border-border rounded-xl shadow-card overflow-hidden">
          {/* Tab Bar */}
          <div className="flex border-b border-border">
            {TABS.map((tab, index) => (<button  type="button" key={tab} onClick={() => setActiveTab(tab)} className={`min-h-11 px-6 py-3.5 text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${activeTab === tab
                ? 'text-primary border-b-2 border-focus'
                : 'text-secondary hover:text-primary'} motion-safe:active:scale-95`} data-testid={`superadmin_profile-profile-profile-main-action1-${index}`}>
                {tab === 'personal' ? t('ui.personal_information') : t('ui.security')}
              </button>))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'personal' && (<SuperadminProfilePersonalForm profile={profile} isSaving={personalState === 'loading'} onSave={updatePersonalProfile} data-testid="superadmin_profile_main-superadmin-profile-personal-form-interactive-1"/>)}
            {activeTab === 'security' && (<SuperadminProfileSecurityForm profile={profile} isSavingPassword={passwordState === 'loading'} isTogglingTwoFA={twoFAState === 'loading'} onSavePassword={updatePassword} onToggle2FA={toggleTwoFactor} data-testid="superadmin_profile_main-superadmin-profile-security-form-interactive-2"/>)}
          </div>
        </div>
      </div>
      <SuperadminProfileDataExportCard onRequestExport={requestFullDataExport} isRequesting={isRequestingDataExport} completionState={dataExportCompletionState} data-testid="superadmin_profile_main-superadmin-profile-data-export-card-interactive-3" />
    </div>);
}
