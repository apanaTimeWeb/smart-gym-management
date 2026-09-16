'use client';
// RESPONSIBILITY: Encapsulates functionality for useSuperadminProfilePage.ts
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { superadminProfileApi } from '@/app/superadmin/profile/profile_api/superadmin_profile_api';
import type {
  ProfileTab,
  UpdateSuperadminProfilePayload,
  UpdateSuperadminPasswordPayload,
  Toggle2FAPayload,
} from '@/app/superadmin/profile/profile_types/SuperadminProfileTypes';

export function useSuperadminProfilePage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<ProfileTab>('personal');

  const { data: profileRes, isLoading: profileLoading } = useQuery({
    queryKey: ['superadmin', 'profile'],
    queryFn: () => superadminProfileApi.fetchProfile(),
  });

  const profile = profileRes?.data || null;

  const updatePersonalMutation = useMutation({
    mutationFn: (payload: UpdateSuperadminProfilePayload) => superadminProfileApi.updateProfile(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'profile'] });
      toast.success(res.message);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    }
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (payload: UpdateSuperadminPasswordPayload) => superadminProfileApi.updatePassword(payload),
    onSuccess: (res) => {
      toast.success(res.message);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    }
  });

  const toggle2FAMutation = useMutation({
    mutationFn: (payload: Toggle2FAPayload) => superadminProfileApi.toggle2FA(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'profile'] });
      toast.success(res.message);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    }
  });

  return {
    activeTab, setActiveTab,
    profile, profileLoading,
    personalState: updatePersonalMutation.isPending ? 'loading' : 'idle', updatePersonalMutation,
    passwordState: updatePasswordMutation.isPending ? 'loading' : 'idle', updatePasswordMutation,
    twoFAState: toggle2FAMutation.isPending ? 'loading' : 'idle', toggle2FAMutation,
  };
}

