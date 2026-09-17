// DATA FLOW: MSW/Backend → fetchBackupsHealth() → TanStack Query → Backup Safety & Restore Readiness UI
// RESPONSIBILITY: Owns query orchestration for Backup Safety & Restore Readiness. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchBackupsHealth } from '@/app/superadmin/backups/backups_api/superadmin_backups_health_api';
export function useSuperadminBackupsV1() {
    return useQuery({ queryKey: ['superadmin', 'backups_health'], queryFn: fetchBackupsHealth });
}
