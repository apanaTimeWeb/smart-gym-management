'use client';
/** Coordinates the Manager / feature. */
import { useQuery } from '@tanstack/react-query';
import { managerProfileApi } from '@/app/manager/profile/profile_api/ManagerProfileApi';

export function useManagerProfileQuery() {
  return useQuery({ queryKey: ['manager', 'profile', 'current'], queryFn: managerProfileApi.fetchProfile });
}
