'use client';
// RESPONSIBILITY: Root client orchestrator for the Superadmin Profile page.
// Owns tab state, fetch state, and mutation handlers. Delegates rendering to child components.

import SuperadminProfileAvatarCard from '@/app/superadmin/profile/profile_components/SuperadminProfileAvatarCard/SuperadminProfileAvatarCard';
import SuperadminProfilePersonalForm from '@/app/superadmin/profile/profile_components/SuperadminProfilePersonalForm/SuperadminProfilePersonalForm';
import SuperadminProfileSecurityForm from '@/app/superadmin/profile/profile_components/SuperadminProfileSecurityForm/SuperadminProfileSecurityForm';
import type { ProfileTab } from '@/app/superadmin/profile/profile_types/SuperadminProfileTypes';
import { useProfilePage } from '@/app/superadmin/profile/profile_utils/useProfilePage';

const TABS: { id: ProfileTab; label: string }[] = [
  { id: 'personal', label: 'Personal Info' },
  { id: 'security', label: 'Security' },
];

export default function SuperadminProfileMain() {
  const {
    activeTab, setActiveTab,
    profile, profileLoading,
    personalState, updatePersonalMutation,
    passwordState, updatePasswordMutation,
    twoFAState, toggle2FAMutation,
  } = useProfilePage();

  if (profileLoading || !profile) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-card rounded w-48 motion-safe:animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 h-64 bg-card rounded-xl border border-border motion-safe:animate-pulse" />
          <div className="lg:col-span-3 h-96 bg-card rounded-xl border border-border motion-safe:animate-pulse" />
        </div>
      </div>
    );
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
                isSaving={personalState === 'loading'}
                onSave={(data) => updatePersonalMutation.mutate(data)}
              />
            )}
            {activeTab === 'security' && (
              <SuperadminProfileSecurityForm
                profile={profile}
                isSavingPassword={passwordState === 'loading'}
                isTogglingTwoFA={twoFAState === 'loading'}
                onSavePassword={(data) => updatePasswordMutation.mutate(data)}
                onToggle2FA={(data) => toggle2FAMutation.mutate(data)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
