"use client";
// RESPONSIBILITY: Provides minimal branch options to the Admin hr UI without cross-module imports.
// DATA FLOW: AdminHrBranchReferenceApi → TanStack Query → Admin hr component.
import { useQuery } from '@tanstack/react-query';
import { AdminHrBranchReferenceApi } from '@/app/admin/hr/hr_api/AdminHrBranchReferenceApi';
/** Coordinates HrBranchReference state, data flow, and feature behavior. */
export function useAdminHrBranchReference() {
  return useQuery({ queryKey: ['admin','hr','branch-reference'], queryFn: async () => (await AdminHrBranchReferenceApi.fetchHrBranchReferences()).data ?? [], staleTime: 300000 });
}
