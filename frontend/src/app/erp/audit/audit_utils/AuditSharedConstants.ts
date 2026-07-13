// RESPONSIBILITY: Provides the implementation for AuditSharedConstants.ts functionality within its module.
export const AUDIT_ENTITY_TYPES = [
  { label: 'All', value: '' },
  { label: 'Member', value: 'MEMBER' },
  { label: 'Payment', value: 'PAYMENT' },
  { label: 'Subscription', value: 'SUBSCRIPTION' },
  { label: 'Staff', value: 'STAFF' },
  { label: 'Settings', value: 'SETTINGS' },
];

export const AUDIT_TABLE_HEADERS = [
  'Timestamp',
  'Actor ID',
  'Role',
  'Action',
  'Entity Type',
  'Entity ID',
  'Details',
];
