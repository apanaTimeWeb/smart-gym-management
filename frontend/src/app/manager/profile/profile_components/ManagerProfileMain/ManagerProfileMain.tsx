'use client';
// RESPONSIBILITY: Root client component for the Manager Profile page.
// Renders personal info form and password change form in tabs.
// DATA FLOW: useManagerProfileLogic → ManagerProfileMain

import { User, Lock, Save, Loader2, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useManagerProfileLogic } from '@/app/manager/profile/profile_context/useManagerProfileLogic';

export default function ManagerProfileMain() {
  const {
    activeTab, setActiveTab,
    name, setName,
    phone, setPhone,
    currentPassword, setCurrentPassword,
    newPassword, setNewPassword,
    confirmPassword, setConfirmPassword,
    saving, mounted,
    user, displayInitial,
    handleSaveProfile, handleChangePassword,
  } = useManagerProfileLogic();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const tabs = [
    { id: 'personal' as const, label: 'Personal Info', icon: User },
    { id: 'security' as const, label: 'Security', icon: Lock },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="text-secondary mt-1 text-sm">Manage your account details and password.</p>
      </div>

      {/* Avatar + role card */}
      <div
        className="bg-card border border-border rounded-xl p-6 flex items-center gap-5 shadow-sm"
        style={{ background: 'linear-gradient(180deg, rgba(250,204,21,0.08), rgba(255,255,255,0.02))' }}
      >
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-black shrink-0">
          {mounted ? displayInitial : 'M'}
        </div>
        <div>
          <p className="text-lg font-bold text-foreground">{mounted ? (user?.name ?? 'Manager') : 'Manager'}</p>
          <p className="text-sm text-secondary">{mounted ? (user?.email ?? '') : ''}</p>
          <span className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-success-bg text-success text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-success motion-safe:animate-pulse" />
            Active
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-input border border-border rounded-xl p-1 w-fit">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              activeTab === id ? 'bg-card text-foreground shadow-sm' : 'text-secondary hover:text-foreground'
            }`}
          >
            <Icon size={16} strokeWidth={2} /> {label}
          </button>
        ))}
      </div>

      {/* Personal Info */}
      {activeTab === 'personal' && (
        <form onSubmit={handleSaveProfile} className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-5">
          <h2 className="text-base font-semibold text-foreground">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1.5">
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1.5">Email Address</label>
              <input
                type="email"
                value={mounted ? (user?.email ?? '') : ''}
                readOnly
                className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-secondary text-sm cursor-not-allowed opacity-60"
              />
              <p className="text-xs text-secondary mt-1">Email cannot be changed here.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1.5">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1.5">Role</label>
              <input
                type="text"
                value={mounted ? (user?.role ?? 'MANAGER') : 'MANAGER'}
                readOnly
                className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-secondary text-sm cursor-not-allowed opacity-60"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-black font-semibold rounded-lg text-sm shadow-lg shadow-primary/20 motion-safe:transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {saving ? <Loader2 size={16} strokeWidth={2} className="motion-safe:animate-spin" /> : <Save size={16} strokeWidth={2} />}
              Save Changes
            </button>
          </div>
        </form>
      )}

      {/* Security */}
      {activeTab === 'security' && (
        <form onSubmit={handleChangePassword} className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-5">
          <h2 className="text-base font-semibold text-foreground">Change Password</h2>
          <div className="space-y-4 max-w-md">
            {[
              { label: 'Current Password', value: currentPassword, setter: setCurrentPassword, show: showCurrent, toggle: () => setShowCurrent(v => !v) },
              { label: 'New Password', value: newPassword, setter: setNewPassword, show: showNew, toggle: () => setShowNew(v => !v) },
              { label: 'Confirm New Password', value: confirmPassword, setter: setConfirmPassword, show: showConfirm, toggle: () => setShowConfirm(v => !v) },
            ].map(({ label, value, setter, show, toggle }) => (
              <div key={label}>
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  {label} <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <input
                    type={show ? 'text' : 'password'}
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 pr-10 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
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
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-black font-semibold rounded-lg text-sm shadow-lg shadow-primary/20 motion-safe:transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {saving ? <Loader2 size={16} strokeWidth={2} className="motion-safe:animate-spin" /> : <Lock size={16} strokeWidth={2} />}
              Update Password
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
