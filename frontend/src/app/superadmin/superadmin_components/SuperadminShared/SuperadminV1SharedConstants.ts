// RESPONSIBILITY: Owns static presentation options shared by Superadmin V1 display primitives.
export const SUPERADMIN_V1_METRIC_TONE = Object.freeze({
    PRIMARY: 'primary',
    SUCCESS: 'success',
    WARNING: 'warning',
    DANGER: 'danger',
    INFO: 'info',
} as const);
export type SuperadminV1MetricTone = (typeof SUPERADMIN_V1_METRIC_TONE)[keyof typeof SUPERADMIN_V1_METRIC_TONE];
