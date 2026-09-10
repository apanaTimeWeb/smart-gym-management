import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { superadminProfileApi } from '@/app/superadmin/profile/profile_api/superadmin_profile_api';
import type { FetchState } from '@/app/superadmin/superadmin_types/superadmin_types';
import type {
  ProfileTab,
  UpdateSuperadminProfilePayload,
  UpdateSuperadminPasswordPayload,
  Toggle2FAPayload,
} from '@/app/superadmin/profile/profile_types/SuperadminProfileTypes';

export function useProfilePage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<ProfileTab>('personal');
  const [personalState, setPersonalState] = useState<FetchState>('idle');
  const [passwordState, setPasswordState] = useState<FetchState>('idle');
  const [twoFAState, setTwoFAState] = useState<FetchState>('idle');

  const { data: profileRes, isLoading: profileLoading } = useQuery({
    queryKey: ['superadmin', 'profile'],
    queryFn: () => superadminProfileApi.fetchProfile(),
  });

  const profile = profileRes?.data || null;

  const updatePersonalMutation = useMutation({
    mutationFn: (payload: UpdateSuperadminProfilePayload) => superadminProfileApi.updateProfile(payload),
    onMutate: () => setPersonalState('loading'),
    onSuccess: (res) => {
      setPersonalState('success');
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'profile'] });
      toast.success(res.message || 'Profile updated successfully.', { id: 'profile-update' });
    },
    onError: (err: any) => {
      setPersonalState('error');
      toast.error(err.message || 'Failed to update profile.', { id: 'profile-update-error' });
    }
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (payload: UpdateSuperadminPasswordPayload) => superadminProfileApi.updatePassword(payload),
    onMutate: () => setPasswordState('loading'),
    onSuccess: (res) => {
      setPasswordState('success');
      toast.success(res.message || 'Password updated successfully.', { id: 'password-update' });
    },
    onError: (err: any) => {
      setPasswordState('error');
      toast.error(err.message || 'Failed to update password.', { id: 'password-update-error' });
    }
  });

  const toggle2FAMutation = useMutation({
    mutationFn: (payload: Toggle2FAPayload) => superadminProfileApi.toggle2FA(payload),
    onMutate: () => setTwoFAState('loading'),
    onSuccess: (res) => {
      setTwoFAState('success');
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'profile'] });
      toast.success(res.message || '2FA settings updated.', { id: '2fa-update' });
    },
    onError: (err: any) => {
      setTwoFAState('error');
      toast.error(err.message || 'Failed to update 2FA settings.', { id: '2fa-update-error' });
    }
  });

  return {
    activeTab, setActiveTab,
    profile, profileLoading,
    personalState, updatePersonalMutation,
    passwordState, updatePasswordMutation,
    twoFAState, toggle2FAMutation,
  };
}
