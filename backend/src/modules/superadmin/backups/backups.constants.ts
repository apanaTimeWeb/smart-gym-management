export const BACKUPS_MESSAGES = {
  FETCHED_SUCCESS: 'Backup records fetched successfully',
  TRIGGERED_SUCCESS: 'Backup job triggered successfully',
};

export const BACKUPS_ERRORS = {
  NOT_FOUND: 'Backup record not found',
  TRIGGER_FAILED: 'Failed to trigger backup job',
};

export const BACKUP_STATUS = {
  SUCCESS: 'SUCCESS',
  IN_PROGRESS: 'IN_PROGRESS',
  FAILED: 'FAILED',
} as const;
