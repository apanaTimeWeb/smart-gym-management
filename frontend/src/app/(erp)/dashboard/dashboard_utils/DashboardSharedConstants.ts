export const DASHBOARD_STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  ACTIVE: { bg: 'var(--dashboard-status-active-bg)', text: 'var(--dashboard-status-active-text)' },
  PENDING: { bg: 'var(--dashboard-status-pending-bg)', text: 'var(--dashboard-status-pending-text)' },
  EXPIRED: { bg: 'var(--dashboard-status-expired-bg)', text: 'var(--dashboard-status-expired-text)' },
};

export const DASHBOARD_PLAN_BG_COLORS: Record<string, string> = {
  BASIC: 'var(--dashboard-plan-basic-bg)',
  GOLD: 'var(--dashboard-plan-gold-bg)',
  PREMIUM: 'var(--dashboard-plan-premium-bg)',
};

export const RECENT_MEMBERS_HEADERS = ['Member', 'Plan', 'Status', 'Joined', 'Amount'];
