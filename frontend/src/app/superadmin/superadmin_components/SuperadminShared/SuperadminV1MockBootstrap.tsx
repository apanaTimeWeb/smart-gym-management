// RESPONSIBILITY: Registers Superadmin-owned MSW handlers after the global MSW worker starts. No feature data lives here.
'use client';
import { useEffect } from 'react';
import { worker } from '@/mocks/browser';
import { superadminAnalyticsV1Handlers } from '@/app/superadmin/analytics/analytics_mocks/handlers/SuperadminAnalyticsV1MockHandlers';
import { superadminBackupsV1Handlers } from '@/app/superadmin/backups/backups_mocks/handlers/SuperadminBackupsV1MockHandlers';
import { superadminBranchesV1Handlers } from '@/app/superadmin/branches/branches_mocks/handlers/SuperadminBranchesV1MockHandlers';
import { superadminBroadcastsV1Handlers } from '@/app/superadmin/broadcasts/broadcasts_mocks/handlers/SuperadminBroadcastsV1MockHandlers';
import { superadminCancellationsV1Handlers } from '@/app/superadmin/cancellations/cancellations_mocks/handlers/SuperadminCancellationsV1MockHandlers';
import { superadminComplianceHandlers } from '@/app/superadmin/compliance/compliance_mocks/handlers/SuperadminComplianceMockHandlers';
import { superadminDashboardV1Handlers } from '@/app/superadmin/dashboard/dashboard_mocks/handlers/SuperadminDashboardV1MockHandlers';
import { superadminFeaturesV1Handlers } from '@/app/superadmin/features/features_mocks/handlers/SuperadminFeaturesV1MockHandlers';
import { superadminFranchisesV1Handlers } from '@/app/superadmin/franchises/franchises_mocks/handlers/SuperadminFranchisesV1MockHandlers';
import { superadminGlobalAuditV1Handlers } from '@/app/superadmin/global-audit/global-audit_mocks/handlers/SuperadminGlobalAuditV1MockHandlers';
import { superadminGymDetailV1Handlers } from '@/app/superadmin/gyms/gyms_mocks/handlers/SuperadminGymDetailV1MockHandlers';
import { superadminGymsV1Handlers } from '@/app/superadmin/gyms/gyms_mocks/handlers/SuperadminGymsV1MockHandlers';
import { superadminInfrastructureV1Handlers } from '@/app/superadmin/infrastructure/infrastructure_mocks/handlers/SuperadminInfrastructureV1MockHandlers';
import { superadminIntegrationsHandlers } from '@/app/superadmin/integrations/integrations_mocks/handlers/SuperadminIntegrationsMockHandlers';
import { superadminInvoicesV1Handlers } from '@/app/superadmin/invoices/invoices_mocks/handlers/SuperadminInvoicesV1MockHandlers';
import { superadminJobsV1Handlers } from '@/app/superadmin/jobs/jobs_mocks/handlers/SuperadminJobsV1MockHandlers';
import { superadminMessagingV1Handlers } from '@/app/superadmin/messaging/messaging_mocks/handlers/SuperadminMessagingV1MockHandlers';
import { superadminMessagingV1WhatsAppHandlers } from '@/app/superadmin/messaging/messaging_whatsapp_mocks/handlers/SuperadminMessagingV1WhatsAppMockHandlers';
import { superadminOffboardingHandlers } from '@/app/superadmin/offboarding/offboarding_mocks/handlers/SuperadminOffboardingMockHandlers';
import { superadminOnboardingV1Handlers } from '@/app/superadmin/onboarding/onboarding_mocks/handlers/SuperadminOnboardingV1MockHandlers';
import { superadminPlansV1Handlers } from '@/app/superadmin/plans/plans_mocks/handlers/SuperadminPlansV1MockHandlers';
import { superadminReportsV1Handlers } from '@/app/superadmin/reports/reports_mocks/handlers/SuperadminReportsV1MockHandlers';
import { superadminSegmentsHandlers } from '@/app/superadmin/segments/segments_mocks/handlers/SuperadminSegmentsMockHandlers';
import { superadminSettingsV1Handlers } from '@/app/superadmin/settings/settings_mocks/handlers/SuperadminSettingsV1MockHandlers';
import { superadminTeamHandlers } from '@/app/superadmin/team/team_mocks/handlers/SuperadminTeamMockHandlers';
import { superadminTicketsV1Handlers } from '@/app/superadmin/tickets/tickets_mocks/handlers/SuperadminTicketsV1MockHandlers';
let isRegistered = false;

if (typeof window !== 'undefined' && !isRegistered) {
    worker.use(...superadminTeamHandlers, ...superadminIntegrationsHandlers, ...superadminOffboardingHandlers, ...superadminComplianceHandlers, ...superadminSegmentsHandlers, ...superadminDashboardV1Handlers, ...superadminGymsV1Handlers, ...superadminGymDetailV1Handlers, ...superadminPlansV1Handlers, ...superadminInvoicesV1Handlers, ...superadminAnalyticsV1Handlers, ...superadminReportsV1Handlers, ...superadminOnboardingV1Handlers, ...superadminCancellationsV1Handlers, ...superadminFranchisesV1Handlers, ...superadminBranchesV1Handlers, ...superadminBroadcastsV1Handlers, ...superadminMessagingV1Handlers, ...superadminMessagingV1WhatsAppHandlers, ...superadminTicketsV1Handlers, ...superadminFeaturesV1Handlers, ...superadminInfrastructureV1Handlers, ...superadminJobsV1Handlers, ...superadminBackupsV1Handlers, ...superadminGlobalAuditV1Handlers, ...superadminSettingsV1Handlers);
    isRegistered = true;
}

export default function SuperadminV1MockBootstrap() {
    return null;
}
