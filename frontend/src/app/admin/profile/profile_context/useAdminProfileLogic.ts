// RESPONSIBILITY: Logic hook for the Admin Profile page — personal info + password change.
// DATA FLOW: adminProfileApi → useAdminProfileLogic → AdminProfileMain

'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { adminProfileApi } from '@/app/admin/profile/profile_api/AdminProfileApi';
import { getUser } from '@/lib/api';
import type { ProfileTab } from '@/app/admin/profile/profile_types/AdminProfileTypes';

export function useAdminProfileLogic() {
  const [activeTab, setActiveTab] = useState<ProfileTab>('personal');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Dependency: [] — runs once on mount to hydrate from cookie-stored user
  useEffect(() => {
    setMounted(true);
    const user = getUser();
    if (user) {
      setName(user.name ?? '');
    }
  }, []);

  const user = mounted ? getUser() : null;
  const displayInitial = (user?.name ?? 'A').charAt(0).toUpperCase();

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await adminProfileApi.updateProfile({ name, phone });
      toast.success(res.message || 'Profile updated.');
    } catch {
      toast.error('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }
    setSaving(true);
    try {
      const res = await adminProfileApi.updatePassword({ currentPassword, newPassword, confirmPassword });
      toast.success(res.message || 'Password updated.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      toast.error('Failed to update password.');
    } finally {
      setSaving(false);
    }
  }

  return {
    activeTab, setActiveTab,
    name, setName,
    phone, setPhone,
    currentPassword, setCurrentPassword,
    newPassword, setNewPassword,
    confirmPassword, setConfirmPassword,
    saving, mounted,
    user, displayInitial,
    handleSaveProfile, handleChangePassword,
  };
}
