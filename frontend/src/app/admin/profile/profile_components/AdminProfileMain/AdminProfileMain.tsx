"use client";

// RESPONSIBILITY: Renders the Admin profile summary, personal-information form, and password form without owning API or validation logic.
// DATA FLOW: useAdminProfileLogic → AdminProfileMain → React Hook Form fields.
import { displayValue } from '@/app/admin/admin_layout/admin_utils/AdminDisplayValue';
import { useState } from 'react';
import { User, Lock, Save, Loader2 } from 'lucide-react';
import { useAdminProfileLogic } from '@/app/admin/profile/profile_context/useAdminProfileLogic';
import type { ProfileTab } from '@/app/admin/profile/profile_types/AdminProfileTypes';
import AdminPasswordField from '@/app/admin/profile/profile_components/AdminPasswordField/AdminPasswordField';

const PROFILE_TABS: Array<{ id: ProfileTab; label: string; icon: typeof User }> = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'security', label: 'Security', icon: Lock },
];

export default function AdminProfileMain() {
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
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (profileQuery.isPending) {
    return <div className="max-w-3xl mx-auto space-y-6 motion-safe:animate-pulse motion-safe:duration-base"><div className="h-8 w-48 bg-skeleton-base rounded-lg" /><div className="h-24 bg-skeleton-base rounded-xl" /><div className="h-64 bg-skeleton-base rounded-xl" /></div>;
  }

  if (profileQuery.isError) {
    return <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl p-8 text-center"><p className="text-sm text-danger">{profileQuery.error instanceof Error ? profileQuery.error.message : 'Profile could not be loaded.'}</p><button type="button" onClick={() => profileQuery.refetch()} className="mt-4 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Retry</button></div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">My Profile</h1>
        <p className="text-secondary mt-1 text-sm">Manage your account details and password.</p>
      </div>

      <div className="bg-primary-subtle/20 border border-border rounded-xl p-6 flex items-center gap-5 shadow-card">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-on-primary shrink-0">{displayInitial}</div>
        <div>
          <p className="text-lg font-bold text-primary">{profile?.name ?? 'Admin'}</p>
          <p className="text-sm text-secondary">{displayValue(profile?.email)}</p>
          <span className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-success text-on-success text-xs font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-success motion-safe:animate-pulse motion-safe:duration-base" />Active</span>
        </div>
      </div>

      <div className="flex gap-1 bg-input border border-border rounded-xl p-1 w-fit">
        {PROFILE_TABS.map(({ id, label, icon: Icon }) => (
          <button type="button" key={id} onClick={() => setActiveTab(id)} aria-pressed={activeTab === id} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${activeTab === id ? 'bg-card text-on-primary shadow-card' : 'text-secondary hover:text-on-primary'}`}>
            <Icon size={16} strokeWidth={2} /> {label}
          </button>
        ))}
      </div>

      {activeTab === 'personal' && (
        <form onSubmit={handleSaveProfile} className="bg-card border border-border rounded-xl p-6 shadow-card space-y-5">
          <h2 className="text-base font-semibold text-on-primary">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="admin-profile-name" className="block text-sm font-medium text-secondary mb-1.5">Full Name <span className="text-danger">*</span></label>
              <input id="admin-profile-name" type="text" {...profileForm.register('name')} aria-invalid={profileForm.formState.errors.name ? 'true' : 'false'} aria-describedby={profileForm.formState.errors.name ? 'admin-profile-name-error' : undefined} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-on-primary text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
              {profileForm.formState.errors.name && <p id="admin-profile-name-error" className="mt-1 text-xs text-danger">{profileForm.formState.errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="admin-profile-email" className="block text-sm font-medium text-secondary mb-1.5">Email Address</label>
              <input id="admin-profile-email" type="email" value={profile?.email ?? ''} readOnly className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-secondary text-sm cursor-not-allowed opacity-60" />
              <p className="text-xs text-secondary mt-1">Email cannot be changed here.</p>
            </div>
            <div>
              <label htmlFor="admin-profile-phone" className="block text-sm font-medium text-secondary mb-1.5">Phone Number</label>
              <input id="admin-profile-phone" type="tel" {...profileForm.register('phone')} placeholder="+91 XXXXX XXXXX" aria-invalid={profileForm.formState.errors.phone ? 'true' : 'false'} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-on-primary text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
              {profileForm.formState.errors.phone && <p className="mt-1 text-xs text-danger">{profileForm.formState.errors.phone.message}</p>}
            </div>
            <div>
              <label htmlFor="admin-profile-role" className="block text-sm font-medium text-secondary mb-1.5">Role</label>
              <input id="admin-profile-role" type="text" value={profile?.role ?? 'ADMIN'} readOnly className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-secondary text-sm cursor-not-allowed opacity-60" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-end pt-2">
            <button type="submit" disabled={savingProfile || !profileForm.formState.isDirty} className="min-w-36 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-on-primary font-semibold rounded-lg text-sm shadow-card motion-safe:transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base">
              {savingProfile ? <Loader2 size={16} strokeWidth={2} className="motion-safe:animate-spin motion-safe:duration-base" /> : <Save size={16} strokeWidth={2} />} Save Changes
            </button>
          </div>
        </form>
      )}

      {activeTab === 'security' && (
        <form onSubmit={handleChangePassword} className="bg-card border border-border rounded-xl p-6 shadow-card space-y-5">
          <h2 className="text-base font-semibold text-on-primary">Change Password</h2>
          <div className="space-y-4 max-w-md">
            <AdminPasswordField label="Current Password" name="currentPassword" form={passwordForm} visible={showCurrent} onToggle={() => setShowCurrent((value) => !value)} />
            <AdminPasswordField label="New Password" name="newPassword" form={passwordForm} visible={showNew} onToggle={() => setShowNew((value) => !value)} />
            <AdminPasswordField label="Confirm New Password" name="confirmPassword" form={passwordForm} visible={showConfirm} onToggle={() => setShowConfirm((value) => !value)} />
          </div>
          <div className="flex flex-col sm:flex-row justify-end pt-2">
            <button type="submit" disabled={savingPassword || !passwordForm.formState.isDirty} className="min-w-36 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-on-primary font-semibold rounded-lg text-sm shadow-card motion-safe:transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base">
              {savingPassword ? <Loader2 size={16} strokeWidth={2} className="motion-safe:animate-spin motion-safe:duration-base" /> : <Lock size={16} strokeWidth={2} />} Update Password
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

