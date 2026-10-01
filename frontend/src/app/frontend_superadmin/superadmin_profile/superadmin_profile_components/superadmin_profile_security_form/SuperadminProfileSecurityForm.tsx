'use client';
// RESPONSIBILITY: Security settings form — change password and toggle 2FA.
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, ShieldCheck, ShieldOff } from 'lucide-react';

import { useUnsavedChangesGuard } from '@/hooks/useUnsavedChangesGuard';

import { passwordSchema } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_schemas/SuperadminProfileSecurityFormSchema';

import type { SuperadminProfileSecurityFormValues } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_types/SuperadminProfileSecurityFormTypes';
import type { SuperadminProfileSecurityFormProps } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_types/SuperadminProfileSecurityFormTypes';
import type { SuperadminProfileData, UpdateSuperadminPasswordPayload, Toggle2FAPayload, } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_types/SuperadminProfileTypes';

/**
 * @description Security settings form — change password and toggle 2FA.
 * @dependencies Uses the existing feature-local API, query, state, and approved UI/infrastructure contracts imported by this component.
 * @edge-case Interactive, loading, empty, error, disabled, and repeated-action paths must remain recoverable through the owning feature contract.
 */
export default function SuperadminProfileSecurityForm({ profile, isSavingPassword, isTogglingTwoFA, onSavePassword, onToggle2FA, }: SuperadminProfileSecurityFormProps) {
  const t = useTranslations('superadmin_profile');
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [twoFAPassword, setTwoFAPassword] = useState('');
    const [showTwoFAPassword, setShowTwoFAPassword] = useState(false);
    const { register, handleSubmit, reset, formState: { errors, isDirty }, } = useForm<SuperadminProfileSecurityFormValues>({ resolver: zodResolver(passwordSchema) });
    useUnsavedChangesGuard(isDirty, t('ui.unsaved_password_changes_leave'));
    function handlePasswordSubmit(values: SuperadminProfileSecurityFormValues) {
        onSavePassword(values);
        reset();
    }
    function handleToggle2FA() {
        if (!twoFAPassword.trim())
            return;
        onToggle2FA({ enabled: !profile.twoFactorEnabled, password: twoFAPassword });
        setTwoFAPassword('');
    }
    const inputClass = 'min-h-11 w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-focus focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out';
    return (<div className="space-y-8">
      {/* Change Password */}
      <div>
        <h3 className="text-base font-semibold text-primary mb-4">{t('ui.change_password_a006714')}</h3>
        <form onSubmit={handleSubmit(handlePasswordSubmit)} className="space-y-4" data-testid="superadmin_profile-superadminprofilesecurityform-form-submit">
          {[
            { id: 'currentPassword', label: t('ui.current_password_6c0a4d8'), show: showCurrent, toggle: () => setShowCurrent((v) => !v) },
            { id: 'newPassword', label: t('ui.new_password_054361c'), show: showNew, toggle: () => setShowNew((v) => !v) },
            { id: 'confirmPassword', label: t('ui.confirm_new_password_0cd5102'), show: showConfirm, toggle: () => setShowConfirm((v) => !v) },
        ].map(({ id, label, show, toggle }, index) => (<div key={id}>
              <label htmlFor={`superadmin_profile-${id}`} className="block text-sm font-medium text-secondary mb-1.5">
                {label} <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <input id={`superadmin_profile-${id}`} {...register(id as keyof SuperadminProfileSecurityFormValues)} type={show ? 'text' : 'password'} className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ${inputClass} pr-10 motion-safe:transition-all motion-safe:duration-base ease-in-out`} data-testid={`superadmin_profile-profile-profile-security-form-field-${index}`} aria-invalid={Boolean(errors[id as keyof SuperadminProfileSecurityFormValues])} aria-describedby={`superadmin_profile-${id}-error`}/>
                <button type="button" onClick={toggle} aria-label={show ? t('ui.hide_password_db87709') : t('ui.show_password_636b860')} className="min-w-11 min-h-11 absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary focus-visible:outline-none motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95" data-testid={`superadmin_profile-profile-profile-security-form-action1-${index}`}>
                  {show ? <EyeOff size={18} className="w-4" strokeWidth={2}/> : <Eye size={18} className="w-4" strokeWidth={2}/>}
                </button>
              </div>
              {errors[id as keyof SuperadminProfileSecurityFormValues] && (<p className="mt-1 text-xs text-danger" role="alert" id={`superadmin_profile-${id}-error`} data-testid={`superadmin_profile-profile-profile-security-form-alert-${index}`}>
                  {errors[id as keyof SuperadminProfileSecurityFormValues]?.message ? t(String(errors[id as keyof SuperadminProfileSecurityFormValues]?.message)) : ''}
                </p>)}
            </div>))}

          <div className="flex justify-end pt-1">
            <button type="submit" disabled={isSavingPassword || !isDirty} className="min-h-11 min-w-36 flex items-center gap-2 px-5 py-2.5 bg-primary-subtle hover:bg-primary-hover text-primary font-semibold text-sm rounded-lg motion-safe:transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95" data-testid="superadmin_profile-profile-profile-security-form-action2">
              {isSavingPassword && <Loader2 size={18} className="w-4 motion-safe:animate-spin" strokeWidth={2}/>}
              {isSavingPassword ? t('ui.updating') : t('ui.update_password_e103e58')}
            </button>
          </div>
        </form>
      </div>

      {/* 2FA Toggle */}
      <div className="border-t border-border pt-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-primary">{t('ui.two_factor_authentication_24fffe8')}</h3>
            <p className="text-sm text-secondary mt-0.5">
              {profile.twoFactorEnabled
            ? t('ui.your_account_is_protected_with_2fa_e77aa35')
            : t('ui.add_an_extra_layer_of_security_to_your_account_dcbb1ad')}
            </p>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${profile.twoFactorEnabled ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'}`}>
            {profile.twoFactorEnabled
            ? <><ShieldCheck size={18} className="w-3" strokeWidth={2}/>  {t('ui.enabled_b81fd59')}</>
            : <><ShieldOff size={18} className="w-3" strokeWidth={2}/>  {t('ui.disabled_8532813')}</>}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label htmlFor="superadmin_profile-2fa-password" className="block text-sm font-medium text-secondary mb-1.5">
              
              {t('ui.confirm_with_your_password_88e3b2f')} <span className="text-danger">*</span>
            </label>
            <div className="relative max-w-sm">
              <input  id="superadmin_profile-2fa-password" type={showTwoFAPassword ? 'text' : 'password'} value={twoFAPassword} onChange={(e) => setTwoFAPassword(e.target.value)} placeholder={t('ui.enter_your_current_password_057aa0c')} className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ${inputClass} pr-10 motion-safe:transition-all motion-safe:duration-base ease-in-out`} data-testid="superadmin_profile-profile-profile-security-form-control"/>
              <button  type="button" onClick={() => setShowTwoFAPassword((v) => !v)} aria-label={showTwoFAPassword ? t('ui.hide_password_db87709') : t('ui.show_password_636b860')} className="min-w-11 min-h-11 absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary focus-visible:outline-none motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95" data-testid="superadmin_profile-profile-profile-security-form-action3">
                {showTwoFAPassword ? <EyeOff size={18} className="w-4" strokeWidth={2}/> : <Eye size={18} className="w-4" strokeWidth={2}/>}
              </button>
            </div>
          </div>

          <button type="button" onClick={handleToggle2FA} disabled={isTogglingTwoFA || !twoFAPassword.trim()} className={`min-h-11 min-w-36 flex items-center gap-2 px-5 py-2.5 font-semibold text-sm rounded-lg motion-safe:transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 ${profile.twoFactorEnabled
            ? 'bg-danger-bg focus-visible:ring-primary'
            : 'bg-success-bg focus-visible:ring-primary'} motion-safe:active:scale-95`} data-testid="superadmin_profile-profile-profile-security-form-action4">
            {isTogglingTwoFA && <Loader2 size={18} className="w-4 motion-safe:animate-spin" strokeWidth={2}/>}
            {profile.twoFactorEnabled ? t('ui.disable_2fa_dc13dc6') : t('ui.enable_2fa_15a956f')}
          </button>
        </div>
      </div>
    </div>);
}
