// RESPONSIBILITY: Owns static Dashboard UI labels and semantic tone mappings; server analytics remain API state.
export const SUPERADMIN_DASHBOARD_ALERT_TONE_CLASSES = {
    HIGH: { badge: 'bg-danger-bg text-danger', icon: 'text-danger' },
    MEDIUM: { badge: 'bg-warning-bg text-warning', icon: 'text-warning' },
    LOW: { badge: 'bg-info-bg text-info', icon: 'text-info' },
} as const;

export const SUPERADMIN_DASHBOARD_CHART_COLORS = {
    PRIMARY: 'var(--chart-primary)',
    INFO: 'var(--chart-info)',
    SUCCESS: 'var(--chart-success)',
    WARNING: 'var(--chart-warning)',
    DANGER: 'var(--chart-danger)',
    TEXT_SECONDARY: 'var(--text-secondary)',
    BORDER: 'var(--border)',
    SECONDARY: 'var(--chart-secondary)',
} as const;

export const DASHBOARD_PLAN_BADGE_CLASSES: Record<string, string> = {
    Enterprise: 'bg-primary-subtle text-primary',
    Pro: 'bg-success-bg text-success',
    Starter: 'bg-info-bg text-info',
};

export const DASHBOARD_PLAN_BADGE_FALLBACK_CLASS = 'bg-input text-secondary';

export const DASHBOARD_TIME_RANGE_LABELS: Record<string, string> = {
    '7d': 'Last 7 Days',
    '30d': 'Last 30 Days',
    '90d': 'Last 90 Days',
    '12m': 'Last 12 Months',
};
