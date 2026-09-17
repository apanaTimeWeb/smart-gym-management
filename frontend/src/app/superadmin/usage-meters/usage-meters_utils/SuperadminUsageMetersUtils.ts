// RESPONSIBILITY: Provides presentation-safe usage meter calculations.
export const getProgressColor = (used: number, limit: number) => { const percent = limit > 0 ? (used / limit) * 100 : 0; if (percent >= 90)
    return 'bg-danger'; if (percent >= 75)
    return 'bg-warning'; return 'bg-primary'; };
export const getPercentage = (used: number, limit: number): number => Math.min(100, Math.max(0, limit > 0 ? (used / limit) * 100 : 0));
export const formatUsageStorage = (gigabytes: number): string => gigabytes.toLocaleString(undefined, { maximumFractionDigits: 2 });
