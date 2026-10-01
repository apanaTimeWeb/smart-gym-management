import { Activity, Database, HardDrive, Server } from 'lucide-react';


import { SuperadminSystemOpsSystemOpsFormatDateTime } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_utils/SuperadminSystemOpsSystemOpsFormatDateTime';

import type { SuperadminSystemOpsSummary } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_types/SuperadminSystemOpsTypes';
import type { SuperadminSystemOpsDashboardCardDefinition } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_types/SuperadminSystemOpsDashboardTypes';
import { SuperadminSystemOpsUrlConfig } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_url_config';

const formatBackupDate = SuperadminSystemOpsSystemOpsFormatDateTime

export const SUPERADMIN_SYSTEM_OPS_CARD_DEFINITIONS: readonly SuperadminSystemOpsDashboardCardDefinition[] = [
  {
    key: 'infrastructure',
    titleKey: 'ui.card_infrastructure_title',
    descriptionKey: 'ui.card_infrastructure_description',
    href: SuperadminSystemOpsUrlConfig.PAGES.INFRASTRUCTURE,
    icon: Server,
    labelKey: 'ui.card_status_label',
    getLabelValues: (summary: any) => ({ status: summary.infrastructureStatus }),
    toneClass: 'bg-info-bg text-info',
  },
  {
    key: 'jobs',
    titleKey: 'ui.card_jobs_title',
    descriptionKey: 'ui.card_jobs_description',
    href: SuperadminSystemOpsUrlConfig.PAGES.JOBS,
    icon: Activity,
    labelKey: 'ui.card_jobs_label',
    getLabelValues: (summary: any) => ({ count: summary.pendingJobs }),
    toneClass: 'bg-warning-bg text-warning',
  },
  {
    key: 'backups',
    titleKey: 'ui.card_backups_title',
    descriptionKey: 'ui.card_backups_description',
    href: SuperadminSystemOpsUrlConfig.PAGES.BACKUPS,
    icon: HardDrive,
    labelKey: 'ui.card_backup_label',
    getLabelValues: (summary: any, locale: any) => ({ lastRun: formatBackupDate(summary.lastBackupAt, locale) }),
    toneClass: 'bg-success-bg text-success',
  },
  {
    key: 'migrations',
    titleKey: 'ui.card_migrations_title',
    descriptionKey: 'ui.card_migrations_description',
    href: SuperadminSystemOpsUrlConfig.PAGES.MIGRATIONS,
    icon: Database,
    labelKey: 'ui.card_status_label',
    getLabelValues: (summary: any) => ({ status: summary.migrationStatus }),
    toneClass: 'bg-primary-subtle text-primary',
  },
] as const;

export const SUPERADMIN_SYSTEM_OPS_DASHBOARD_CARD_KEYS = ['infrastructure','jobs','backups','migrations'] as const;
export const SUPERADMIN_SYSTEM_OPS_DASHBOARD_CARD_TITLE_KEYS = ['ui.card_infrastructure_title','ui.card_jobs_title','ui.card_backups_title','ui.card_migrations_title'] as const;
export const SUPERADMIN_SYSTEM_OPS_DASHBOARD_CARD_DESCRIPTION_KEYS = ['ui.card_infrastructure_description','ui.card_jobs_description','ui.card_backups_description','ui.card_migrations_description'] as const;
export const SUPERADMIN_SYSTEM_OPS_DASHBOARD_CARD_LABEL_KEYS = ['ui.card_status_label','ui.card_jobs_label','ui.card_backup_label'] as const;