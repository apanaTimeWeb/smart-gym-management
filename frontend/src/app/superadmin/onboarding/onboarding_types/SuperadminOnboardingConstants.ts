// RESPONSIBILITY: Static hardcoded data and constants for the Tenant Onboarding module.
export const ONBOARDING_STATUS_STYLES: Record<string, string> = {
    COMPLETED: 'bg-success/10 text-success border border-success/30',
    IN_PROGRESS: 'bg-primary/10 text-primary border border-primary/30',
    PENDING: 'bg-warning/10 text-warning border border-warning/30',
    STALLED: 'bg-danger/10 text-danger border border-danger/30',
};
export const TRIAL_STATUS_STYLES: Record<string, string> = {
    TRIAL: 'bg-primary/10 text-primary border border-primary/30',
    ACTIVE: 'bg-success/10 text-success border border-success/30',
    EXPIRED: 'bg-danger/10 text-danger border border-danger/30',
    CONVERTED: 'bg-purple-bg text-purple-text border border-purple-text/30',
};
