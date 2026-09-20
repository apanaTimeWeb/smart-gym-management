"use client";

// RESPONSIBILITY: Renders one password input with visibility toggle and React Hook Form validation feedback.
// DATA FLOW: AdminProfileMain → AdminProfilePasswordField → passwordForm field registration.
import { Eye, EyeOff } from 'lucide-react';
import type { AdminProfilePasswordFieldProps } from '@/app/admin/profile/profile_types/AdminProfileTypes';

export default function AdminProfilePasswordField({ label, name, form, visible, onToggle }: AdminProfilePasswordFieldProps) {
  const error = form.formState.errors[name];
  const inputId = `admin-profile-${name}`;
  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-secondary mb-1.5">{label} <span className="text-danger">*</span></label>
      <div className="relative">
        <input id={inputId} type={visible ? 'text' : 'password'} {...form.register(name)} aria-invalid={error ? 'true' : 'false'} className="w-full px-4 py-2.5 pr-10 bg-input border border-border rounded-lg text-primary text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
        <button type="button" onClick={onToggle} aria-label={visible ? `Hide ${label}` : `Show ${label}`} className="min-h-11 min-w-11 motion-safe:transition-all motion-safe:duration-base ease-in-out absolute inset-y-0 right-3 flex items-center text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
          {visible ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-danger">{error.message}</p>}
    </div>
  );
}
