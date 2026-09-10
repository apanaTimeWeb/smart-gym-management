'use client';
// RESPONSIBILITY: Form for updating the superadmin's personal profile fields.
// Uses React Hook Form + Zod. Emits save to parent via onSave callback.

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import type { SuperadminProfileData, UpdateSuperadminProfilePayload } from '@/app/superadmin/profile/profile_types/SuperadminProfileTypes';
import { TIMEZONE_OPTIONS, LANGUAGE_OPTIONS } from '@/app/superadmin/profile/profile_utils/SuperadminProfileConstants';
import { personalSchema, type PersonalFormValues } from '@/app/superadmin/profile/profile_utils/SuperadminProfilePersonalForm.schema';
import { useWarnIfUnsavedChanges } from '@/app/superadmin/superadmin_utils/useWarnIfUnsavedChanges';

interface SuperadminProfilePersonalFormProps {
  profile: SuperadminProfileData;
  isSaving: boolean;
  onSave: (payload: UpdateSuperadminProfilePayload) => void;
}

export default function SuperadminProfilePersonalForm({
  profile,
  isSaving,
  onSave,
}: SuperadminProfilePersonalFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<PersonalFormValues>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      name: profile.name,
      phone: profile.phone,
      timezone: profile.timezone ?? 'Asia/Kolkata',
      language: profile.language ?? 'en',
    },
  });

  useWarnIfUnsavedChanges(isDirty, "You have unsaved changes in your profile. Are you sure you want to leave?");

  // Rule 53: reset when profile prop changes (e.g. after successful save)
  useEffect(() => {
    reset({
      name: profile.name,
      phone: profile.phone,
      timezone: profile.timezone ?? 'Asia/Kolkata',
      language: profile.language ?? 'en',
    });
  }, [profile, reset]);

  const inputClass =
    'w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary';

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-secondary mb-1.5">
          Full Name <span className="text-danger">*</span>
        </label>
        <input {...register('name')} type="text" className={inputClass} />
        {errors.name && (
          <p className="mt-1 text-xs text-danger" role="alert">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary mb-1.5">Email Address</label>
        <input
          type="email"
          value={profile.email}
          readOnly
          className={`${inputClass} cursor-not-allowed opacity-60`}
        />
        <p className="mt-1 text-xs text-secondary">Email cannot be changed from this panel.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary mb-1.5">
          Phone Number <span className="text-danger">*</span>
        </label>
        <input {...register('phone')} type="tel" className={inputClass} />
        {errors.phone && (
          <p className="mt-1 text-xs text-danger" role="alert">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary mb-1.5">Timezone</label>
        <select {...register('timezone')} className={inputClass}>
          {TIMEZONE_OPTIONS.map((tz) => (
            <option key={tz} value={tz}>{tz}</option>
          ))}
        </select>
        <p className="mt-1 text-xs text-secondary">Used for scheduling and date display across the platform.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary mb-1.5">Language</label>
        <select {...register('language')} className={inputClass}>
          {LANGUAGE_OPTIONS.map((lang) => (
            <option key={lang.value} value={lang.value}>{lang.label}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isSaving || !isDirty}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-black font-semibold text-sm rounded-lg motion-safe:transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {isSaving && <Loader2 size={16} strokeWidth={2} className="motion-safe:animate-spin" />}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
