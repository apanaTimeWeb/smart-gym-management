export const SUPERADMIN_DASHBOARD_ALERT_TONE_CLASSES = {
    HIGH: { badge: 'bg-danger-bg text-danger', icon: 'text-danger' },
    MEDIUM: { badge: 'bg-warning-bg text-warning', icon: 'text-warning' },
    LOW: { badge: 'bg-info-bg text-info', icon: 'text-info' },
} as const;

export const DASHBOARD_CHART_COLORS = {
    PRIMARY: '#3b82f6',
    INFO: '#3b82f6',
    SUCCESS: '#10b981',
    WARNING: '#f59e0b',
    DANGER: '#ef4444',
    TEXT_SECONDARY: '#6b7280',
    BORDER: '#e5e7eb'
};
export const DASHBOARD_PLAN_BADGE_CLASSES: Record<string, string> = {
    'Enterprise': 'bg-primary-bg text-primary',
    'Pro': 'bg-success-bg text-success',
    'Starter': 'bg-info-bg text-info'
};

export const DASHBOARD_PLAN_BADGE_FALLBACK_CLASS = 'bg-secondary-bg text-secondary';

export const DASHBOARD_TIME_RANGE_LABELS: Record<string, string> = {
    '7d': 'Last 7 Days',
    '30d': 'Last 30 Days',
    '90d': 'Last 90 Days',
    '12m': 'Last 12 Months'
};
