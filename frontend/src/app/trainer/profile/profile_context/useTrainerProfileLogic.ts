// RESPONSIBILITY: Logic hook for Trainer Profile page — personal info + password change.
// DATA FLOW: trainerProfileApi → useTrainerProfileLogic → TrainerProfileMain
'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { trainerProfileApi } from '@/app/trainer/profile/profile_api/TrainerProfileApi';
import { getUser } from '@/lib/api';
import type { TrainerProfileTab } from '@/app/trainer/profile/profile_types/TrainerProfileTypes';

export function useTrainerProfileLogic() {
  const [activeTab, setActiveTab] = useState<TrainerProfileTab>('personal');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Dependency: [] — runs once on mount to hydrate from cookie-stored user
  useEffect(() => {
    setMounted(true);
    const user = getUser();
    if (user) setName(user.name ?? '');
  }, []);

  const user = mounted ? getUser() : null;
  const displayInitial = (user?.name ?? 'T').charAt(0).toUpperCase();

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await trainerProfileApi.updateProfile({ name, phone, specialization });
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
      const res = await trainerProfileApi.updatePassword({ currentPassword, newPassword, confirmPassword });
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
    specialization, setSpecialization,
    currentPassword, setCurrentPassword,
    newPassword, setNewPassword,
    confirmPassword, setConfirmPassword,
    saving, mounted,
    user, displayInitial,
    handleSaveProfile, handleChangePassword,
  };
}
