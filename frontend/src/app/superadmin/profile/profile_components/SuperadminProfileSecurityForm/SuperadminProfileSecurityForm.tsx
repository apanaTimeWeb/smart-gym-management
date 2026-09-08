'use client';
// RESPONSIBILITY: Security settings form — change password and toggle 2FA.
// Uses React Hook Form + Zod. Emits save callbacks to parent.

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2, ShieldCheck, ShieldOff } from 'lucide-react';
import type {
  SuperadminProfileData,
  UpdateSuperadminPasswordPayload,
  Toggle2FAPayload,
} from '@/app/superadmin/profile/profile_types/SuperadminProfileTypes';

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

interface SuperadminProfileSecurityFormProps {
  profile: SuperadminProfileData;
  isSavingPassword: boolean;
  isTogglingTwoFA: boolean;
  onSavePassword: (payload: UpdateSuperadminPasswordPayload) => void;
  onToggle2FA: (payload: Toggle2FAPayload) => void;
}

export default function SuperadminProfileSecurityForm({
  profile,
  isSavingPassword,
  isTogglingTwoFA,
  onSavePassword,
  onToggle2FA,
}: SuperadminProfileSecurityFormProps) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [twoFAPassword, setTwoFAPassword] = useState('');
  const [showTwoFAPassword, setShowTwoFAPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({ resolver: zodResolver(passwordSchema) });

  function handlePasswordSubmit(values: PasswordFormValues) {
    onSavePassword(values);
    reset();
  }

  function handleToggle2FA() {
    if (!twoFAPassword.trim()) return;
    onToggle2FA({ enabled: !profile.twoFactorEnabled, password: twoFAPassword });
    setTwoFAPassword('');
  }

  const inputClass =
    'w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary';

  return (
    <div className="space-y-8">
      {/* Change Password */}
      <div>
        <h3 className="text-base font-semibold text-foreground mb-4">Change Password</h3>
        <form onSubmit={handleSubmit(handlePasswordSubmit)} className="space-y-4">
          {[
            { id: 'currentPassword', label: 'Current Password', show: showCurrent, toggle: () => setShowCurrent((v) => !v) },
            { id: 'newPassword', label: 'New Password', show: showNew, toggle: () => setShowNew((v) => !v) },
            { id: 'confirmPassword', label: 'Confirm New Password', show: showConfirm, toggle: () => setShowConfirm((v) => !v) },
          ].map(({ id, label, show, toggle }) => (
            <div key={id}>
              <label className="block text-sm font-medium text-secondary mb-1.5">
                {label} <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <input
                  {...register(id as keyof PasswordFormValues)}
                  type={show ? 'text' : 'password'}
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={show ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-foreground focus-visible:outline-none"
                >
                  {show ? <EyeOff size={16} strokeWidth={2} /> : <Eye size={16} strokeWidth={2} />}
                </button>
              </div>
              {errors[id as keyof PasswordFormValues] && (
                <p className="mt-1 text-xs text-danger" role="alert">
                  {errors[id as keyof PasswordFormValues]?.message}
                </p>
              )}
            </div>
          ))}

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={isSavingPassword}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-black font-semibold text-sm rounded-lg motion-safe:transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {isSavingPassword && <Loader2 size={16} strokeWidth={2} className="motion-safe:animate-spin" />}
              {isSavingPassword ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>

      {/* 2FA Toggle */}
      <div className="border-t border-border pt-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-foreground">Two-Factor Authentication</h3>
            <p className="text-sm text-secondary mt-0.5">
              {profile.twoFactorEnabled
                ? 'Your account is protected with 2FA.'
                : 'Add an extra layer of security to your account.'}
            </p>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${profile.twoFactorEnabled ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'}`}>
            {profile.twoFactorEnabled
              ? <><ShieldCheck size={12} strokeWidth={2} /> Enabled</>
              : <><ShieldOff size={12} strokeWidth={2} /> Disabled</>}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1.5">
              Confirm with your password <span className="text-danger">*</span>
            </label>
            <div className="relative max-w-sm">
              <input
                type={showTwoFAPassword ? 'text' : 'password'}
                value={twoFAPassword}
                onChange={(e) => setTwoFAPassword(e.target.value)}
                placeholder="Enter your current password"
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowTwoFAPassword((v) => !v)}
                aria-label={showTwoFAPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-foreground focus-visible:outline-none"
              >
                {showTwoFAPassword ? <EyeOff size={16} strokeWidth={2} /> : <Eye size={16} strokeWidth={2} />}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleToggle2FA}
            disabled={isTogglingTwoFA || !twoFAPassword.trim()}
            className={`flex items-center gap-2 px-5 py-2.5 font-semibold text-sm rounded-lg motion-safe:transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 ${
              profile.twoFactorEnabled
                ? 'bg-danger-bg text-danger hover:bg-danger hover:text-white focus-visible:ring-danger'
                : 'bg-success-bg text-success hover:bg-success hover:text-white focus-visible:ring-success'
            }`}
          >
            {isTogglingTwoFA && <Loader2 size={16} strokeWidth={2} className="motion-safe:animate-spin" />}
            {profile.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
          </button>
        </div>
      </div>
    </div>
  );
}
