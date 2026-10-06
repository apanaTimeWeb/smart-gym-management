// RESPONSIBILITY: Provides debounced Admin header member search through the existing Admin Members API client.
/**
 * @description useAdminMembersHeaderSearch derives the debounced member search presentation state used by the members header search control.
 * @dependencies Consumes only the owning module form/schema/mutation contract.
 * @edge-case Preserves validation, cancel, and failed-submit recovery without leaking business state.
 */
"use client";
import { ADMIN_MEMBERS_QUERY_KEYS } from '@/app/frontend_admin/admin_members/admin_members_constants/AdminMembersQueryKeys';
// DATA FLOW: Header input → useAdminMembersHeaderSearch → AdminMembersApi → TanStack Query → AdminHeaderSearch
import { useQuery } from '@tanstack/react-query';
import { useAdminMembersDebounce } from '@/app/frontend_admin/admin_members/admin_members_hooks/useAdminMembersDebounce';
import { AdminMembersApi } from '@/app/frontend_admin/admin_members/admin_members_api/AdminMembersApi';
import type { AdminMember } from '@/app/frontend_admin/admin_members/admin_members_types/AdminMembersTypes';

/** Coordinates MembersHeaderSearch state, data flow, and feature behavior. */
export function useAdminMembersHeaderSearch(search: string) {
  const debouncedSearch = useAdminMembersDebounce(search, 300);
  return useQuery<AdminMember[]>({
    queryKey: ADMIN_MEMBERS_QUERY_KEYS.key('header-search', 'members', debouncedSearch),
    queryFn: async () => {
      const response = await AdminMembersApi.fetchMembers({ search: debouncedSearch, page: 1, limit: 5 });
      return response.data ?? [];
    },
    enabled: debouncedSearch.trim().length > 0,
    staleTime: 30_000,
  });
}
