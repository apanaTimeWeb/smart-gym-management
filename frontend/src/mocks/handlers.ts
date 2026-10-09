import { http, HttpResponse } from "msw";
import { superadminBroadcastsHandlers } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_mocks/superadmin_broadcasts_mocks_handlers/SuperadminBroadcastsMockHandlers';
import { superadminComplianceHandlers } from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_mocks/superadmin_compliance_mocks_handlers/SuperadminComplianceMockHandlers';
import { superadminCouponsHandlers } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_mocks/superadmin_coupons_mocks_handlers/SuperadminCouponsMockHandlers';
import { superadminGlobalAuditHandlers } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_mocks/superadmin_global_audit_mocks_handlers/SuperadminGlobalAuditMockHandlers';
import { superadminGymDetailHandlers } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_handlers/SuperadminGymsGymDetailMockHandlers';
import { superadminGymsHandlers } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_handlers/SuperadminGymsMockHandlers';
import { superadminInvoicesHandlers } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_mocks/superadmin_invoices_mocks_handlers/SuperadminInvoicesMockHandlers';
import { superadminPlansHandlers } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_mocks/superadmin_plans_mocks_handlers/SuperadminPlansMockHandlers';
import { superadminReportsHandlers } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_mocks/superadmin_reports_mocks_handlers/SuperadminReportsMockHandlers';
import { superadminSettingsHandlers } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_mocks/superadmin_settings_mocks_handlers/SuperadminSettingsMockHandlers';
import { superadminSystemOpsHandlers } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_mocks/superadmin_system_ops_mocks_handlers/SuperadminSystemOpsMockHandlers';
import { superadminTeamHandlers } from '@/app/frontend_superadmin/superadmin_team/superadmin_team_mocks/superadmin_team_mocks_handlers/SuperadminTeamMockHandlers';
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

import { adminHandlers } from '@/app/frontend_admin/AdminMswBootstrap';
import { AuthMockHandlers } from '@/app/frontend_auth/auth/auth_mocks/auth_mock_handlers/AuthMockHandlers';
import { landingHandlers } from '@/app/frontend_public/landing/landing_mocks/PublicLandingMockHandlers';
import { managerHandlers } from '@/app/frontend_manager/manager_mocks/ManagerMockHandlers';

import { TrainerAttendanceMockHandlers } from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_mocks/trainer_attendance_handlers/TrainerAttendanceMockHandlers';
import { TrainerDashboardMockHandlers } from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_mocks/trainer_dashboard_handlers/TrainerDashboardMockHandlers';
import { TrainerEarningsMockHandlers } from '@/app/frontend_trainer/trainer_earnings/trainer_earnings_mocks/trainer_earnings_handlers/TrainerEarningsMockHandlers';
import { TrainerMembersMockHandlers } from '@/app/frontend_trainer/trainer_members/trainer_members_mocks/trainer_members_handlers/TrainerMembersMockHandlers';
import { TrainerProgressTrackingMockHandlers } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_mocks/trainer_progress_tracking_handlers/TrainerProgressTrackingMockHandlers';
import { TrainerScheduleMockHandlers } from '@/app/frontend_trainer/trainer_schedule/trainer_schedule_mocks/trainer_schedule_handlers/TrainerScheduleMockHandlers';
import { TrainerSessionsMockHandlers } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_mocks/trainer_sessions_handlers/TrainerSessionsMockHandlers';
import { TrainerWorkoutMockHandlers } from '@/app/frontend_trainer/trainer_workout/trainer_workout_mocks/trainer_workout_handlers/TrainerWorkoutMockHandlers';
import { TrainerLibraryMockHandlers } from '@/app/frontend_trainer/trainer_library/trainer_library_mocks/trainer_library_handlers/TrainerLibraryMockHandlers';
import { TrainerProfileMockHandlers } from '@/app/frontend_trainer/trainer_profile/trainer_profile_mocks/trainer_profile_handlers/TrainerProfileMockHandlers';
import { TrainerNotificationsMockHandlers } from '@/app/frontend_trainer/trainer_notifications/trainer_notifications_mocks/trainer_notifications_handlers/TrainerNotificationsMockHandlers';

export const handlers = [
  ...superadminBroadcastsHandlers,
  ...superadminComplianceHandlers,
  ...superadminCouponsHandlers,
  ...superadminGlobalAuditHandlers,
  ...superadminGymDetailHandlers,
  ...superadminGymsHandlers,
  ...superadminInvoicesHandlers,
  ...superadminPlansHandlers,
  ...superadminReportsHandlers,
  ...superadminSettingsHandlers,
  ...superadminSystemOpsHandlers,
  ...superadminTeamHandlers,
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
  ...TrainerAttendanceMockHandlers,
  ...TrainerDashboardMockHandlers,
  ...TrainerEarningsMockHandlers,
  ...TrainerMembersMockHandlers,
  ...TrainerProgressTrackingMockHandlers,
  ...TrainerScheduleMockHandlers,
  ...TrainerSessionsMockHandlers,
  ...TrainerWorkoutMockHandlers,
  ...TrainerLibraryMockHandlers,
  ...TrainerProfileMockHandlers,
  ...TrainerNotificationsMockHandlers,
];
