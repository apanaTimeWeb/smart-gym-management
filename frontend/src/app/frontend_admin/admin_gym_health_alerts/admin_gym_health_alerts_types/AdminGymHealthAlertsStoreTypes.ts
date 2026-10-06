// Type contract owned by this module; kept outside implementation files for AI isolation.

export interface AdminGymHealthAlertsStore {
  severityFilter: 'all' | 'critical' | 'warning' | 'info';
  search: string;
  setSeverityFilter: (value: AdminGymHealthAlertsStore['severityFilter']) => void;
  setSearch: (value: string) => void;
}
