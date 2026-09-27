"use client";
// RESPONSIBILITY: Provides minimal branch options to the Admin members UI without cross-module imports.
// DATA FLOW: AdminMembersBranchReferenceApi → TanStack Query → Admin members component.
import { useQuery } from '@tanstack/react-query';
import { AdminMembersBranchReferenceApi } from '@/app/admin/members/members_api/AdminMembersBranchReferenceApi';
/** Coordinates MembersBranchReference state, data flow, and feature behavior. */
export function useAdminMembersBranchReference() {
  return useQuery({ queryKey: ['admin','members','branch-reference'], queryFn: async () => (await AdminMembersBranchReferenceApi.fetchMemberBranchReferences()).data?.items ?? [], staleTime: 300000 });
}
