import { http, HttpResponse } from "msw";
import { superadminAnalyticsV1Handlers } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_mocks/superadmin_analytics_mocks_handlers/SuperadminAnalyticsV1MockHandlers';
import { superadminBroadcastsHandlers } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_mocks/superadmin_broadcasts_mocks_handlers/SuperadminBroadcastsMockHandlers';
import { superadminBroadcastsV1Handlers } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_mocks/superadmin_broadcasts_mocks_handlers/SuperadminBroadcastsV1MockHandlers';
import { superadminComplianceHandlers } from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_mocks/superadmin_compliance_mocks_handlers/SuperadminComplianceMockHandlers';
import { superadminCouponsHandlers } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_mocks/superadmin_coupons_mocks_handlers/SuperadminCouponsMockHandlers';
import { superadminDashboardV1Handlers } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_mocks/superadmin_dashboard_mocks_handlers/SuperadminDashboardV1MockHandlers';
import { superadminFeaturesV1Handlers } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_mocks/superadmin_features_mocks_handlers/SuperadminFeaturesV1MockHandlers';
import { superadminGlobalAuditHandlers } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_mocks/superadmin_global_audit_mocks_handlers/SuperadminGlobalAuditMockHandlers';
import { superadminGlobalAuditV1Handlers } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_mocks/superadmin_global_audit_mocks_handlers/SuperadminGlobalAuditV1MockHandlers';
import { superadminGymDetailHandlers } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_handlers/SuperadminGymsGymDetailMockHandlers';
import { superadminGymsHandlers } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_handlers/SuperadminGymsMockHandlers';
import { superadminGymsV1Handlers } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_handlers/SuperadminGymsV1MockHandlers';
import { superadminInvoicesHandlers } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_mocks/superadmin_invoices_mocks_handlers/SuperadminInvoicesMockHandlers';
import { superadminInvoicesV1Handlers } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_mocks/superadmin_invoices_mocks_handlers/SuperadminInvoicesV1MockHandlers';
import { superadminMessagingV1Handlers } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_mocks/superadmin_messaging_mocks_handlers/SuperadminMessagingV1MockHandlers';
import { superadminMessagingV1WhatsAppHandlers } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_mocks/superadmin_messaging_whatsapp_mocks_handlers/SuperadminMessagingV1WhatsAppMockHandlers';
import { superadminPlansHandlers } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_mocks/superadmin_plans_mocks_handlers/SuperadminPlansMockHandlers';
import { superadminPlansV1Handlers } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_mocks/superadmin_plans_mocks_handlers/SuperadminPlansV1MockHandlers';
import { superadminReportsHandlers } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_mocks/superadmin_reports_mocks_handlers/SuperadminReportsMockHandlers';
import { superadminReportsV1Handlers } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_mocks/superadmin_reports_mocks_handlers/SuperadminReportsV1MockHandlers';
import { superadminSettingsHandlers } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_mocks/superadmin_settings_mocks_handlers/SuperadminSettingsMockHandlers';
import { superadminSettingsV1Handlers } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_mocks/superadmin_settings_mocks_handlers/SuperadminSettingsV1MockHandlers';
import { superadminBackupsV1Handlers } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_mocks/superadmin_system_ops_backups_mocks_handlers/SuperadminSystemOpsBackupsV1MockHandlers';
import { superadminInfrastructureV1Handlers } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_mocks/superadmin_system_ops_infrastructure_mocks_handlers/SuperadminSystemOpsInfrastructureV1MockHandlers';
import { superadminJobsV1Handlers } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_mocks/superadmin_system_ops_jobs_mocks_handlers/SuperadminSystemOpsJobsV1MockHandlers';
import { superadminSystemOpsHandlers } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_mocks/superadmin_system_ops_mocks_handlers/SuperadminSystemOpsMockHandlers';
import { superadminTeamHandlers } from '@/app/frontend_superadmin/superadmin_team/superadmin_team_mocks/superadmin_team_mocks_handlers/SuperadminTeamMockHandlers';
import { superadminTicketsV1Handlers } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_mocks/superadmin_tickets_mocks_handlers/SuperadminTicketsV1MockHandlers';
import { superadminUsageMetersHandlers } from '@/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_mocks/superadmin_usage_meters_mocks_handlers/SuperadminUsageMetersMockHandlers';
import { superadminWhiteLabelingHandlers } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_mocks/superadmin_white_labeling_mocks_handlers/SuperadminWhiteLabelingMockHandlers';
import { superadminTicketsHandlers } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_mocks/superadmin_tickets_mocks_handlers/SuperadminTicketsMockHandlers';
import { superadminProfileHandlers } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_mocks/superadmin_profile_mocks_handlers/SuperadminProfileMockHandlers';
import { superadminMigrationsHandlers } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_mocks/superadmin_system_ops_migrations_mocks_handlers/SuperadminSystemOpsMigrationsMockHandlers';
import { superadminInfrastructureHandlers } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_mocks/superadmin_system_ops_infrastructure_mocks_handlers/SuperadminSystemOpsInfrastructureMockHandlers';
import { superadminJobsHandlers } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_mocks/superadmin_system_ops_jobs_mocks_handlers/SuperadminSystemOpsJobsMockHandlers';
import { superadminBackupsHandlers } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_mocks/superadmin_system_ops_backups_mocks_handlers/SuperadminSystemOpsBackupsMockHandlers';
import { superadminMessagingHandlers } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_mocks/superadmin_messaging_mocks_handlers/SuperadminMessagingMockHandlers';
import { superadminIntegrationsHandlers } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_mocks/superadmin_integrations_mocks_handlers/SuperadminIntegrationsMockHandlers';
import { superadminDashboardHandlers } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_mocks/superadmin_dashboard_mocks_handlers/SuperadminDashboardMockHandlers';
import { superadminFeaturesHandlers } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_mocks/superadmin_features_mocks_handlers/SuperadminFeaturesMockHandlers';
import { superadminAffiliatesHandlers } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_mocks/superadmin_affiliates_mocks_handlers/SuperadminAffiliatesMockHandlers';
import { superadminAnalyticsHandlers } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_mocks/superadmin_analytics_mocks_handlers/SuperadminAnalyticsMockHandlers';

import { adminHandlers } from '@/app/admin/admin_layout/admin_mocks/handlers/AdminMockHandlers';
import { AuthMockHandlers } from '@/app/frontend_auth/auth/auth_mocks/auth_mock_handlers/AuthMockHandlers';
import { landingHandlers } from '@/app/frontend_public/landing/landing_mocks/PublicLandingMockHandlers';
import { managerHandlers } from '@/app/manager/manager_mocks/ManagerMockHandlers';

import { trainerAttendanceHandlers } from '@/app/trainer/attendance/attendance_mocks/handlers/TrainerAttendanceMockHandlers';
import { trainerDashboardHandlers } from '@/app/trainer/dashboard/dashboard_mocks/handlers/TrainerDashboardMockHandlers';
import { trainerEarningsHandlers } from '@/app/trainer/earnings/earnings_mocks/handlers/TrainerEarningsMockHandlers';
import { trainerMembersHandlers } from '@/app/trainer/members/members_mocks/handlers/TrainerMembersMockHandlers';
import { trainerProgressHandlers } from '@/app/trainer/progress-tracking/progress-tracking_mocks/handlers/TrainerProgressMockHandlers';
import { trainerScheduleHandlers } from '@/app/trainer/schedule/schedule_mocks/handlers/TrainerScheduleMockHandlers';
import { trainerSessionsHandlers } from '@/app/trainer/sessions/sessions_mocks/handlers/TrainerSessionsMockHandlers';
import { trainerWorkoutMockHandlers } from '@/app/trainer/workout/workout_mocks/handlers/TrainerWorkoutMockHandlers';
import { trainerLibraryHandlers } from '@/app/trainer/library/library_mocks/handlers/TrainerLibraryMockHandlers';
import { trainerProfileHandlers } from '@/app/trainer/profile/profile_mocks/handlers/TrainerProfileMockHandlers';
import { trainerNotificationsHandlers } from '@/app/trainer/notifications/notifications_mocks/handlers/TrainerNotificationsMockHandlers';

export const handlers = [
  ...superadminAnalyticsV1Handlers,
  ...superadminBroadcastsHandlers,
  ...superadminBroadcastsV1Handlers,
  ...superadminComplianceHandlers,
  ...superadminCouponsHandlers,
  ...superadminDashboardV1Handlers,
  ...superadminFeaturesV1Handlers,
  ...superadminGlobalAuditHandlers,
  ...superadminGlobalAuditV1Handlers,
  ...superadminGymDetailHandlers,
  ...superadminGymsHandlers,
  ...superadminGymsV1Handlers,
  ...superadminInvoicesHandlers,
  ...superadminInvoicesV1Handlers,
  ...superadminMessagingV1Handlers,
  ...superadminMessagingV1WhatsAppHandlers,
  ...superadminPlansHandlers,
  ...superadminPlansV1Handlers,
  ...superadminReportsHandlers,
  ...superadminReportsV1Handlers,
  ...superadminSettingsHandlers,
  ...superadminSettingsV1Handlers,
  ...superadminBackupsV1Handlers,
  ...superadminInfrastructureV1Handlers,
  ...superadminJobsV1Handlers,
  ...superadminSystemOpsHandlers,
  ...superadminTeamHandlers,
  ...superadminTicketsV1Handlers,
  ...superadminUsageMetersHandlers,
  ...superadminWhiteLabelingHandlers,
  http.get("/api/health", () => {
    return HttpResponse.json({ status: "ok" });
  }),
  ...adminHandlers,
  ...AuthMockHandlers,
  ...landingHandlers,
  ...managerHandlers,
  ...superadminTicketsHandlers,
  ...superadminProfileHandlers,
  ...superadminMigrationsHandlers,
  ...superadminInfrastructureHandlers,
  ...superadminJobsHandlers,
  ...superadminBackupsHandlers,
  ...superadminMessagingHandlers,
  ...superadminIntegrationsHandlers,
  ...superadminDashboardHandlers,
  ...superadminFeaturesHandlers,
  ...superadminAffiliatesHandlers,
  ...superadminAnalyticsHandlers,
  ...trainerAttendanceHandlers,
  ...trainerDashboardHandlers,
  ...trainerEarningsHandlers,
  ...trainerMembersHandlers,
  ...trainerProgressHandlers,
  ...trainerScheduleHandlers,
  ...trainerSessionsHandlers,
  ...trainerWorkoutMockHandlers,
  ...trainerLibraryHandlers,
  ...trainerProfileHandlers,
  ...trainerNotificationsHandlers,
];
