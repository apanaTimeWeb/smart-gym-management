"use client";
// RESPONSIBILITY: Owns the authenticated shell's branch-scope selector UI while the Branches feature owns its business data and options.
// DATA FLOW: Branches API → TanStack Query → selector → URL branchId → feature query keys/request scope.
import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Building2 } from 'lucide-react';
import { branchesApi } from '@/app/admin/branches/branches_api/AdminBranchesApi';
import { AdminSearchableDropdown } from '@/app/admin/admin_layout/AdminShared/AdminSearchableDropdown/AdminSearchableDropdown';
import type { Branch } from '@/app/admin/branches/branches_types/AdminBranchesTypes';

export default function AdminBranchesHeaderSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: branchesResponse } = useQuery({ queryKey: ['admin', 'branches', 'list', 'selector'], queryFn: () => branchesApi.fetchBranches(), staleTime: 5 * 60 * 1000 });
  const branches: Branch[] = Array.isArray(branchesResponse?.data) ? branchesResponse.data : [];
  const selectedBranchId = searchParams.get('branchId') || 'all';

  const branchOptions = useMemo(() => [
    { value: 'all', label: 'All Branches (Aggregate)' },
    ...branches.map((branch: Branch) => ({ value: branch.id, label: branch.name })),
  ], [branches]);

  const handleChange = useCallback((value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    const next = String(value);
    if (next === 'all') params.delete('branchId');
    else params.set('branchId', next);
    params.delete('page');
    router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false });
  }, [pathname, router, searchParams]);

  return (
    <div className="hidden lg:flex items-center gap-2 bg-header border border-border rounded-lg px-3 py-1.5">
      <Building2 size={15} className="text-primary shrink-0" aria-hidden="true" />
      <AdminSearchableDropdown
        options={branchOptions}
        value={selectedBranchId}
        onChange={handleChange}
        className="w-52"
        placeholder="Select branch"
      />
    </div>
  );
}
