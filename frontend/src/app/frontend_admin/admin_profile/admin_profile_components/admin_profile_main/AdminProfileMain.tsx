"use client";
// RESPONSIBILITY: Renders the Admin profile summary, personal-information form, and password form without owning API or validation logic.
import { useTranslations } from 'next-intl';
// DATA FLOW: useAdminProfileLogic → AdminProfileMain → React Hook Form fields.
import { displayValue } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutDisplayValue';
import { getAdminBackendMessage } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage';
import { User, Lock, Save, Loader2 } from 'lucide-react';
import { useAdminProfileLogic } from '@/app/frontend_admin/admin_profile/admin_profile_hooks/useAdminProfileLogic';
import { useAdminProfilePasswordVisibility } from '@/app/frontend_admin/admin_profile/admin_profile_hooks/useAdminProfilePasswordVisibility';
import type { ProfileTab } from '@/app/frontend_admin/admin_profile/admin_profile_types/AdminProfileTypes';
import AdminProfilePasswordField from '@/app/frontend_admin/admin_profile/admin_profile_components/admin_profile_password_field/AdminProfilePasswordField';

const PROFILE_TABS: Array<{ id: ProfileTab; labelKey: string; icon: typeof User }> = [
  { id: 'personal', labelKey: 'profile.AdminProfileMain.tabPersonal', icon: User },
  { id: 'security', labelKey: 'profile.AdminProfileMain.tabSecurity', icon: Lock },
];

/**
 * AdminProfileMain renders the admin profile main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminProfileMain: Renders the Admin profile summary, personal-information form, and password form without owning API or validation logic.
 * @dependencies Consumes AdminLayoutDisplayValue, AdminLayoutBackendMessage, useAdminProfileLogic, AdminProfileTypes, AdminProfilePasswordField.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminProfileMain() {
  const t = useTranslations();

  const {
    activeTab,
    setActiveTab,
    profile,
    profileQuery,
    profileForm,
    passwordForm,
    savingProfile,
    savingPassword,
    displayInitial,
    handleSaveProfile,
    handleChangePassword,
  } = useAdminProfileLogic();
  const { showCurrent, showNew, showConfirm, toggleCurrent, toggleNew, toggleConfirm } = useAdminProfilePasswordVisibility();

  if (profileQuery.isPending) {
    return <div className="max-w-3xl mx-auto space-y-6 motion-safe:animate-pulse motion-safe:duration-base"><div className="h-8 w-48 bg-skeleton-base rounded-lg" /><div className="h-24 bg-skeleton-base rounded-xl" /><div className="h-64 bg-skeleton-base rounded-xl" /></div>;
  }

  if (profileQuery.isError) {
    return <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl p-8 text-center"><p className="text-sm text-danger">{getAdminBackendMessage(profileQuery.error) ?? t('profile.admin_profile_main.auto_a9257207f9')}</p><button type="button" onClick={() => profileQuery.refetch()} className="motion-safe:transition-all motion-safe:duration-base ease-in-out mt-4 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11 motion-safe:active:scale-95" data-testid="admin_profile-admin_profile-main-control">{t('profile.admin_profile_main.text_9f5cd8a2e8')}</button></div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">{t('profile.admin_profile_main.text_9ba8d391c5')}</h1>
        <p className="text-secondary mt-1 text-sm">{t('profile.admin_profile_main.text_28dfd9f67e')}</p>
      </div>

      <div className="bg-primary-subtle border border-border rounded-xl p-6 flex items-center gap-5 shadow-card">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-on-primary shrink-0">{displayInitial}</div>
        <div>
          <p className="text-lg font-bold text-primary">{displayValue(profile?.name)}</p>
          <p className="text-sm text-secondary">{displayValue(profile?.email)}</p>
          <span className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-success-bg text-success-text text-xs font-semibold" data-testid="admin_profile-adminprofilemain-status-1"><span className="w-1.5 h-1.5 rounded-full bg-success text-on-success motion-safe:animate-pulse motion-safe:duration-base"  data-testid="admin_profile-adminprofilemain-status-2"/>{t('profile.admin_profile_main.text_a733b809d2')}</span>
        </div>
      </div>

      <div className="flex gap-1 bg-input border border-border rounded-xl p-1 w-fit">
        {PROFILE_TABS.map(({ id, labelKey, icon: Icon } , __testIdIndex70) => (
          <button type="button" key={id} onClick={() => setActiveTab(id)} aria-pressed={activeTab === id} className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${activeTab === id ? 'bg-card text-primary shadow-card' : 'text-secondary hover:text-primary'}`} data-testid={`admin_profile-admin_profile-main-control-2-map70-${__testIdIndex70}-1`}>
            <Icon size={18} strokeWidth={2} /> {t(labelKey)}
          </button>
        ))}
      </div>

      {activeTab === 'personal' && (
        <form onSubmit={handleSaveProfile} className="bg-card border border-border rounded-xl p-6 shadow-card space-y-5" data-testid="admin_profile-admin_profile-main-control-3">
          <h2 className="text-base font-semibold text-primary">{t('profile.admin_profile_main.text_ad12e4228c')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="admin_profile-name" className="block text-sm font-medium text-secondary mb-1.5">{t('profile.admin_profile_main.text_64346b483c')}<span className="text-danger">*</span></label>
              <input id="admin_profile-name" type="text" {...profileForm.register('name')} aria-invalid={profileForm.formState.errors.name ? 'true' : 'false'} aria-describedby={profileForm.formState.errors.name ? 'admin_profile-name-error' : undefined} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-primary text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"  data-testid="admin_profile-admin_profile-main-control-4"/>
              {profileForm.formState.errors.name && <p id="admin_profile-name-error" className="mt-1 text-xs text-danger">{profileForm.formState.errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="admin_profile-email" className="block text-sm font-medium text-secondary mb-1.5">{t('profile.admin_profile_main.text_09ba557fd1')}</label>
              <input id="admin_profile-email" type="email" value={displayValue(profile?.email)} readOnly className="w-full px-4 py-2.5 bg-input border border-dashed border-border rounded-lg text-secondary text-sm cursor-default opacity-100 min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"  data-testid="admin_profile-admin_profile-main-control-5"/>
              <p className="text-xs text-secondary mt-1">{t('profile.admin_profile_main.text_a23bc17981')}</p>
            </div>
            <div>
              <label htmlFor="admin_profile-phone" className="block text-sm font-medium text-secondary mb-1.5">{t('profile.admin_profile_main.text_ab25d61bb1')}</label>
              <input id="admin_profile-phone" type="tel" {...profileForm.register('phone')} placeholder={t('profile.admin_profile_main.text_38d7a68249')} aria-invalid={profileForm.formState.errors.phone ? 'true' : 'false'} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-primary text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"  data-testid="admin_profile-admin_profile-main-control-6"/>
              {profileForm.formState.errors.phone && <p className="mt-1 text-xs text-danger">{profileForm.formState.errors.phone.message}</p>}
            </div>
            <div>
              <label htmlFor="admin_profile-role" className="block text-sm font-medium text-secondary mb-1.5">{t('profile.admin_profile_main.text_c3f104d136')}</label>
              <input id="admin_profile-role" type="text" value={displayValue(profile?.role)} readOnly className="w-full px-4 py-2.5 bg-input border border-dashed border-border rounded-lg text-secondary text-sm cursor-default opacity-100 min-h-11"  data-testid="admin_profile-admin_profile-main-control-7"/>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-end pt-2">
            <button type="submit" disabled={savingProfile || !profileForm.formState.isDirty} className="min-w-36 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-on-primary font-semibold rounded-lg text-sm shadow-card motion-safe:transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11 motion-safe:active:scale-95" data-testid="admin_profile-admin_profile-main-control-8">
              {savingProfile ? <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin motion-safe:duration-base" /> : <Save size={18} strokeWidth={2} />} {t('profile.admin_profile_main.text_fa2984b367')}</button>
          </div>
        </form>
      )}

      {activeTab === 'security' && (
        <form onSubmit={handleChangePassword} className="bg-card border border-border rounded-xl p-6 shadow-card space-y-5" data-testid="admin_profile-admin_profile-main-control-9">
          <h2 className="text-base font-semibold text-primary">{t('profile.admin_profile_main.text_49289db43e')}</h2>
          <div className="space-y-4 max-w-md">
            <AdminProfilePasswordField label={t('profile.admin_profile_main.auto_898ba9670f')} name="currentPassword" form={passwordForm} visible={showCurrent} onToggle={toggleCurrent} />
            <AdminProfilePasswordField label={t('profile.admin_profile_main.auto_856b015424')} name="newPassword" form={passwordForm} visible={showNew} onToggle={toggleNew} />
            <AdminProfilePasswordField label={t('profile.admin_profile_main.auto_7ee35f2834')} name="confirmPassword" form={passwordForm} visible={showConfirm} onToggle={toggleConfirm} />
          </div>
          <div className="flex flex-col sm:flex-row justify-end pt-2">
            <button type="submit" disabled={savingPassword || !passwordForm.formState.isDirty} className="min-w-36 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-on-primary font-semibold rounded-lg text-sm shadow-card motion-safe:transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11 motion-safe:active:scale-95" data-testid="admin_profile-admin_profile-main-control-10">
              {savingPassword ? <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin motion-safe:duration-base" /> : <Lock size={18} strokeWidth={2} />} {t('profile.admin_profile_main.text_61dcf34e70')}</button>
          </div>
        </form>
      )}
    </div>
  );
}

