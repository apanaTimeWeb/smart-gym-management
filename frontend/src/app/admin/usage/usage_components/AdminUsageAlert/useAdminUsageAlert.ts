// DATA FLOW: Admin usage query/state → useAdminUsageAlert → AdminUsageAlert shell component.
"use client";
// RESPONSIBILITY: Fetches Admin subscription usage for the shell-level warning banner without owning business mutations.
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminUsageApi } from '@/app/admin/usage/usage_api/AdminUsageApi';
import { USAGE_WARNING_THRESHOLD } from '@/app/admin/usage/usage_utils/AdminUsageSharedConstants';

/** Coordinates UsageAlert state, data flow, and feature behavior. */
export function useAdminUsageAlert() {
  const [isVisible, setIsVisible] = useState(true);
  const query = useQuery({
    queryKey: ['admin', 'usage', 'current'],
    queryFn: async () => (await adminUsageApi.fetchMyUsage()).data,
    staleTime: 60_000,
  });

  const usageData = query.data ?? null;
  const getUsageRatio = (used: number, limit: number) => limit > 0 ? used / limit : 0;
  const maxRatio = usageData
    ? Math.max(
        getUsageRatio(usageData.smsSent, usageData.smsLimit),
        getUsageRatio(usageData.databaseGb + usageData.mediaGb, usageData.storageLimitGb),
        getUsageRatio(usageData.activeMembers, usageData.memberLimit),
        getUsageRatio(usageData.staffCount, usageData.staffLimit),
      )
    : 0;

  return {
    usageData,
    isVisible,
    setIsVisible,
    shouldShow: Boolean(usageData && isVisible && maxRatio >= USAGE_WARNING_THRESHOLD),
    isLimitReached: maxRatio >= 1,
    maxRatio,
  };
}
