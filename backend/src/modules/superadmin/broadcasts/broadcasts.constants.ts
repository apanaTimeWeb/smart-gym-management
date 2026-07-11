export const BROADCASTS_MESSAGES = {
  CREATED_SUCCESS: 'Broadcast created successfully',
  FETCHED_SUCCESS: 'Broadcasts fetched successfully',
  UPDATED_SUCCESS: 'Broadcast updated successfully',
  DELETED_SUCCESS: 'Broadcast deleted successfully',
  SENT_SUCCESS: 'Broadcast sent successfully',
};

export const BROADCASTS_ERRORS = {
  NOT_FOUND: 'Broadcast not found',
  ALREADY_SENT: 'This broadcast has already been sent and cannot be modified',
};

export const BROADCAST_AUDIENCE = {
  ALL_TENANTS: 'ALL_TENANTS',
  PRO_ONLY: 'PRO_ONLY',
  ENTERPRISE_ONLY: 'ENTERPRISE_ONLY',
  TRIAL_ONLY: 'TRIAL_ONLY',
} as const;
