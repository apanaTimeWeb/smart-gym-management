'use client';
// RESPONSIBILITY: Root client orchestrator for the Superadmin Profile page.
// Owns tab state, fetch state, and mutation handlers. Delegates rendering to child components.

import { useState } from 'react';
import toast from 'react-hot-toast';
import SuperadminProfileAvatarCard from '@/app/superadmin/profile/profile_components/SuperadminProfileAvatarCard/SuperadminProfileAvatarCard';
import SuperadminProfilePersonalForm from '@/app/superadmin/profile/profile_components/SuperadminProfilePersonalForm/SuperadminProfilePersonalForm';
import SuperadminProfileSecurityForm from '@/app/superadmin/profile/profile_components/SuperadminProfileSecurityForm/SuperadminProfileSecurityForm';
import { superadminProfileApi } from '@/app/superadmin/profile/profile_api/superadmin_profile_api';
import type {
  SuperadminProfileData,
  ProfileTab,
  UpdateSuperadminProfilePayload,
  UpdateSuperadminPasswordPayload,
  Toggle2FAPayload,
} from '@/app/superadmin/profile/profile_types/SuperadminProfileTypes';

const MOCK_PROFILE: SuperadminProfileData = {
  id: 'sa-001',
  name: 'Platform Admin',
  email: 'admin@gymsmart360.com',
  phone: '9999999999',
  role: 'SUPERADMIN',
  twoFactorEnabled: false,
  lastLoginAt: new Date().toISOString(),
  createdAt: '2024-01-01T00:00:00Z',
};

const TABS: { id: ProfileTab; label: string }[] = [
  { id: 'personal', label: 'Personal Info' },
  { id: 'security', label: 'Security' },
];

export default function SuperadminProfileMain() {
  const [profile, setProfile] = useState<SuperadminProfileData>(MOCK_PROFILE);
  const [activeTab, setActiveTab] = useState<ProfileTab>('personal');
  const [isSavingPersonal, setIsSavingPersonal] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [isTogglingTwoFA, setIsTogglingTwoFA] = useState(false);

  async function handleSavePersonal(payload: UpdateSuperadminProfilePayload) {
    setIsSavingPersonal(true);
    try {
      const res = await superadminProfileApi.updateProfile(payload);
      if (res.success && res.data) {
        setProfile(res.data);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsSavingPersonal(false);
    }
  }

  async function handleSavePassword(payload: UpdateSuperadminPasswordPayload) {
    setIsSavingPassword(true);
    try {
      const res = await superadminProfileApi.updatePassword(payload);
      toast.success(res.message || 'Password updated successfully.');
    } catch {
      toast.error('Failed to update password. Please try again.');
    } finally {
      setIsSavingPassword(false);
    }
  }

  async function handleToggle2FA(payload: Toggle2FAPayload) {
    setIsTogglingTwoFA(true);
    try {
      const res = await superadminProfileApi.toggle2FA(payload);
      if (res.success && res.data) {
        setProfile(res.data);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error('Failed to update 2FA settings. Please try again.');
    } finally {
      setIsTogglingTwoFA(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="text-secondary mt-1 text-sm">
          Manage your personal information and account security settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Avatar Card */}
        <div className="lg:col-span-1">
          <SuperadminProfileAvatarCard profile={profile} />
        </div>

        {/* Tabbed Forms */}
        <div className="lg:col-span-3 bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          {/* Tab Bar */}
          <div className="flex border-b border-border">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3.5 text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-secondary hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'personal' && (
              <SuperadminProfilePersonalForm
                profile={profile}
                isSaving={isSavingPersonal}
                onSave={handleSavePersonal}
              />
            )}
            {activeTab === 'security' && (
              <SuperadminProfileSecurityForm
                profile={profile}
                isSavingPassword={isSavingPassword}
                isTogglingTwoFA={isTogglingTwoFA}
                onSavePassword={handleSavePassword}
                onToggle2FA={handleToggle2FA}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
