// DATA FLOW: MSW/Backend → fetchMessagingTemplateInsights() → TanStack Query → Message Templates & Campaign Results UI
// RESPONSIBILITY: Owns query orchestration for Message Templates & Campaign Results. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchMessagingTemplateInsights } from '@/app/superadmin/messaging/messaging_api/superadmin_messaging_template_insights_api';
export function useSuperadminMessagingV1() {
    return useQuery({ queryKey: ['superadmin', 'messaging_template_insights'], queryFn: fetchMessagingTemplateInsights });
}
