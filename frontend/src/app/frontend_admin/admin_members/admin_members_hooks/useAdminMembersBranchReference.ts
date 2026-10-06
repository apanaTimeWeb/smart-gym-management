"use client";
// RESPONSIBILITY: Provides minimal branch options to the Admin members UI without cross-module imports.
import { ADMIN_MEMBERS_QUERY_KEYS } from '@/app/frontend_admin/admin_members/admin_members_constants/AdminMembersQueryKeys';
// DATA FLOW: AdminMembersBranchReferenceApi → TanStack Query → Admin members component.
import { useQuery } from '@tanstack/react-query';
import { AdminMembersBranchReferenceApi } from '@/app/frontend_admin/admin_members/admin_members_api/AdminMembersBranchReferenceApi';
/**
 * @description useAdminMembersBranchReference: Provides minimal branch options to the Admin members UI without cross-module imports.
 * @dependencies Consumes AdminMembersQueryKeys, AdminMembersBranchReferenceApi.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminMembersBranchReference() {
  return useQuery({ queryKey: ADMIN_MEMBERS_QUERY_KEYS.key('branch-reference'), queryFn: async () => (await AdminMembersBranchReferenceApi.fetchMemberBranchReferences()).data?.items ?? [], staleTime: 300000 });
}
