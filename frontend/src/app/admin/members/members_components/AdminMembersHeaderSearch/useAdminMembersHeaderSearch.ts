"use client";

// RESPONSIBILITY: Provides debounced Admin header member search through the existing Admin Members API client.
// DATA FLOW: Header input → useAdminMembersHeaderSearch → AdminMembersApi → TanStack Query → AdminHeaderSearch
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@/app/admin/admin_layout/admin_utils/useAdminDebounce';
import { adminMembersApi } from '@/app/admin/members/members_api/AdminMembersApi';
import type { AdminMember } from '@/app/admin/members/members_types/AdminMembersTypes';

/** Coordinates MembersHeaderSearch state, data flow, and feature behavior. */
export function useAdminMembersHeaderSearch(search: string) {
  const debouncedSearch = useDebounce(search, 300);
  return useQuery<AdminMember[]>({
    queryKey: ['admin', 'header-search', 'members', debouncedSearch],
    queryFn: async () => {
      const response = await adminMembersApi.fetchMembers({ search: debouncedSearch, page: 1, limit: 5 });
      return response.data ?? [];
    },
    enabled: debouncedSearch.trim().length > 0,
    staleTime: 30_000,
  });
}
