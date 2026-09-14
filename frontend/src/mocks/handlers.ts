import { http, HttpResponse } from "msw";
import { superadminGymsHandlers } from './handlers/superadmin-gyms.handlers';
import { superadminDashboardHandlers } from './handlers/superadmin-dashboard.handlers';
import { superadminPlansHandlers } from './handlers/superadmin-plans.handlers';
import { superadminSystemHandlers } from './handlers/superadmin-system.handlers';
import { superadminSettingsHandlers } from './handlers/superadmin-settings.handlers';
import { superadminMigrationsHandlers } from './handlers/superadmin-migrations.handlers';
import { superadminInfrastructureHandlers } from './handlers/superadmin-infrastructure.handlers';
import { superadminJobsHandlers } from './handlers/superadmin-jobs.handlers';
import { superadminBroadcastsHandlers } from './handlers/superadmin-broadcasts.handlers';
import { superadminGlobalAuditHandlers } from './handlers/superadmin-global-audit.handlers';

export const handlers = [
  http.get("/api/health", () => {
    return HttpResponse.json({ status: "ok" });
  }),
  ...superadminGymsHandlers,
  ...superadminDashboardHandlers,
  ...superadminPlansHandlers,
  ...superadminSystemHandlers,
  ...superadminSettingsHandlers,
  ...superadminMigrationsHandlers,
  ...superadminInfrastructureHandlers,
  ...superadminJobsHandlers,
  ...superadminBroadcastsHandlers,
  ...superadminGlobalAuditHandlers,
];
