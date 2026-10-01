import { http, HttpResponse } from "msw";
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
