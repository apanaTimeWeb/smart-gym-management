'use client';
// RESPONSIBILITY: Form for updating the superadmin's personal profile fields.
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import { useUnsavedChangesGuard } from '@/hooks/useUnsavedChangesGuard';

import { TIMEZONE_OPTIONS, LANGUAGE_OPTIONS } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_constants/SuperadminProfileConstants';
import { personalSchema } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_schemas/SuperadminProfilePersonalFormSchema';

import type { SuperadminProfilePersonalFormValues } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_types/SuperadminProfilePersonalFormTypes';
import type { SuperadminProfilePersonalFormProps } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_types/SuperadminProfilePersonalFormTypes';
import type { SuperadminProfileData, UpdateSuperadminProfilePayload } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_types/SuperadminProfileTypes';

/**
 * @description Form for updating the superadmin's personal profile fields.
 * @dependencies Uses the existing feature-local API, query, state, and approved UI/infrastructure contracts imported by this component.
 * @edge-case Interactive, loading, empty, error, disabled, and repeated-action paths must remain recoverable through the owning feature contract.
 */
export default function SuperadminProfilePersonalForm({ profile, isSaving, onSave, }: SuperadminProfilePersonalFormProps) {
  const t = useTranslations('superadmin_profile');
    const { register, handleSubmit, reset, formState: { errors, isDirty }, } = useForm<SuperadminProfilePersonalFormValues>({
        resolver: zodResolver(personalSchema),
        defaultValues: {
            name: profile.name,
            phone: profile.phone,
            timezone: profile.timezone ?? 'Asia/Kolkata',
            language: profile.language ?? 'en',
        },
    });
    useUnsavedChangesGuard(isDirty, t('ui.unsaved_profile_changes_leave'));
    // Rule 53: reset when profile prop changes (e.g. after successful save)
    // EXPLANATION: Synchronize component state with external dependencies.
    // EFFECT DEPENDENCIES: Documented intentionally.
    // EFFECT INTENT: Synchronize local UI state with the listed inputs and clean up any browser/resource subscription created by this effect.
    useEffect(() => {
        reset({
            name: profile.name,
            phone: profile.phone,
            timezone: profile.timezone ?? 'Asia/Kolkata',
            language: profile.language ?? 'en',
        });
    }, [profile, reset]);
    const inputClass = 'min-h-11 w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-focus focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out';
    return (<form onSubmit={handleSubmit(onSave)} className="space-y-5" data-testid="superadmin_profile-superadminprofilepersonalform-form-submit-1">
      <div>
        <label htmlFor="superadmin_profile-full-name" className="block text-sm font-medium text-secondary mb-1.5">
          
          {t('ui.full_name_1e99bf3')} <span className="text-danger">*</span>
        </label>
        <input id="superadmin_profile-full-name" {...register('name')} type="text" className={`${inputClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out`} data-testid="superadmin_profile-profile-profile-personal-form-control-1"/>
        {errors.name && (<p className="mt-1 text-xs text-danger" role="alert" data-testid="superadmin_profile-profile-profile-personal-form-alert-1">{errors.name.message}</p>)}
      </div>

      <div>
        <label htmlFor="superadmin_profile-email" className="block text-sm font-medium text-secondary mb-1.5">{t('ui.email_address_8576ed0')}</label>
        <input id="superadmin_profile-email" type="email" value={profile.email} readOnly className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ${inputClass} cursor-not-allowed opacity-60 motion-safe:transition-all motion-safe:duration-base ease-in-out`} data-testid="superadmin_profile-profile-profile-personal-form-control-2-1"/>
        <p className="mt-1 text-xs text-secondary">{t('ui.email_cannot_be_changed_from_this_panel_66751ce')}</p>
      </div>

      <div>
        <label htmlFor="superadmin_profile-phone" className="block text-sm font-medium text-secondary mb-1.5">
          
          {t('ui.phone_number_40c5cbd')} <span className="text-danger">*</span>
        </label>
        <input id="superadmin_profile-phone" {...register('phone')} type="tel" className={`${inputClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out`} data-testid="superadmin_profile-profile-profile-personal-form-control-3-1"/>
        {errors.phone && (<p className="mt-1 text-xs text-danger" role="alert" data-testid="superadmin_profile-profile-profile-personal-form-alert-2-1">{errors.phone.message}</p>)}
      </div>

      <div>
        <label htmlFor="superadmin_profile-timezone" className="block text-sm font-medium text-secondary mb-1.5">{t('ui.timezone_a1dbd22')}</label>
        <select id="superadmin_profile-timezone" {...register('timezone')} className={`${inputClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out`} data-testid="superadmin_profile-profile-profile-personal-form-control-4-1">
          {TIMEZONE_OPTIONS.map((tz) => (<option key={tz} value={tz} data-testid="superadmin_profile-superadmin_profile-personal-form-action-1">{tz}</option>))}
        </select>
        <p className="mt-1 text-xs text-secondary">{t('ui.used_for_scheduling_and_date_display_across_the__1eec78e')}</p>
      </div>

      <div>
        <label htmlFor="superadmin_profile-language" className="block text-sm font-medium text-secondary mb-1.5">{t('ui.language_96c8019')}</label>
        <select id="superadmin_profile-language" {...register('language')} className={`${inputClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out`} data-testid="superadmin_profile-profile-profile-personal-form-control-5-1">
          {LANGUAGE_OPTIONS.map((lang) => (<option key={lang.value} value={lang.value} data-testid="superadmin_profile-superadmin_profile-personal-form-action-2">{lang.label}</option>))}
        </select>
      </div>

      <div className="flex justify-end pt-2">
        <button type="submit" disabled={isSaving || !isDirty} className="min-h-11 min-w-36 flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-on-primary font-semibold text-sm rounded-lg motion-safe:transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95" data-testid="superadmin_profile-profile-profile-personal-form-action1-1">
          {isSaving && <Loader2 size={18} className="w-4 motion-safe:animate-spin" strokeWidth={2}/>}
          {isSaving ? t('ui.saving') : t('ui.save_changes_56e2258')}
        </button>
      </div>
    </form>);
}
