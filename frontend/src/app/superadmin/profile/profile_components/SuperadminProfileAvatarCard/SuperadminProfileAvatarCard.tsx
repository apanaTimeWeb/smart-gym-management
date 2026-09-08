'use client';
// RESPONSIBILITY: Displays the superadmin's avatar, name, role badge, and last login info.
// Display-only — no mutations.

import { ShieldCheck } from 'lucide-react';
import type { SuperadminProfileData } from '@/app/superadmin/profile/profile_types/SuperadminProfileTypes';

interface SuperadminProfileAvatarCardProps {
  profile: SuperadminProfileData;
}

export default function SuperadminProfileAvatarCard({ profile }: SuperadminProfileAvatarCardProps) {
  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const lastLogin = new Date(profile.lastLoginAt).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center text-center gap-4 shadow-sm">
      <div className="w-20 h-20 rounded-full bg-primary-subtle border-2 border-primary flex items-center justify-center">
        <span className="text-2xl font-bold text-primary">{initials}</span>
      </div>
      <div>
        <h2 className="text-lg font-bold text-foreground">{profile.name}</h2>
        <p className="text-sm text-secondary">{profile.email}</p>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-subtle rounded-full">
        <ShieldCheck size={14} strokeWidth={2} className="text-primary" />
        <span className="text-xs font-semibold text-primary">SUPERADMIN</span>
      </div>
      <div className="w-full border-t border-border pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-secondary">Last Login</span>
          <span className="text-foreground">{lastLogin}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-secondary">2FA</span>
          <span className={profile.twoFactorEnabled ? 'text-success font-medium' : 'text-danger font-medium'}>
            {profile.twoFactorEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-secondary">Member Since</span>
          <span className="text-foreground">
            {new Date(profile.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
          </span>
        </div>
      </div>
    </div>
  );
}
