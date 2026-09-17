// RESPONSIBILITY: Owns static offboarding status values used by Superadmin UI calculations.
export const SUPERADMIN_OFFBOARDING_STATUS = Object.freeze({
    EXPORT_READY: 'EXPORT_READY',
    PURGE_SCHEDULED: 'PURGE_SCHEDULED',
} as const);
export const SUPERADMIN_OFFBOARDING_POLICY_LABELS = Object.freeze({
    exportWindowDays: 'Export window',
    gracePeriodDays: 'Grace period',
    purgeAfterGraceDays: 'Purge after grace',
    approvalRequired: 'Approval required',
    backupBeforePurge: 'Backup before purge',
} as const);
